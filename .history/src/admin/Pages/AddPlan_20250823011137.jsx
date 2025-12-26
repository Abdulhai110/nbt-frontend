import React, { useState } from "react";

export default function AddPlan() {
  const [form, setForm] = useState({ title: "", price: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Plan Submitted:", form);
    // TODO: Send data to backend using Axios
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Plan</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Plan Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Plan
        </button>
      </form>
    </div>
  );
}
