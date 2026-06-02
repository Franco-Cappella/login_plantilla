import { Router } from 'express';
import AuthService from '../services/authService.js';
import { isValidEmail, isValidString, isValidPassword } from '../helpers/validatorHelper.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
const svc = new AuthService();

const handleError = (res, error) => {
  console.error(`[AuthController] ${error.stack || error.message || error}`);
  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : 'Error interno del servidor.';
  return res.status(statusCode).json({ message });
};

// POST /api/auth/register — público: registra un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!isValidString(name, 2)) {
      return res.status(400).json({ message: 'El nombre debe tener al menos 2 caracteres.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Formato de email inválido.' });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula y número.' });
    }

    const result = await svc.registerAsync({ name, email, password });
    return res.status(201).json(result);
  } catch (e) {
    return handleError(res, e);
  }
});

// POST /api/auth/login — público: inicia sesión y devuelve token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Formato de email inválido.' });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula y número.' });
    }

    const result = await svc.loginAsync({ email, password });
    return res.status(200).json(result);
  } catch (e) {
    return handleError(res, e);
  }
});

// GET /api/auth/me — protegido: devuelve los datos del usuario autenticado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await svc.meAsync(req.user.id);
    return res.status(200).json(user);
  } catch (e) {
    return handleError(res, e);
  }
});

export default router;
