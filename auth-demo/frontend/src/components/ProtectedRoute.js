import React from 'react';
import { Navigate } from 'react-router-dom';

// Esto es un "route guard" del lado del frontend. NO es seguridad real. El backend siempre verifica el token.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
