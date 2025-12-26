// src/service/api.js
import axios from "axios";
import { ENV } from "../../env/environment";

const api = axios.create({
  baseURL: ENV.BASE_URL,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
