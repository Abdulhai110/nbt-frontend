import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./admin/Components/Layout";
import Dashboard from "./admin/Pages/Dashboard";
import AddTour from "./admin/Pages/AddTour";
import Tours from "./admin/Pages/Tours";

export default function AdminApp() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tour" element={<Tours />} />
        <Route path="/tour/add" element={<AddTour />} />
        <Route path="/tour/edit/:id" element={<AddTour />} />
        {/* <Route path="/users" element={<Users />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}
