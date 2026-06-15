// src/admin/Components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f8fafc" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <Header />
        <main style={{ flex: 1, overflowY: "auto", padding: "0" }}>
          {children}
        </main>
      </div>
    </div>
  );
}