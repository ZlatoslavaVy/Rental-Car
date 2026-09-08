import type { Note, NewNote } from "@/types/car";
import { api } from "@/lib/api/instance";

export interface FetchCarsResponse {
  cars: Note[];
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

  if (params?.search) {
    queryParams.search = params.search;
  }

  const response = await api.get<FetchCarsResponse>("", {
    params: queryParams,
  });
  return response.data;
};

export const fetchCarById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/${id}`);
  return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await api.post<Note>("", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/${id}`);
  return response.data;
};
