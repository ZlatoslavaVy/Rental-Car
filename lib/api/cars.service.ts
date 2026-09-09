import type { Car, CarsResponse } from "@/types/car";
import { api } from "@/lib/api/instance";

interface FetchCarsParams {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  perPage?: number;
  page?: number;
}

export const fetchCars = async (params?: FetchCarsParams) => {
  const queryParams: Record<string, string | number> = {};

  if (params?.brand) {
    queryParams.brand = params.brand;
  }
  if (params?.price) {
    queryParams.price = params.price;
  }

  if (params?.minMileage) {
    queryParams.minMileage = params.minMileage;
  }

  if (params?.maxMileage) {
    queryParams.maxMileage = params.maxMileage;
  }

  if (params?.perPage) {
    queryParams.perPage = params.perPage;
  }

  if (params?.page) {
    queryParams.page = params.page;
  }

  const response = await api.get<CarsResponse>("/cars", {
    params: queryParams,
  });
  return response.data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`/cars/${id}`);
  return response.data;
};
