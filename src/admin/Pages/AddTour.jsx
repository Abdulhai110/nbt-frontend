import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addTour } from "../service/tour-service";

export default function AddTour() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formValues) => {
    try {
      await addTour(formValues);
      alert("Tour created successfully!");
    } catch (err) {
      console.error("Add tour error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">➕ Add New Tour</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              {...register("title", { required: true })}
              className="form-control"
              placeholder="Enter tour title"
            />
          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              {...register("price")}
              className="form-control"
              placeholder="Enter price"
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="form-control"
              placeholder="Write details about the tour"
            />
          </div>

          {/* Locations */}
          <div className="mb-3">
            <label className="form-label">Locations</label>
            <input
              {...register("locations")}
              className="form-control"
              placeholder="Enter locations separated by commas"
            />
          </div>

          {/* Cover Image */}
          <div className="mb-3">
            <label className="form-label">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("coverImage")}
              className="form-control"
            />
          </div>

          {/* Gallery Images */}
          <div className="mb-3">
            <label className="form-label">Gallery Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
              className="form-control"
            />
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
              Publish Now
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100"
          >
            {loading ? "Saving..." : "Add Tour"}
          </button>
        </form>
      </div>
    </div>
  );
}
