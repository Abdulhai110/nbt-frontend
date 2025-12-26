import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("/admin/plan/list", {
        headers: {
          Authorization: token,
        },
      });
      setPlans(response.data?.plans || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
          Subscription Plans
        </h2>
        <Link
          to="/admin/plans/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-200"
        >
          + Add New Plan
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-6 flex items-center justify-center">
            <svg
              className="animate-spin h-8 w-8 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <span className="ml-3 text-lg text-gray-600">Loading plans...</span>
          </div>
        ) : plans.length === 0 ? (
          <p className="p-6 text-center text-gray-500 text-lg">
            No plans available. Create a new plan to get started!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-indigo-50 text-indigo-900 uppercase text-sm font-semibold">
                <tr>
                  <th className="px-6 py-4 text-left">#</th>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Duration</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {plans.map((plan, index) => (
                  <tr
                    key={plan.id}
                    className="hover:bg-indigo-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {plan.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        ${plan.price}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {plan.duration} months
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-3">
                      <Link
                        to={`/admin/plans/edit/${plan.id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-150"
                      >
                        Edit
                      </Link>
                      <button className="text-red-600 hover:text-red-800 font-medium transition-colors duration-150">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}