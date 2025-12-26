// src/config/env.ts

const dev = {
  BASE_URL: "http://localhost:5000/api", 
};

const prod = {
  BASE_URL: "https://your-production-api.com/api", 
};

// Export depending on environment
export const ENV = process.env.NODE_ENV === "production" ? prod : dev;
