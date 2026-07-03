// src/admin/Pages/Tours.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ENV } from "../../env/environment";
import toast from "react-hot-toast";

// ── tiny helpers ──────────────────────────────────────────────────────────────
const fmt = (n) => Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

// ── View Modal ────────────────────────────────────────────────────────────────
function TourViewModal({ tour, onClose, onEdit, onDelete }) {
  const [imgIdx, setImgIdx] = useState(0);
  if (!tour) return null;

  const allImages = [
    ...(tour.coverImage ? [{ url: tour.coverImage }] : []),
    ...(tour.images || []),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,12,20,0.82)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {/* Image carousel */}
        {allImages.length > 0 && (
          <div className="relative h-72 md:h-96 rounded-t-3xl overflow-hidden bg-slate-100">
            <img
              src={allImages[imgIdx]?.url}
              alt=""
              className="w-full h-full object-cover"
              style={{ transition: "opacity 0.3s" }}
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx((i) => (i - 1 + allImages.length) % allImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 w-9 h-9 rounded-full flex items-center justify-center shadow transition"
                >‹</button>
                <button
                  onClick={() => setImgIdx((i) => (i + 1) % allImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 w-9 h-9 rounded-full flex items-center justify-center shadow transition"
                >›</button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className="rounded-full transition-all"
                      style={{ width: i === imgIdx ? 20 : 8, height: 8, background: i === imgIdx ? "#151D4A" : "rgba(255,255,255,0.6)" }}
                    />
                  ))}
                </div>
              </>
            )}
            {/* badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${tour.published ? "bg-emerald-500 text-white" : "bg-amber-400 text-amber-900"}`}>
                {tour.published ? "● Live" : "● Draft"}
              </span>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center text-slate-600 shadow transition text-lg">×</button>
          </div>
        )}

        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{tour.title}</h2>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 mt-4 mb-6">
            <Stat icon="💰" label="Price" value={`$${fmt(tour.price)}`} color="#151D4A" />
            {tour.duration && <Stat icon="📅" label="Duration" value={`${tour.duration} days`} color="#0ea5e9" />}
            {tour.locations?.length > 0 && <Stat icon="📍" label="Locations" value={tour.locations.join(" · ")} color="#151D4A" />}
          </div>

          {tour.description && (
            <p className="text-slate-600 leading-relaxed text-sm mb-6">{tour.description}</p>
          )}

          {/* Thumbnail strip */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
              {allImages.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  onClick={() => setImgIdx(i)}
                  className="h-16 w-24 object-cover rounded-xl flex-shrink-0 cursor-pointer border-2 transition"
                  style={{ borderColor: i === imgIdx ? "#151D4A" : "transparent" }}
                />
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => { onEdit(tour._id); onClose(); }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold transition"
            >Edit Tour</button>
            <button
              onClick={() => { onDelete(tour._id); onClose(); }}
              className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-2xl font-semibold transition"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
      <span>{icon}</span>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-semibold" style={{ color }}>{value}</p>
      </div>
    </div>
  );
}

// ── Tour Card ─────────────────────────────────────────────────────────────────
function TourCard({ tour, onView, onDelete }) {
  const navigate = useNavigate();
  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
      style={{ transform: "translateY(0)", transition: "transform 0.25s, box-shadow 0.25s" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
      onClick={() => onView(tour)}
    >
      {/* Cover */}
      <div className="relative h-52 bg-slate-100 overflow-hidden">
        {tour.coverImage ? (
          <img src={tour.coverImage} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-slate-300">🗺️</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${tour.published ? "bg-emerald-500 text-white" : "bg-amber-400 text-amber-900"}`}>
            {tour.published ? "Live" : "Draft"}
          </span>
        </div>
        {tour.images?.length > 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
              +{tour.images.length} photos
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-1 line-clamp-2">{tour.title}</h3>

        {tour.locations?.length > 0 && (
          <p className="text-slate-400 text-xs mb-3 flex items-center gap-1">
            <span>📍</span>
            <span className="truncate">{tour.locations.join(" · ")}</span>
          </p>
        )}

        {tour.description && (
          <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">{tour.description}</p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div>
            <span className="text-2xl font-black text-green-600">${fmt(tour.price)}</span>
            {tour.duration && <span className="text-slate-400 text-xs ml-2">/ {tour.duration}d</span>}
          </div>
          <div className="flex gap-2" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => navigate(`/admin/tour/edit/${tour._id}`)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition"
            >Edit</button>
            <button
              onClick={() => onDelete(tour._id)}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium transition"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewTour, setViewTour] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => { fetchTours(); }, []);

  const fetchTours = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${ENV.BASE_URL}/admin/tours`, {
        headers: { Authorization: token },
      });
      setTours(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch {
      toast.error("Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour? This cannot be undone.")) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${ENV.BASE_URL}/admin/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Tour deleted");
      fetchTours();
    } catch {
      toast.error("Failed to delete tour");
    }
  };

  const filtered = tours.filter(t =>
    t.title?.toLowerCase().includes(search.toLowerCase()) ||
    t.locations?.some(l => l.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = {
    total: tours.length,
    published: tours.filter(t => t.published).length,
    draft: tours.filter(t => !t.published).length,
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center" style={{ fontFamily: "'Sora', sans-serif" }}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500">Loading tours...</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');`}</style>
      <div className="min-h-screen bg-slate-50 p-4 md:p-8" style={{ fontFamily: "'Sora', sans-serif" }}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tours</h1>
              <p className="text-slate-400 mt-0.5 text-sm">Manage your tour packages</p>
            </div>
            <Link
                to="/admin/tour/add"
                className="flex items-center gap-2 text-white px-5 py-3 rounded-2xl font-semibold transition-all active:scale-95 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #151D4A 0%, #404569 100%)",
                  boxShadow: "0 8px 24px rgba(21, 29, 74, 0.30)",
                }}
            >
              <span className="text-lg">+</span> New Tour
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total", value: stats.total, color: "#151D4A", bg: "#f0fdf4" },
              { label: "Published", value: stats.published, color: "#10b981", bg: "#ecfdf5" },
              { label: "Drafts", value: stats.draft, color: "#151D4A", bg: "#fffbeb" },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: s.bg }}>
                <span className="text-2xl font-black" style={{ color: s.color }}>{s.value}</span>
                <span className="text-sm font-medium" style={{ color: s.color }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title or location..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
            />
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center shadow">
              <div className="text-5xl mb-4">🗺️</div>
              <p className="text-slate-500 text-lg font-medium">No tours found</p>
              <p className="text-slate-400 text-sm mt-1">Try a different search or create your first tour</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(tour => (
                <TourCard
                  key={tour._id}
                  tour={{ ...tour, coverImage: tour.coverImage?.url || tour.coverImage }}
                  onView={setViewTour}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {viewTour && (
          <TourViewModal
            tour={viewTour}
            onClose={() => setViewTour(null)}
            onEdit={(id) => navigate(`/admin/tour/edit/${id}`)}
            onDelete={(id) => { handleDelete(id); setViewTour(null); }}
          />
        )}
      </div>
    </>
  );
}
