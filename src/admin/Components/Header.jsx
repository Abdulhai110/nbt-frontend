// src/admin/Components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const BREADCRUMB_MAP = {
  "/admin": "Dashboard",
  "/admin/tour": "Tours",
  "/admin/tour/add": "New Tour",
  "/admin/destination":      "Destinations",      // ← add
  "/admin/destination/add":  "New Destination", 
  "/admin/gallery":         "Gallery",       // ← add
  "/admin/users": "Users",
  "/admin/settings": "Settings",
};

function getBreadcrumb(pathname) {
  if (BREADCRUMB_MAP[pathname]) return BREADCRUMB_MAP[pathname];
  if (pathname.includes("/tour/edit/")) return "Edit Tour";
  if (pathname.includes("/destination/edit/")) return "Edit Destination"; // ← add
if (pathname.includes("/tour/edit/"))        return "Edit Tour";
  return "Admin";
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const breadcrumb = getBreadcrumb(location.pathname);
  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        .header-root { font-family: 'Outfit', sans-serif; }
        .avatar-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 200px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08);
          overflow: hidden;
          z-index: 999;
          animation: menuIn 0.15s ease;
        }
        @keyframes menuIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header
        className="header-root flex items-center justify-between px-6 py-0 flex-shrink-0"
        style={{
          height: 68,
          background: "#fff",
          borderBottom: "1px solid #f1f5f9",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        {/* Left: breadcrumb */}
        <div>
          <p className="text-xs font-medium" style={{ color: "#94a3b8", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {getGreeting()}
          </p>
          <h1 className="font-bold text-slate-800" style={{ fontSize: 18, letterSpacing: "-0.3px", lineHeight: 1.3 }}>
            {breadcrumb}
          </h1>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button
            className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{ background: "#f8fafc", color: "#64748b" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#334155"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#64748b"; }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9.33-5M15 17H9m6 0a3 3 0 01-6 0" />
            </svg>
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "#4CAF50", border: "2px solid #fff" }}
            />
          </button>

          {/* Divider */}
          <div className="w-px h-6" style={{ background: "#e2e8f0" }} />

          {/* Avatar + dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="flex items-center gap-2.5 rounded-2xl px-2 py-1.5 transition-all"
              style={{ background: menuOpen ? "#f1f5f9" : "transparent" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; }}
              onMouseLeave={e => { if (!menuOpen) e.currentTarget.style.background = "transparent"; }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#4CAF50,#d97706)", color: "#fff" }}
              >
                {initials}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-slate-700 leading-tight">{user?.name || "Admin"}</p>
                <p className="text-xs" style={{ color: "#94a3b8" }}>{user?.email || "admin@panel.com"}</p>
              </div>
              <svg
                width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                style={{ color: "#94a3b8", transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {menuOpen && (
              <div className="avatar-menu">
                <div className="px-4 py-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Account</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-slate-400">{user?.email || ""}</p>
                </div>
                {[
                  { label: "Profile", icon: "👤", action: () => navigate("/admin/settings") },
                  { label: "Settings", icon: "⚙️", action: () => navigate("/admin/settings") },
                  { label: "View Site", icon: "🌐", action: () => window.open("/", "_self") },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => { item.action(); setMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition text-left"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <span>{item.icon}</span>{item.label}
                  </button>
                ))}
                <div style={{ borderTop: "1px solid #f1f5f9" }}>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition text-left"
                    style={{ color: "#ef4444", fontFamily: "Outfit, sans-serif" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}