export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return '';
};

export const validateName = (name) => {
  if (!name) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return 'Name can only contain letters and spaces';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};

export const validatePasswordStrength = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required', strength: 0 };
  }
  
  let strength = 0;
  const checks = [
    { regex: /.{8,}/, message: 'At least 8 characters' },
    { regex: /[a-z]/, message: 'One lowercase letter' },
    { regex: /[A-Z]/, message: 'One uppercase letter' },
    { regex: /[0-9]/, message: 'One number' },
    { regex: /[^a-zA-Z0-9]/, message: 'One special character' },
  ];
  
  const passedChecks = checks.filter(check => check.regex.test(password));
  strength = (passedChecks.length / checks.length) * 100;
  
  const requirements = checks.map(check => ({
    ...check,
    passed: check.regex.test(password)
  }));
  
  return {
    isValid: strength >= 60,
    strength: Math.round(strength),
    message: strength < 60 ? 'Password is weak' : strength < 100 ? 'Password is medium' : 'Password is strong',
    requirements
  };
};

export const validatePhoneNumber = (phone) => {
  if (!phone) {
    return 'Phone number is required';
  }
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return '';
};

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return '';
};
