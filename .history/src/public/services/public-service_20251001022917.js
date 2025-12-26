import { apiRequest } from "./api-service";

// Public APIs
export const getPublicTours = () => apiRequest("/public/tours");
export const getPublicDestinations = () => apiRequest("/public/destinations");
export const getPublicGallery = () => apiRequest("/public/gallery");
