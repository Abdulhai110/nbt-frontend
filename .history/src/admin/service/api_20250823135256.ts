import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../env/environment";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic request function
const request = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  params?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.request<T>({
      method,
      url,
      data,
      params,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error.response?.data || error;
  }
};

// Export specific methods
export const apiService = {
  get: <T>(url: string, params?: any, config?: AxiosRequestConfig) =>
    request<T>("get", url, undefined, params, config),

  post: <T>(url: string, data: any, config?: AxiosRequestConfig) =>
    request<T>("post", url, data, undefined, config),

  put: <T>(url: string, data: any, config?: AxiosRequestConfig) =>
    request<T>("put", url, data, undefined, config),

  delete: <T>(url: string, params?: any, config?: AxiosRequestConfig) =>
    request<T>("delete", url, undefined, params, config),
};
