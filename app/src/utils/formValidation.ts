//Form validation
export const handleFormValidation = (value: string, name: string) => {
  let validate = false;

  switch (name) {
    case "fuelConsumption":
      value === "" || Number(value) > 30 || Number(value) < 1
        ? (validate = false)
        : (validate = true);
      return validate;
    case "fuelPrice":
      value === "" || Number(value) > 500 || Number(value) < 30
        ? (validate = false)
        : (validate = true);
      return validate;
    case "paytolls":
      value === "" || Number(value) > 10000 || Number(value) < 50
        ? (validate = false)
        : (validate = true);
      return validate;
    case "passengersNum":
      value === "" || Number(value) > 100 || Number(value) < 0
        ? (validate = false)
        : (validate = true);
      return validate;
    case "roundTrip":
      value === "" ? (validate = false) : (validate = true);
      return validate;

    default:
      return validate;
  }
};

export const handleSignInFormValidation = (formData: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!formData.username || formData.username.length < 3) {
    errors.username = "Korisničko ime mora imati najmanje 3 karaktera.";
  }

  if (!formData.email || !formData.email.includes("@")) {
    errors.email = "Email nije validan.";
  }

  if (!formData.password || formData.password.length < 6) {
    errors.password = "Lozinka mora imati najmanje 6 karaktera.";
  }

  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "Lozinke se ne poklapaju.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLoginForm = (
  email: string,
  password: string
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!email || !email.includes("@")) {
    errors.email = "Email nije validan.";
  }

  if (!password || password.length < 6) {
    errors.password = "Lozinka mora imati najmanje 6 karaktera.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
