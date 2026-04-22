import { env } from "@/core/env";
import axios, { AxiosError, type AxiosInstance } from "axios";

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

export type ApiError = {
  status: number;
  message: string;
  code?: string;
};

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; code?: string }>) => {
    const normalized: ApiError = {
      status: error.response?.status ?? 0,
      message:
        error.response?.data?.message ?? error.message ?? "Unknown error",
      code: error.response?.data?.code ?? error.code,
    };
    return Promise.reject(normalized);
  }
);
