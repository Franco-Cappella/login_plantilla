import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

// Decodifica un JWT sin verificar (solo para mostrar el payload en pantalla)
const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        // La ruta /me está protegida por authMiddleware. Si el token es inválido, devuelve 403.
        const res = await authAPI.me();
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al obtener datos del usuario.');
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const handleLogout = () => {
    // Al cerrar sesión solo borramos el token del frontend. El backend no tiene estado que limpiar.
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCopyToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return <div className="dashboard-container"><p>Cargando...</p></div>;
  if (error) return <div className="dashboard-container"><p className="error-message">{error}</p></div>;

  const token = localStorage.getItem('token');
  const payload = decodeToken(token);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Bienvenido, {user.name}</h1>
        <div className="user-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Registrado:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>

        <div className="token-section">
          <h3>Token JWT</h3>
          <div className="token-display">
            <code>{token ? `${token.substring(0, 50)}...` : 'No hay token'}</code>
            {token && (
              <button className="btn-small" onClick={handleCopyToken}>
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            )}
          </div>
        </div>

        {payload && (
          <div className="token-section">
            <h3>Payload del token</h3>
            <pre className="token-payload">
              {JSON.stringify(payload, null, 2)}
            </pre>
            <p className="note">
              {/* jwt.decode() solo decodifica, NO verifica. La verificación la hace el backend con jwt.verify(). */}
              Nota: esto es solo el payload decodificado. El backend verifica la firma con jwt.verify().
            </p>
          </div>
        )}

        <button className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
