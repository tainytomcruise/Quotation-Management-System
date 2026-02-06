export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[0-9]{10,15}$/;
  return regex.test(phone.replace(/\D/g, ''));
};

export const validateQuotationRequest = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.push('Valid phone number is required');
  }

  if (!data.company || data.company.trim().length < 2) {
    errors.push('Company name is required');
  }

  if (!data.requirementDescription || data.requirementDescription.trim().length < 10) {
    errors.push('Requirement description must be at least 10 characters');
  }

  if (!data.budget || data.budget <= 0) {
    errors.push('Budget must be greater than 0');
  }

  return { isValid: errors.length === 0, errors };
};
