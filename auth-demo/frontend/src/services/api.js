import axios from 'axios';

// Crear instancia de axios con la URL base del backend
const api = axios.create({ baseURL: 'http://localhost:4000/api' });

// Interceptor: agrega automáticamente el token a cada request
// Se ejecuta antes de cada petición. Si hay token en localStorage, lo inyecta en el header Authorization.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor: si el backend responde 403, el token expiró o es inválido → redirige a login
// Se ejecuta cuando llega una respuesta con error. Un 403 significa que el backend rechazó el token.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login', data),
  me:       ()    => api.get('/auth/me'),
};
