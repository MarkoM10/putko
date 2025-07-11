export interface OriginAndDestination {
  value: string;
}
export interface Car {
  year: string;
  make: string;
  model: string;
  body_styles: string[];
}
export interface Model {
  name: string;
}

export interface carManufacturer {
  id: number;
  manufacturer: string;
  models: string[];
}

export interface CarManufacturers {
  carManufacturers: carManufacturer[];
}

export interface TripFormData {
  fuelConsumption: number;
  fuelPrice: number;
  paytolls: number;
  passengersNum: number;
  roundTrip: number;
}
