export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engine: string;
  features: string[];
  rentalPrice: string;
  location: {
    country: string;
    city: string;
  };
  rentalConditions: string[];
  mileage: number;
}

export interface Location {
  country: string;
  city: string;
  address: string;
}

export interface CarsParams {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  page?: number;
}

export interface CarsResponse {
  cars: Car[];
  page: number;
  totalPages: number;
}
