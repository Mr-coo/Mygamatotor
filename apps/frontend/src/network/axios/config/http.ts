import axios from "axios";

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
      return Promise.reject({
        type: "NETWORK_ERROR",
        message: "Unable to reach server",
      });
    }

    const { status, data } = error.response;
    console.log(error.response);
    return Promise.reject({
      type: "API_ERROR",
      status,
      message: data?.message || "Unexpected error",
      errors: data?.errors,
    });
  }
);
