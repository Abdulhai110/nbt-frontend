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
import TourTypes from "./admin/Pages/TourTypes";
import PricingCategories from "./admin/Pages/PricingCategories";

export default function AdminApp() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tour" element={<Tours />} />
        <Route path="/tour/add" element={<TourForm />} />
        <Route path="/tour/edit/:id" element={<TourForm />} />
        <Route path="/destination" element={<Destinations />} />
        <Route path="/destination/add" element={<DestinationForm />} />
        <Route path="/destination/edit/:id" element={<DestinationForm />} />
        <Route path="/gallery" element={<GalleryPage />} />
        {/* <Route path="tour-types" element={<TourTypes />} />
        <Route path="pricing-categories" element={<PricingCategories />} /> */}
        {/* ✅ unknown admin routes stay inside admin, don't leak out */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
