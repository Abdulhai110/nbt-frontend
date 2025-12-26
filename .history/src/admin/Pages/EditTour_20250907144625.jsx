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
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex justify-between items-center">
        Add New Tour
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            placeholder="Tour title"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            {...register("price")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter price"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            rows={4}
            placeholder="Write details about the tour"
          />
        </div>

        {/* Locations */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Locations
          </label>
          <input
            {...register("locations")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter locations separated by commas"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("coverImage")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Gallery Images */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Gallery Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register("images")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Published */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" {...register("published")} />
          <label className="text-gray-700">Publish Now</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium w-full"
        >
          {loading ? "Saving..." : "Add Tour"}
        </button>
      </form>
    </div>
  );
}
