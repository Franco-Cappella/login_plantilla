import UserRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);

export default class AuthService {
  constructor() {
    this.userRepo = new UserRepository();
  }

  // registerAsync: valida que el email no exista, hashea la contraseña, crea el usuario y firma un JWT
  registerAsync = async ({ name, email, password }) => {
    const existente = await this.userRepo.getByEmailAsync(email);
    if (existente) {
      const e = new Error('El email ya está registrado.');
      e.statusCode = 409;
      throw e;
    }

    // bcrypt.hash() genera un salt automáticamente y produce un hash de 60 caracteres
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const user = await this.userRepo.createAsync({ name, email, password: hashedPassword });

    // El payload del JWT contiene solo datos NO sensibles. NUNCA incluir la contraseña.
    const payload = { id: user.id, email: user.email };

    // jwt.sign() usa HMAC-SHA256 por defecto cuando el secret es un string
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '2h' });

    const { password: _, ...userData } = user;
    return { user: userData, token, token_type: 'Bearer', expires_in: process.env.JWT_EXPIRES_IN || '2h' };
  };

  // loginAsync: busca el usuario por email, compara contraseñas con bcrypt y firma un JWT
  loginAsync = async ({ email, password }) => {
    const user = await this.userRepo.getByEmailAsync(email);

    // Mensaje genérico de error evita user enumeration attack
    if (!user) {
      const e = new Error('Credenciales incorrectas.');
      e.statusCode = 401;
      throw e;
    }

    // bcrypt.compare() extrae el salt del hash almacenado y vuelve a hashear, luego compara
    const coincide = await bcrypt.compare(password, user.password);
    if (!coincide) {
      const e = new Error('Credenciales incorrectas.');
      e.statusCode = 401;
      throw e;
    }

    const payload = { id: user.id, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '2h' });

    // Se elimina la contraseña del objeto usuario antes de devolverlo
    const { password: _, ...userData } = user;
    return { user: userData, token, token_type: 'Bearer', expires_in: process.env.JWT_EXPIRES_IN || '2h' };
  };

  // meAsync: retorna los datos del usuario a partir del payload decodificado del JWT
  meAsync = async (userId) => {
    const user = await this.userRepo.getByIdAsync(userId);
    if (!user) {
      const e = new Error('Usuario no encontrado.');
      e.statusCode = 404;
      throw e;
    }
    const { password: _, ...userData } = user;
    return userData;
  };
}
