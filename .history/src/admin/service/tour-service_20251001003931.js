// src/service/tourService.js
import api from "./api";

// ✅ Add tour
export const addTour = async (tourData) => {
  const formData = new FormData();
  formData.append("title", tourData.title);
  formData.append("price", tourData.price);
  formData.append("description", tourData.description);
  formData.append("published", tourData.published ? "true" : "false");

  if (tourData.coverImage?.[0]) {
    formData.append("coverImage", tourData.coverImage[0]);
  }

  if (tourData.images) {
    const imagesArray = Array.isArray(tourData.images)
      ? tourData.images
      : Array.from(tourData.images); // FileList → Array

    imagesArray.forEach((img) => {
      if (img) formData.append("images", img);
    });
  }

  for (let [key, value] of formData.entries()) {
    console.log("FormData:", key, value);
  }

  // ✅ No need to pass headers manually, axios will add boundary
  const { data } = await api.post("/admin/tours", formData);
  return data;
};

// ✅ Update tour (supports JSON or FormData automatically)
export const updateTour = async (id, tourData) => {
  let payload = tourData;

  // If files included, switch to FormData
  if (tourData.coverImage || tourData.images) {
    const formData = new FormData();
    Object.entries(tourData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    });
    payload = formData;
  }

  const { data } = await api.put(`/admin/tours/${id}`, payload);
  return data;
};

// ✅ Get all tours
export const getTours = async () => {
  const { data } = await api.get("/admin/tours");
  return data;
};

// ✅ Get one tour
export const getTourById = async (id) => {
  const { data } = await api.get(`/admin/tours/${id}`);
  console.log(data)
  return data;
};

// ✅ Delete
export const deleteTour = async (id) => {
  const { data } = await api.delete(`/admin/tours/${id}`);
  return data;
};
