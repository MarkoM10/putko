export interface OriginAndDestination {
  value: string;
}
export interface Model {
  name: string;
}

export interface TripFormData {
  fuelConsumption: number;
  fuelPrice: number;
  paytolls: number;
  passengersNum: number;
  roundTrip: number;
}

export interface ISignInFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignInResponse {
  success: boolean;
  message: string;
  token: string | null;
}

export interface ILogInFormData {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  token: string | null;
  user: {
    user_id: number | null;
    username: string | null;
    user_email: string | null;
  };
}

export interface ITripData {
  origin: string;
  destination: string;
  fuel_consumption: number;
  fuel_price: number;
  passengers: number;
  tolls: number;
  is_round_trip: number;
}
