import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.name.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Formato de email inválido.');
      return;
    }

    if (form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[0-9]/.test(form.password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula y número.');
      return;
    }

    // La validación de confirmar password se hace SOLO en frontend. Al backend solo llega password.
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      const res = await authAPI.register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      // Al recibir el token del backend, lo guardamos en localStorage
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Crear cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@ejemplo.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirmar contraseña</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repite la contraseña"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>
        <p className="auth-link">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
