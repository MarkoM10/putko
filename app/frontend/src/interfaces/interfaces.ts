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
  user: {
    user_id: number | null;
    username: string | null;
    user_email: string | null;
  };
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

export interface ITrip {
  id: number;
  user_id: number;
  origin: string;
  destination: string;
  distance_km: string;
  fuel_consumption: string;
  fuel_price: string;
  tolls: string;
  passengers: number;
  is_round_trip: boolean;
  total_cost: string;
  cost_per_person: string;
  created_at: string;
}

export type ITrips = ITrip[];

export interface ICreateReportResponse {
  success: boolean;
  message: string;
}

export interface IReport {
  id: number;
  trip_id: number;
  file_url: string;
  date_created: string;
}

export type IReports = IReport[];

export interface IAddToFavoritesResponse {
  success: boolean;
  message: string;
}

export interface IFavoriteRoute {
  id: number;
  user_id: number;
  origin: string;
  destination: string;
  alias: string;
  created_at: string;
  trip_id: number;
}
