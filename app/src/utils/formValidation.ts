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

export const handleSignInFormValidation = (
  value: string,
  name: string,
  compareValue?: string
): boolean => {
  let validate = false;

  switch (name) {
    case "username":
      validate = value.trim() !== "" && value.length >= 3 && value.length <= 20;
      return validate;

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validate = emailRegex.test(value);
      return validate;

    case "password":
      validate = value.trim() !== "" && value.length >= 6;
      return validate;

    case "confirmPassword":
      validate = value === compareValue && value.trim() !== "";
      return validate;

    default:
      return validate;
  }
};
