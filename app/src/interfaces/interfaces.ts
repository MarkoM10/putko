export interface OriginAndDestination {
  value: string;
}
export interface Car {
  year: string;
  make: string;
  model: string;
  body_styles: string[];
}
export interface carManufacturer {
  id: number;
  manufacturer: string;
}

export interface CarManufacturers {
  carManufacturers: carManufacturer[];
}
