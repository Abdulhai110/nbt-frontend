import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getTourById, updateTour } from "../service/tour-service";

export default function EditTour() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTour() {
      try {
        const tour = await getTourById(id);
        // Pre-fill form values
        reset({
          title: tour.title,
          price: tour.price,
          description: tour.description,
          locations: tour.locations?.join(", "),
          published: tour.published,
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
      await updateTour(id, formValues);
      alert("Tour updated successfully!");
      navigate("/tour");
    } catch (err) {
      console.error("Update tour error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex justify-between items-center">
        Edit Tour
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            {...register("price")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            rows={4}
          />
        </div>

        {/* Locations */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Locations</label>
          <input
            {...register("locations")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Published */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" {...register("published")} />
          <label className="text-gray-700">Published</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium w-full"
        >
          {loading ? "Updating..." : "Update Tour"}
        </button>
      </form>
    </div>
  );
}
