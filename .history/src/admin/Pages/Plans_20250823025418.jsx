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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">All Plans</h2>
        <Link
          to="/admin/plans/add"
          className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-lg shadow"
        >
          + Add New Plan
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <p className="p-4 text-gray-600">Loading plans...</p>
        ) : plans.length === 0 ? (
          <p className="p-4 text-gray-600">No plans available.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Duration</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {plans.map((plan, index) => (
                <tr
                  key={plan.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {plan.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">${plan.price}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {plan.duration} months
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-blue-600 hover:underline mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
