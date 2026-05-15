import { api } from "@/lib/api";
import type {
  BookingRequestPayload,
  BookingResponse,
  Car,
  CarsQueryParams,
  CarsResponse,
  FiltersResponse,
} from "@/types/car";

export async function getCars(params: CarsQueryParams): Promise<CarsResponse> {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== "" && value !== undefined && value !== null
    )
  );

  const { data } = await api.get<CarsResponse>("/cars", {
    params: cleanParams,
  });

  return data;
}

export async function getCarById(carId: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${carId}`);

  return data;
}

export async function getCarFilters(): Promise<FiltersResponse> {
  const { data } = await api.get<FiltersResponse>("/cars/filters");

  return data;
}

export async function rentCar(
  carId: string,
  values: BookingRequestPayload
): Promise<BookingResponse> {
  const { data } = await api.post<BookingResponse>(
    `/cars/${carId}/booking-requests`,
    values
  );

  return data;
}