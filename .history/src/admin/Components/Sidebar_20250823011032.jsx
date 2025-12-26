import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-60 bg-blue-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-3">
        <NavLink to="/admin" className="hover:bg-blue-600 p-2 rounded">
          Dashboard
        </NavLink>
        <NavLink to="/admin/plans" className="hover:bg-blue-600 p-2 rounded">
          Plans
        </NavLink>
        <NavLink to="/admin/plans/add" className="hover:bg-blue-600 p-2 rounded">
          Add Plan
        </NavLink>
        <NavLink to="/admin/users" className="hover:bg-blue-600 p-2 rounded">
          Users
        </NavLink>
        <NavLink to="/admin/settings" className="hover:bg-blue-600 p-2 rounded">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
