import React from "react";
import { Link } from "react-router-dom";

export default function Plans() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Plans</h2>
      <Link
        to="/admin/plans/add"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add New Plan
      </Link>
      {/* Later fetch plans with Axios and display in a table */}
    </div>
  );
}
