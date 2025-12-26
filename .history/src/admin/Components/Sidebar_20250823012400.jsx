import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Layout.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">{collapsed ? "AP" : "Admin Panel"}</h2>
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

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
