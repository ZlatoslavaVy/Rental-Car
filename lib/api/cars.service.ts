import type { Car, CarsResponse } from "@/types/car";
import { api } from "@/lib/api/instance";

export interface FetchCarsResponse {
  cars: Car[];
  totalPages: number;
}

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

  if (params?.tag && params.tag !== "all") {
    queryParams.tag = params.tag;
  }
  if (params?.page) {
    queryParams.page = params.page;
  }
  if (params?.perPage) {
    queryParams.perPage = params.perPage;
  }

  //   if (params?.search) {
  //     queryParams.search = params.search;
  //   }

  const response = await api.get<CarsResponse>("/cars", {
    params: queryParams,
  });
  return response.data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`/cars/${id}`);
  return response.data;
};
