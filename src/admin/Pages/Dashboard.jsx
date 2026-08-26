// src/admin/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENV } from "../../env/environment";

// ── helpers ───────────────────────────────────────────────────────────────────
const fmt = (n) => Number(n || 0).toLocaleString();
const token = () => localStorage.getItem("authToken");
const get = (url) => axios.get(`${ENV.BASE_URL}${url}`, { headers: { Authorization: token() } });

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60)   return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, color, bg, onClick, delay }) {
  return (
    <div
      onClick={onClick}
      className="relative rounded-3xl p-6 overflow-hidden cursor-pointer group"
      style={{
        background: bg,
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        animation: `fadeUp 0.5s ease both`,
        animationDelay: delay,
      }}
    >
      {/* decorative circle */}
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ background: color }} />

      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
          style={{ background: `${color}20` }}>
          {icon}
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-xl"
          style={{ background: `${color}15`, color }}>
          View →
        </span>
      </div>

      <p className="text-3xl font-black text-slate-800 mb-0.5" style={{ fontFamily: "'Outfit',sans-serif", letterSpacing: "-1px" }}>
        {value}
      </p>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

// ── Recent Row ────────────────────────────────────────────────────────────────
function RecentItem({ img, title, sub, badge, badgeColor, time }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0">
        {img
          ? <img src={img} alt="" className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-xl">🗺️</div>
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{title}</p>
        <p className="text-xs text-slate-400 truncate">{sub}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <span className="text-xs font-bold px-2 py-0.5 rounded-lg" style={{ background: `${badgeColor}15`, color: badgeColor }}>
          {badge}
        </span>
        <p className="text-xs text-slate-400 mt-1">{time}</p>
      </div>
    </div>
  );
}

