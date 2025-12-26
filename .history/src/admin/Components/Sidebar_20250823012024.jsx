import React from "react";
import { NavLink } from "react-router-dom";
import "./Layout.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-nav">
        <NavLink to="/admin" className="sidebar-link">
          Dashboard
        </NavLink>
        <NavLink to="/admin/plans" className="sidebar-link">
          Plans
        </NavLink>
        <NavLink to="/admin/plans/add" className="sidebar-link">
          Add Plan
        </NavLink>
        <NavLink to="/admin/users" className="sidebar-link">
          Users
        </NavLink>
        <NavLink to="/admin/settings" className="sidebar-link">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
