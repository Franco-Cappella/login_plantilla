// isValidEmail: regex más estricto siguiendo RFC 5322 simplificado
export const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return email.length <= 254 && emailRegex.test(email);
};

// isValidString: verifica que el valor sea un string con al menos minLength caracteres luego de trim()
export const isValidString = (str, minLength = 1) => {
  return typeof str === 'string' && str.trim().length >= minLength;
};

// isValidPassword: mínimo 8 caracteres, al menos una mayúscula, una minúscula y un dígito
export const isValidPassword = (password) => {
  if (typeof password !== 'string' || password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  return true;
};
