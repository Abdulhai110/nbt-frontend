import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ENV } from "../../env/environment";

export default function Tours() {
  const [plans, setPlans] = useState([]); // start with empty
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${ENV.BASE_URL}/admin/tours`, {
        headers: { Authorization: token },
      });

      // If response is an array, use it; otherwise empty
      setPlans(Array.isArray(response.data?.data) ? response.data?.data : []);
    } catch (err) {
      console.error("Error fetching plans:", err);
      setError("Failed to load plans. Please try again later.");
      setPlans([]); // ensure empty state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Subscription Plans
        </h2>
        <Link
          to="/admin/plans/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-200 text-sm sm:text-base"
        >
          + Add New Plan
        </Link>
      </div>

      {/* Table / States */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          // Loading spinner
          <div className="p-6 flex items-center justify-center">
            <svg
              className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-indigo-600"
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
            <span className="ml-3 text-base sm:text-lg text-gray-600">
              Loading plans...
            </span>
          </div>
        ) : error ? (
          // Error message
          <p className="p-6 text-center text-red-500 text-base sm:text-lg">
            {error}
          </p>
        ) : plans.length === 0 ? (
          // Empty state
          <p className="p-6 text-center text-gray-500 text-base sm:text-lg">
            No plans available. Create a new plan to get started!
          </p>
        ) : (
          // Table data
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-indigo-100 text-indigo-900 uppercase text-xs sm:text-sm font-semibold">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left w-16">#</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left">Name</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left w-24">Price</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left w-32">Duration</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-center w-48">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {plans.map((plan, index) => (
                  <tr
                    key={plan.id || plan._id}
                    className="hover:bg-indigo-50 transition-all duration-200"
                  >
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base">
                      {index + 1}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 text-sm sm:text-base">
                      {plan.name || plan.title}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base">
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs sm:text-sm">
                        ${Number(plan.price).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base">
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm">
                        {plan.duration} {plan.duration === 1 ? "month" : "months"}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-center space-x-2 sm:space-x-4">
                      <Link
                        to={`/admin/tour/edit/${plan.id || plan._id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-150 text-sm sm:text-base"
                      >
                        Edit
                      </Link>
                      <button className="text-red-600 hover:text-red-800 font-medium transition-colors duration-150 text-sm sm:text-base">
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