// ── Quick Action ──────────────────────────────────────────────────────────────
function QuickAction({ icon, label, to, color, navigate }) {
  return (
    <button
      onClick={() => navigate(to)}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105 active:scale-95 group"
      style={{ background: `${color}10` }}
    >
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl group-hover:shadow-lg transition-shadow"
        style={{ background: `${color}20` }}>
        {icon}
      </div>
      <span className="text-xs font-semibold text-slate-600">{label}</span>
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    tours: [], destinations: [], gallery: [], loading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const [toursRes, destsRes, galleryRes] = await Promise.allSettled([
          get("/admin/tours"),
          get("/admin/destinations"),
          get("/admin/gallery"),
        ]);

        setData({
          tours:        toursRes.status === "fulfilled"   ? (toursRes.value.data?.data   || []) : [],
          destinations: destsRes.status === "fulfilled"   ? (destsRes.value.data?.data   || []) : [],
          gallery:      galleryRes.status === "fulfilled" ? (galleryRes.value.data?.data || []) : [],
          loading: false,
        });
      } catch {
        setData(d => ({ ...d, loading: false }));
      }
    })();
  }, []);

  const { tours, destinations, gallery, loading } = data;

  // derived
  const publishedTours   = tours.filter(t => t.published).length;
  const publishedDests   = destinations.filter(d => d.published).length;
  const publishedGallery = gallery.filter(g => g.published).length;
  const recentTours      = [...tours].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const recentDests      = [...destinations].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center" style={{ fontFamily: "'Outfit',sans-serif" }}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
          style={{ borderColor: "#062A4D", borderTopColor: "transparent" }} />
        <p className="text-slate-400 text-sm">Loading dashboard…</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dash-root * { font-family: 'Outfit', sans-serif; }
      `}</style>

      <div className="dash-root min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* ── Hero greeting ── */}
          <div
            className="relative rounded-3xl overflow-hidden p-8 md:p-10"
            style={{
              background: "linear-gradient(135deg, #062A4D 0%, #2E7D32 100%)",
              animation: "fadeUp 0.4s ease both",
              boxShadow: "0 16px 48px rgba(76,175,80,0.25)",
            }}
          >
            {/* decorative blobs */}
            <div className="absolute right-0 top-0 w-72 h-72 rounded-full opacity-10"
              style={{ background: "#fff", transform: "translate(30%, -30%)" }} />
            <div className="absolute right-20 bottom-0 w-40 h-40 rounded-full opacity-10"
              style={{ background: "#fff", transform: "translateY(40%)" }} />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">{greeting} 👋</p>
                <h1 className="text-white text-3xl md:text-4xl font-black leading-tight" style={{ letterSpacing: "-1px" }}>
                  Welcome back,<br />Admin
                </h1>
                <p className="text-green-100 text-sm mt-3 max-w-md">
                  Here's what's happening across your portal today.
                </p>
              </div>
              {/* mini summary */}
              <div className="flex gap-4 flex-wrap">
                {[
                  { label: "Tours",        value: tours.length },
                  { label: "Destinations", value: destinations.length },
                  { label: "Gallery",       value: gallery.length },
                ].map(s => (
                  <div key={s.label} className="text-center bg-white/15 rounded-2xl px-5 py-3 backdrop-blur-sm">
                    <p className="text-white text-2xl font-black">{fmt(s.value)}</p>
                    <p className="text-green-100 text-xs font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Total Tours" value={fmt(tours.length)}
              sub={`${publishedTours} published`}
              icon="🗺️" color="#062A4D" bg="#fff"
              onClick={() => navigate("/admin/tour")} delay="0.05s"
            />
            <StatCard
              label="Destinations" value={fmt(destinations.length)}
              sub={`${publishedDests} published`}
              icon="📍" color="#0ea5e9" bg="#fff"
              onClick={() => navigate("/admin/destination")} delay="0.1s"
            />
            <StatCard
              label="Gallery Photos" value={fmt(gallery.length)}
              sub={`${publishedGallery} live`}
              icon="🖼️" color="#8b5cf6" bg="#fff"
              onClick={() => navigate("/admin/gallery")} delay="0.15s"
            />
            <StatCard
              label="Draft Tours" value={fmt(tours.length - publishedTours)}
              sub="awaiting publish"
              icon="📝" color="#f59e0b" bg="#fff"
              onClick={() => navigate("/admin/tour")} delay="0.2s"
            />
          </div>

          {/* ── Main content: Recent + Quick Actions ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Recent Tours */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm"
              style={{ animation: "fadeUp 0.5s ease 0.2s both" }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-slate-800 text-lg">Recent Tours</h2>
                <button onClick={() => navigate("/admin/tour")}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl transition"
                  style={{ background: "#f0fdf4", color: "#062A4D" }}>
                  View all →
                </button>
              </div>

              {recentTours.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-sm">No tours yet</p>
                </div>
              ) : (
                recentTours.map(tour => (
                  <RecentItem
                    key={tour._id}
                    img={tour.coverImage?.url || tour.coverImage}
                    title={tour.title}
                    sub={`$${fmt(tour.price)} · ${tour.duration || "—"} days`}
                    badge={tour.published ? "Live" : "Draft"}
                    badgeColor={tour.published ? "#062A4D" : "#f59e0b"}
                    time={timeAgo(tour.createdAt)}
                  />
                ))
              )}
            </div>

            {/* Right column */}
            <div className="space-y-6">

              {/* Quick Actions */}
              <div className="bg-white rounded-3xl p-6 shadow-sm" style={{ animation: "fadeUp 0.5s ease 0.25s both" }}>
                <h2 className="font-bold text-slate-800 text-lg mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <QuickAction icon="➕" label="New Tour"         to="/admin/tour/add"         color="#062A4D" navigate={navigate} />
                  <QuickAction icon="🌍" label="New Destination"  to="/admin/destination/add"  color="#0ea5e9" navigate={navigate} />
                  <QuickAction icon="📷" label="Add Photo"        to="/admin/gallery"          color="#8b5cf6" navigate={navigate} />
                  <QuickAction icon="👥" label="Manage Users"     to="/admin/users"            color="#f59e0b" navigate={navigate} />
                </div>
              </div>

              {/* Recent Destinations */}
              <div className="bg-white rounded-3xl p-6 shadow-sm" style={{ animation: "fadeUp 0.5s ease 0.3s both" }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-slate-800 text-lg">Destinations</h2>
                  <button onClick={() => navigate("/admin/destination")}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl"
                    style={{ background: "#f0fdf4", color: "#062A4D" }}>
                    View all →
                  </button>
                </div>
                {recentDests.length === 0 ? (
                  <div className="text-center py-6 text-slate-400">
                    <div className="text-3xl mb-1">📍</div>
                    <p className="text-xs">No destinations yet</p>
                  </div>
                ) : (
                  recentDests.map(dest => (
                    <RecentItem
                      key={dest._id}
                      img={dest.coverImage?.url || dest.coverImage}
                      title={dest.name}
                      sub={[dest.location, dest.country].filter(Boolean).join(", ") || "—"}
                      badge={dest.published ? "Live" : "Draft"}
                      badgeColor={dest.published ? "#062A4D" : "#f59e0b"}
                      time={timeAgo(dest.createdAt)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ── Gallery Strip ── */}
          {gallery.length > 0 && (
            <div className="bg-white rounded-3xl p-6 shadow-sm" style={{ animation: "fadeUp 0.5s ease 0.35s both" }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-slate-800 text-lg">Recent Gallery</h2>
                <button onClick={() => navigate("/admin/gallery")}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl"
                  style={{ background: "#f5f3ff", color: "#8b5cf6" }}>
                  View all →
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {[...gallery].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10).map(item => (
                  <div key={item._id}
                    className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 group relative cursor-pointer"
                    onClick={() => navigate("/admin/gallery")}>
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    {!item.published && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Draft</span>
                      </div>
                    )}
                  </div>
                ))}
                {gallery.length > 10 && (
                  <div onClick={() => navigate("/admin/gallery")}
                    className="flex-shrink-0 w-24 h-24 rounded-2xl bg-slate-100 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition">
                    <span className="text-slate-400 text-2xl font-black">+{gallery.length - 10}</span>
                    <span className="text-slate-400 text-xs mt-0.5">more</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Overview bar ── */}
          <div className="bg-white rounded-3xl p-6 shadow-sm" style={{ animation: "fadeUp 0.5s ease 0.4s both" }}>
            <h2 className="font-bold text-slate-800 text-lg mb-5">Content Overview</h2>
            <div className="space-y-4">
              {[
                { label: "Tours Published",        value: publishedTours,              total: tours.length,        color: "#062A4D" },
                { label: "Destinations Published",  value: publishedDests,              total: destinations.length, color: "#0ea5e9" },
                { label: "Gallery Live",            value: publishedGallery,            total: gallery.length,      color: "#8b5cf6" },
              ].map(row => {
                const pct = row.total === 0 ? 0 : Math.round((row.value / row.total) * 100);
                return (
                  <div key={row.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-600">{row.label}</span>
                      <span className="font-bold text-slate-800">{row.value} / {row.total}</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: row.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
