// src/admin/Pages/Destinations.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENV } from "../../env/environment";
import toast from "react-hot-toast";

// ── View Modal ────────────────────────────────────────────────────────────────
function DestinationViewModal({ dest, onClose, onEdit, onDelete }) {
  const [imgIdx, setImgIdx] = useState(0);
  if (!dest) return null;

  const allImages = [
    ...(dest.coverImage ? [{ url: dest.coverImage }] : []),
    ...(dest.images || []),
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
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {allImages.length > 0 && (
          <div className="relative h-72 md:h-96 rounded-t-3xl overflow-hidden bg-slate-100">
            <img src={allImages[imgIdx]?.url} alt="" className="w-full h-full object-cover" style={{ transition: "opacity 0.3s" }} />
            {allImages.length > 1 && (
              <>
                <button onClick={() => setImgIdx(i => (i - 1 + allImages.length) % allImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 w-9 h-9 rounded-full flex items-center justify-center shadow transition">‹</button>
                <button onClick={() => setImgIdx(i => (i + 1) % allImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 w-9 h-9 rounded-full flex items-center justify-center shadow transition">›</button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {allImages.map((_, i) => (
                    <button key={i} onClick={() => setImgIdx(i)} className="rounded-full transition-all"
                      style={{ width: i === imgIdx ? 20 : 8, height: 8, background: i === imgIdx ? "#151D4A" : "rgba(255,255,255,0.6)" }} />
                  ))}
                </div>
              </>
            )}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${dest.published ? "bg-emerald-500 text-white" : "bg-amber-400 text-amber-900"}`}>
                {dest.published ? "● Live" : "● Draft"}
              </span>
              {dest.continent && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/40 text-white backdrop-blur-sm">{dest.continent}</span>
              )}
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center text-slate-600 shadow transition text-lg">×</button>
          </div>
        )}

        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{dest.name}</h2>

          <div className="flex flex-wrap gap-3 mt-4 mb-6">
            {dest.location && <Stat icon="📍" label="Location" value={dest.location} color="#151D4A" />}
            {dest.country  && <Stat icon="🌍" label="Country"  value={dest.country}  color="#6366f1" />}
            {dest.bestTimeToVisit && <Stat icon="🌤️" label="Best Time" value={dest.bestTimeToVisit} color="#0ea5e9" />}
          </div>

          {dest.description && <p className="text-slate-600 leading-relaxed text-sm mb-6">{dest.description}</p>}

          {dest.highlights?.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Highlights</p>
              <div className="flex flex-wrap gap-2">
                {dest.highlights.map((h, i) => (
                  <span key={i} className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-xl">✦ {h}</span>
                ))}
              </div>
            </div>
          )}

          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
              {allImages.map((img, i) => (
                <img key={i} src={img.url} onClick={() => setImgIdx(i)}
                  className="h-16 w-24 object-cover rounded-xl flex-shrink-0 cursor-pointer border-2 transition"
                  style={{ borderColor: i === imgIdx ? "#151D4A" : "transparent" }} />
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => { onEdit(dest._id); onClose(); }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold transition">Edit</button>
            <button onClick={() => { onDelete(dest._id); onClose(); }}
              className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-2xl font-semibold transition">Delete</button>
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

// ── Destination Card ───────────────────────────────────────────────────────────
function DestCard({ dest, onView, onDelete, onEdit }) {
  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
      style={{ transition: "transform 0.25s, box-shadow 0.25s" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
      onClick={() => onView(dest)}
    >
      <div className="relative h-52 bg-slate-100 overflow-hidden">
        {dest.coverImage ? (
          <img src={dest.coverImage} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-slate-200">🌍</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${dest.published ? "bg-emerald-500 text-white" : "bg-amber-400 text-amber-900"}`}>
            {dest.published ? "Live" : "Draft"}
          </span>
        </div>
        {dest.continent && (
          <div className="absolute top-3 left-3">
            <span className="bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">{dest.continent}</span>
          </div>
        )}
        {dest.images?.length > 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">+{dest.images.length} photos</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-1">{dest.name}</h3>

        {(dest.location || dest.country) && (
          <p className="text-slate-400 text-xs mb-3 flex items-center gap-1">
            <span>📍</span>
            <span className="truncate">{[dest.location, dest.country].filter(Boolean).join(", ")}</span>
          </p>
        )}

        {dest.description && (
          <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">{dest.description}</p>
        )}

        {dest.highlights?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {dest.highlights.slice(0, 3).map((h, i) => (
              <span key={i} className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg font-medium">{h}</span>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-auto pt-3 border-t border-slate-100" onClick={e => e.stopPropagation()}>
          <button onClick={() => onEdit(dest._id)}
            className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-medium transition">Edit</button>
          <button onClick={() => onDelete(dest._id)}
            className="flex-1 text-center bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl text-sm font-medium transition">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewDest, setViewDest] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => { fetchDestinations(); }, []);

  const fetchDestinations = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${ENV.BASE_URL}/admin/destinations`, {
        headers: { Authorization: token },
      });
      setDestinations(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch {
      toast.error("Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this destination? This cannot be undone.")) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${ENV.BASE_URL}/admin/destinations/${id}`, {
        headers: { Authorization: token },
      });
      toast.success("Destination deleted");
      fetchDestinations();
    } catch {
      toast.error("Failed to delete destination");
    }
  };

  const filtered = destinations.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.location?.toLowerCase().includes(search.toLowerCase()) ||
    d.country?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: destinations.length,
    published: destinations.filter(d => d.published).length,
    draft: destinations.filter(d => !d.published).length,
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center" style={{ fontFamily: "'Outfit',sans-serif" }}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500">Loading destinations...</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');`}</style>
      <div className="min-h-screen bg-slate-50 p-4 md:p-8" style={{ fontFamily: "'Outfit',sans-serif" }}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Destinations</h1>
              <p className="text-slate-400 mt-0.5 text-sm">Manage travel destinations</p>
            </div>
            <button
                onClick={() => navigate("/admin/destination/add")}
                className="flex items-center gap-2 text-white px-5 py-3 rounded-2xl font-semibold transition-all active:scale-95 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #151D4A 0%, #404569 100%)",
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(21, 29, 74, 0.30)",
                }}
            >
              <span className="text-lg">+</span>
              New Destination
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              {label: "Total", value: stats.total, color: "#151D4A", bg: "#f0fdf4"},
              {label: "Published", value: stats.published, color: "#10b981", bg: "#ecfdf5"},
              {label: "Drafts", value: stats.draft, color: "#94a3b8", bg: "#f8fafc"},
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
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, location, or country..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
            />
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center shadow">
              <div className="text-5xl mb-4">🌍</div>
              <p className="text-slate-500 text-lg font-medium">No destinations found</p>
              <p className="text-slate-400 text-sm mt-1">Try a different search or add your first destination</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(dest => (
                <DestCard
                  key={dest._id}
                  dest={{ ...dest, coverImage: dest.coverImage?.url || dest.coverImage }}
                  onView={setViewDest}
                  onEdit={(id) => navigate(`/admin/destination/edit/${id}`)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {viewDest && (
          <DestinationViewModal
            dest={viewDest}
            onClose={() => setViewDest(null)}
            onEdit={(id) => navigate(`/admin/destination/edit/${id}`)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}
