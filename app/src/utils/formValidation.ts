//Form validation
import { TripFormData } from "../interfaces/interfaces";

export const handleTripCalcFormValidation = (
  origin: string,
  destination: string,
  formData: TripFormData
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Origin & Destination
  if (!origin || origin.trim() === "") {
    errors.origin = "Polazna tačka je obavezna.";
  }

  if (!destination || destination.trim() === "") {
    errors.destination = "Odredišna tačka je obavezna.";
  }

  // Fuel Consumption (required)
  if (formData.fuelConsumption === 0) {
    errors.fuelConsumption = "Potrošnja je obavezna.";
  } else if (formData.fuelConsumption < 0 || formData.fuelConsumption > 30) {
    errors.fuelConsumption = "Potrošnja mora biti između 1 i 30 litara.";
  }

  // Fuel Price (required)
  if (formData.fuelPrice === 0) {
    errors.fuelPrice = "Cena goriva je obavezna.";
  } else if (formData.fuelPrice < 0 || formData.fuelPrice > 400) {
    errors.fuelPrice = "Cena goriva mora biti između 1 i 400 RSD.";
  }

  // Tolls (optional)
  if (formData.paytolls < 0 || formData.paytolls > 10000) {
    errors.paytolls = "Putarine moraju biti između 0 i 10.000 RSD.";
  }

  // Passengers (optional)
  if (formData.passengersNum < 0 || formData.passengersNum > 50) {
    errors.passengersNum = "Broj putnika mora biti između 0 i 50.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
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
