import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaPlus, FaUsers, FaCog } from "react-icons/fa";
import "./Layout.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { to: "/admin", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/admin/tour", label: "Tour", icon: <FaClipboardList /> },
    { to: "/admin/tour/add", label: "Add Tour", icon: <FaPlus /> },
    { to: "/admin/users", label: "Users", icon: <FaUsers /> },
    { to: "/admin/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">{collapsed ? "AP" : "Admin Panel"}</h2>
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, i) => (
          <NavLink key={i} to={item.to} className="sidebar-link">
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-text">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
