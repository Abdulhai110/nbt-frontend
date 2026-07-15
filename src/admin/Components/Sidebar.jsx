// src/admin/Components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV = [
  {
    to: "/admin",
    exact: true,
    label: "Dashboard",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  // {
  //   to: "/admin/tour-types",
  //   label: "Tour Types",
  //   icon: (
  //     <svg
  //       width="18"
  //       height="18"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //       strokeWidth={1.8}
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M7 7h.01M3 11V7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   to: "/admin/pricing-categories",
  //   label: "Pricing Categories",
  //   icon: (
  //     <svg
  //       width="18"
  //       height="18"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //       strokeWidth={1.8}
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M9 5H7a2 2 0 00-2 2v3.586a1 1 0 00.293.707l6.414 6.414a2 2 0 002.828 0l3.586-3.586a2 2 0 000-2.828l-6.414-6.414A1 1 0 0011 5H9z"
  //       />
  //       <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9.5h.01" />
  //     </svg>
  //   ),
  // },
  {
    to: "/admin/tour",
    label: "Tours",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7"
        />
      </svg>
    ),
  },
  {
    to: "/admin/destination",
    label: "Destinations",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        />
      </svg>
    ),
  },
  {
    to: "/admin/gallery",
    label: "Gallery",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  // {
  //   to: "/admin/users",
  //   label: "Users",
  //   icon: (
  //     <svg
  //       width="18"
  //       height="18"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //       strokeWidth={1.8}
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m8-5a4 4 0 11-8 0 4 4 0 018 0z"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   to: "/admin/settings",
  //   label: "Settings",
  //   icon: (
  //     <svg
  //       width="18"
  //       height="18"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //       strokeWidth={1.8}
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
  //       />
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  //       />
  //     </svg>
  //   ),
  // },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.to;
    return location.pathname.startsWith(item.to);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        .sidebar-root { font-family: 'Outfit', sans-serif; }
        .nav-link-item { position: relative; }
        .nav-link-item .tooltip {
          position: absolute;
          left: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          background: #1e2433;
          color: #f1f5f9;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 8px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s;
          z-index: 100;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .nav-link-item:hover .tooltip { opacity: 1; }
        .sidebar-toggle {
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>

      <aside
        className="sidebar-root flex flex-col h-screen sticky top-0 flex-shrink-0 transition-all duration-300"
        style={{
          width: collapsed ? 72 : 240,
          background: "linear-gradient(180deg, #0f1623 0%, #131c2e 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div
            className="flex items-center justify-content-center gap-3 p-3"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              minHeight: 68,
            }}
        >
          <div
              className={`flex items-center ${
                  collapsed ? "justify-center" : "justify-center"
              }`}
              style={{
                minHeight: 68,
              }}
          >
            <NavLink to="/">
              <img
                  src="/assets/img/nbt-logo.png"
                  alt="NBT Logo"
                  style={{
                    width: collapsed ? "80px" : "170px",
                    height: "auto",
                    objectFit: "contain",
                    transition: "all .3s ease",
                  }}
              />
            </NavLink>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = isActive(item);
            return (
                <div key={item.to} className="nav-link-item">
                  <NavLink
                      to={item.to}
                      end={item.exact}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group"
                      style={{
                    background: active
                      ? "rgba(245,158,11,0.12)"
                      : "transparent",
                    color: active ? "#F2E3E0" : "#94a3b8",
                    fontWeight: active ? 600 : 400,
                    fontSize: 14,
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                    if (!active) e.currentTarget.style.color = "#e2e8f0";
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      e.currentTarget.style.background = "transparent";
                    if (!active) e.currentTarget.style.color = "#94a3b8";
                  }}
                >
                  {/* Active indicator */}
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full transition-all"
                    style={{ background: active ? "#F2E3E0" : "transparent" }}
                  />
                  <span
                    className="flex-shrink-0"
                    style={{ color: active ? "#F2E3E0" : "inherit" }}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
                {collapsed && <span className="tooltip">{item.label}</span>}
              </div>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div
          className="p-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl transition-all duration-150"
            style={{ color: "#64748b", fontSize: 13 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "#94a3b8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#64748b";
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="sidebar-toggle"
              style={{
                transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19l-7-7 7-7M18 19l-7-7 7-7"
              />
            </svg>
            {!collapsed && (
              <span
                style={{ fontFamily: "Outfit, sans-serif", fontWeight: 500 }}
              >
                Collapse
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
