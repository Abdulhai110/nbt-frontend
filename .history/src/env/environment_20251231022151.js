const dev = {
  BASE_URL: "http://localhost:5000/api",
  paginationLimit: 9,
};

const prod = {
  BASE_URL: "https://nbt-backend-plum.vercel.app/api",
  paginationLimit: 9,
};

// Export depending on environment
export const ENV = process.env.NODE_ENV === "production" ? prod : dev;
