import axios from "axios";
import { ENV } from "../../env/environment";

// Generic API Service
export const apiService = {
  get: async (url, params = {}) => {
    try {
      const response = await axios.get(`${ENV.BASE_URL}${url}`, { params });
      return response.data;
    } catch (err) {
      console.error("GET Error:", err);
      throw err;
    }
  },

  post: async (url, payload = {}, config = {}) => {
    try {
      const response = await axios.post(`${ENV.BASE_URL}${url}`, payload, config);
      return response.data;
    } catch (err) {
      console.error("POST Error:", err);
      throw err;
    }
  },

  put: async (url, payload = {}, config = {}) => {
    try {
      const response = await axios.put(`${ENV.BASE_URL}${url}`, payload, config);
      return response.data;
    } catch (err) {
      console.error("PUT Error:", err);
      throw err;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await axios.delete(`${ENV.BASE_URL}${url}`, config);
      return response.data;
    } catch (err) {
      console.error("DELETE Error:", err);
      throw err;
    }
  },
};
