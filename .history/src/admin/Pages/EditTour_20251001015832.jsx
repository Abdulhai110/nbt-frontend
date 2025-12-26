import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getTourById, updateTour } from "../service/tour-service";

export default function EditTour() {
  const { id } = useParams();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [tour, setTour] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTour() {
      try {
        const res = await getTourById(id);
        setTour(res);

        // Pre-fill form values
        reset({
          title: res.title,
          price: res.price,
          description: res.description,
          locations: res.locations?.join(", "),
          published: res.published,
        });
      } catch (err) {
        console.error("Fetch tour error:", err.response?.data || err.message);
      }
    }
    if (id) fetchTour();
  }, [id, reset]);

  const onSubmit = async (formValues) => {
    try {
      setLoading(true);

      // Build FormData for images + text fields
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
        if (key !== "coverImage" && key !== "images") {
          formData.append(key, formValues[key]);
        }
      });

      // Cover image
      if (formValues.coverImage?.[0]) {
        formData.append("coverImage", formValues.coverImage[0]);
      }

      // Gallery images
      if (formValues.images?.length) {
        Array.from(formValues.images).forEach((file) => {
          formData.append("images", file);
        });
      }

      await updateTour(id, formData);
      alert("Tour updated successfully!");
      navigate("/tour");
    } catch (err) {
      console.error("Update tour error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (<div className="container mt-5">
  <div className="card shadow p-4">
    <h2 className="mb-4">Edit Tour</h2>

    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          {...register("title", { required: true })}
          className="form-control"
        />
      </div>

      {/* Price */}
      <div className="mb-3">
        <label className="form-label">Price ($)</label>
        <input
          type="number"
          {...register("price")}
          className="form-control"
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          className="form-control"
        />
      </div>

      {/* Locations */}
      <div className="mb-3">
        <label className="form-label">Locations</label>
        <input {...register("locations")} className="form-control" />
      </div>

      {/* Published */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          {...register("published")}
          className="form-check-input"
          id="published"
        />
        <label htmlFor="published" className="form-check-label">
          Published
        </label>
      </div>

      {/* Cover Image */}
      <div className="mb-3">
        <label className="form-label">Cover Image</label>
        {tour?.coverImage && (
          <img
            src={tour.coverImage}
            alt="cover"
            className="img-thumbnail mb-2"
            style={{ maxHeight: "150px" }}
          />
        )}
        <input type="file" accept="image/*" {...register("coverImage")} className="form-control" />
      </div>

      {/* Gallery Images */}
      <div className="mb-3">
        <label className="form-label">Gallery Images</label>
        <div className="d-flex flex-wrap gap-2 mb-2">
          {tour?.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`tour-${idx}`}
              className="img-thumbnail"
              style={{ maxHeight: "100px" }}
            />
          ))}
        </div>
        <input type="file" multiple accept="image/*" {...register("images")} className="form-control" />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-100"
      >
        {loading ? "Updating..." : "Update Tour"}
      </button>
    </form>
  </div>
</div>
  );
}
