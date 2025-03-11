const useValidation = () => {
  const validateNameField = (value, { required, label }) => {
    if (required && !value) {
      return `${label || "This field"} is required`;
    }
    if (value?.toLowerCase() === "john") {
      return `${label} cannot be 'john'`;
    }
    return undefined;
  };

  const validateEmailField = (value, { required, label }) => {
    if (required && !value) {
      return `${label || "This field"} is required`;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return "Invalid email address";
    }
    return undefined;
  };
  const validatePhone = (value) => {
    if (!value) return undefined;
    if (!/^\+91[6-9]\d{9}$/.test(value)) {
      return "Invalid phone number format. It should start with +91 followed by a valid 10-digit number.";
    }
    return undefined;
  };
  

  return {
    validateNameField,
    validateEmailField,
    validatePhone
  };
};

export default useValidation;
