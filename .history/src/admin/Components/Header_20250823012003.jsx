import React from "react";
import "./Layout.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Admin Dashboard</h1>
      <button className="logout-btn">Logout</button>
    </header>
  );
};

export default Header;
