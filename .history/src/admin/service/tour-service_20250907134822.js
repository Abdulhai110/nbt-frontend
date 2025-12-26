// src/service/api.js
import axios from "axios";
import { ENV } from "../../env/environment";

// Create Axios instance
const api = axios.create({
  baseURL: ENV.BASE_URL,
  timeout: 15000, // optional: avoid hanging requests
});

// ✅ Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = token.startsWith("Bearer")
        ? token
        : `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle global responses (e.g., logout on 401)
api.interceptors.response.use(
  (response) => response.data, // always return `data`
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid/expired
      localStorage.removeItem("authToken");
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);

// ✅ API service methods
export const apiService = {
  get: (url, params = {}, config = {}) => api.get(url, { params, ...config }),
post: (url, payload = {}, config = {}) => {
  let headers = { ...config.headers };

  // ✅ If payload is FormData, don't set Content-Type manually
  if (payload instanceof FormData) {
    delete headers["Content-Type"];
  }

  return api.post(url, payload, { ...config, headers });
},
  put: (url, payload = {}, config = {}) => api.put(url, payload, config),
  delete: (url, config = {}) => api.delete(url, config),
};
