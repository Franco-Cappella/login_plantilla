import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autenticación requerido.' });
  }

  // Authorization: Bearer <token> → se extrae solo el token
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    return res.status(401).json({ message: 'Formato de token inválido.' });
  }

  const token = parts[1];

  try {
    // jwt.verify() lanza error si: la firma no coincide, el token expiró, o el payload está malformado
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Si pasa la verificación, adjuntamos el payload decodificado a req.user para los handlers siguientes
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};

export default authMiddleware;
