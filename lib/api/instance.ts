import axios from "axios";

const BASE_URL = "https://car-rental-api.goit.study";

export const api = axios.create({
  baseURL: BASE_URL,
});
