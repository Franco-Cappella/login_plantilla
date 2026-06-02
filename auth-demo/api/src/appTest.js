import 'dotenv/config';

console.log('Verificando configuración del servidor...');
console.log('PORT:', process.env.PORT || 4000);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✓ configurado' : '✗ faltante');
console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN || '2h (default)');
console.log('Servidor listo para iniciar.');
