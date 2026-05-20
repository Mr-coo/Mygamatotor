import axios from "axios";
import { useErrorStore } from "../../../store/error.store";

export const http = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token_mygamatoto");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      const message = "Unable to reach server";
      useErrorStore.getState().showError(message);
      return Promise.reject({ type: "NETWORK_ERROR", message });
    }

    const { status, data } = error.response;
    const message = data?.message || "Unexpected error";
    useErrorStore.getState().showError(message);
    return Promise.reject({ type: "API_ERROR", status, message, errors: data?.errors });
  }
);
