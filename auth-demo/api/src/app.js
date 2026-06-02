import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import AuthController from './controllers/authController.js';

const app = express();
const port = process.env.PORT || 4000;

const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Seguridad: headers HTTP
app.use(helmet());

// Seguridad: CORS restringido al origen del frontend
app.use(cors({ origin: corsOrigin }));

// Seguridad: límite de tamaño del body (10kb es suficiente para login/register)
app.use(express.json({ limit: '10kb' }));

// Seguridad: rate limiting global (opcional, pisado por el específico de auth)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiadas solicitudes. Intente de nuevo en 15 minutos.' },
});

// Rate limiting específico para rutas de autenticación (más restrictivo)
app.use('/api/auth', authLimiter);

// Rutas de autenticación
app.use('/api/auth', AuthController);

// Error handler global: nunca expone detalles internos al cliente
app.use((err, _req, res, _next) => {
  console.error('[GlobalErrorHandler]', err.stack || err.message || err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.statusCode ? err.message : 'Error interno del servidor.' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
