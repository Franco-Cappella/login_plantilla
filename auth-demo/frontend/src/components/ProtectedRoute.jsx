import React from 'react';
import { Navigate } from 'react-router-dom';

// Esto es un "route guard" del lado del frontend. NO es seguridad real. El backend siempre verifica el token.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Store the original location to redirect back after login
    // This allows us to return to the dashboard after successful authentication
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
