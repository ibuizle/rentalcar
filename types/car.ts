export interface Location {
  country: string;
  city: string;
  address: string;
}

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
  rentalCompany: string;
  location: Location;
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export interface FiltersResponse {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export interface CarsQueryParams {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  page?: number;
  perPage?: number;
}

export interface RentalFormValues {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

export interface BookingRequestPayload {
  name: string;
  email: string;
  comment?: string;
}

export interface BookingResponse {
  message: string;
}