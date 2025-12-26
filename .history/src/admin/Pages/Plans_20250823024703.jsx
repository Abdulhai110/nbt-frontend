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
      setLoading(true);
      const res = await axios.get("/admin/plan/list", {
        headers: {
          Authorization: "Bearer dummy_token_here", // replace with real token
        },
      });
      setPlans(res.data || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header with button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Plans</h2>
        <Link
          to="/admin/plans/add"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          + Add New Plan
        </Link>
      </div>

      {/* Plans Table */}
      <div className="bg-white shadow rounded-lg p-4">
        {loading ? (
          <p className="text-gray-500">Loading plans...</p>
        ) : plans.length === 0 ? (
          <p className="text-gray-500">No plans available.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Duration</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{plan.id}</td>
                  <td className="p-2 border">{plan.name}</td>
                  <td className="p-2 border">${plan.price}</td>
                  <td className="p-2 border">{plan.duration} days</td>
                  <td className="p-2 border">
                    <Link
                      to={`/admin/plans/edit/${plan.id}`}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => console.log("Delete", plan.id)}
                    >
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
