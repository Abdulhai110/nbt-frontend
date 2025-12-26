import { apiRequest } from "./api-service";

// Public APIs
export async function getPublicTours() {
  const resp = await apiRequest("/public/tours");
  // ✅ unwrap the response and return only tours array
  return resp?.data || [];
}
export const getPublicDestinations = () => apiRequest("/public/destinations");
export const getPublicGallery = () => apiRequest("/public/gallery");
