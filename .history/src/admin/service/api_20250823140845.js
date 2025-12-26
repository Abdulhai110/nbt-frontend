import axios from "axios";
import { ENV } from "../../env/environment";

// Helper to get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: token } : {};
};

// Generic API Service with token
export const apiService = {
  get: async (url, params = {}, config = {}) => {
    try {
      const headers = { ...getAuthHeader(), ...config.headers };
      const response = await axios.get(`${ENV.BASE_URL}${url}`, { params, ...config, headers });
      return response.data;
    } catch (err) {
      console.error("GET Error:", err);
      throw err;
    }
  },

  post: async (url, payload = {}, config = {}) => {
    try {
      const headers = { ...getAuthHeader(), ...config.headers };
      const response = await axios.post(`${ENV.BASE_URL}${url}`, payload, { ...config, headers });
      return response.data;
    } catch (err) {
      console.error("POST Error:", err);
      throw err;
    }
  },

  put: async (url, payload = {}, config = {}) => {
    try {
      const headers = { ...getAuthHeader(), ...config.headers };
      const response = await axios.put(`${ENV.BASE_URL}${url}`, payload, { ...config, headers });
      return response.data;
    } catch (err) {
      console.error("PUT Error:", err);
      throw err;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const headers = { ...getAuthHeader(), ...config.headers };
      const response = await axios.delete(`${ENV.BASE_URL}${url}`, { ...config, headers });
      return response.data;
    } catch (err) {
      console.error("DELETE Error:", err);
      throw err;
    }
  },
};
