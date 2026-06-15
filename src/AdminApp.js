// src/AdminApp.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./admin/Components/Layout";
import Dashboard from "./admin/Pages/Dashboard";
import Tours from "./admin/Pages/Tours";
import TourForm from "./admin/Pages/TourForm";
import Destinations from "./admin/Pages/Destinations";
import DestinationForm from "./admin/Pages/DestinationForm";
import GalleryPage from "./admin/Pages/Gallery";

export default function AdminApp() {
  return (
    <Layout>
      <Routes>
        <Route path="/"                     element={<Dashboard />} />
        <Route path="/tour"                 element={<Tours />} />
        <Route path="/tour/add"             element={<TourForm />} />
        <Route path="/tour/edit/:id"        element={<TourForm />} />
        <Route path="/destination"          element={<Destinations />} />
        <Route path="/destination/add"      element={<DestinationForm />} />
        <Route path="/destination/edit/:id" element={<DestinationForm />} />
        <Route path="/gallery"              element={<GalleryPage />} />
        {/* ✅ unknown admin routes stay inside admin, don't leak out */}
        <Route path="*"                     element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}