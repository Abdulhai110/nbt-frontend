// src/service/tourService.js
import api from "./apiService";

// Add new tour (with FormData)
export const addTour = async (tourData) => {
  const formData = new FormData();
  formData.append("title", tourData.title);
  formData.append("price", tourData.price);
  formData.append("description", tourData.description);
  formData.append("published", tourData.published ? "true" : "false");

  if (tourData.coverImage?.[0]) {
    formData.append("coverImage", tourData.coverImage[0]);
  }

  if (tourData.images?.length > 0) {
    for (let i = 0; i < tourData.images.length; i++) {
      formData.append("images", tourData.images[i]);
    }
  }

  // ✅ Let axios set Content-Type automatically
  const response = await api.post("/admin/tours", formData);
  return response.data;
};
