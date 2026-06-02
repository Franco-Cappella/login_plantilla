import { readUsers, writeUsers, getNextId } from '../database/db.js';

export default class UserRepository {
  // createAsync: recibe un objeto user con { name, email, password },
  // asigna id secuencial y created_at, guarda en el archivo JSON y retorna el usuario creado
  createAsync = async (user) => {
    const users = await readUsers();
    const newUser = {
      id: await getNextId(),
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: new Date().toISOString(),
    };
    users.push(newUser);
    await writeUsers(users);
    return newUser;
  };

  // getByEmailAsync: recibe un email, busca en el archivo JSON y retorna el usuario o null
  getByEmailAsync = async (email) => {
    const users = await readUsers();
    return users.find(u => u.email === email) ?? null;
  };

  // getByIdAsync: recibe un id, busca en el archivo JSON y retorna el usuario o null
  getByIdAsync = async (id) => {
    const users = await readUsers();
    return users.find(u => u.id === id) ?? null;
  };
}
