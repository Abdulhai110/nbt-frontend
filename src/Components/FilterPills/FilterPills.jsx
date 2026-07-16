// src/Components/Tour/FilterPills.jsx
import React, { useRef, useState, useEffect } from "react";

function FilterPills({ options, activeValue, onChange, allLabel = "All" }) {
  const scrollRef = useRef(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const checkFades = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 4);
    setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkFades();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkFades, { passive: true });
    window.addEventListener("resize", checkFades);
    return () => {
      el.removeEventListener("scroll", checkFades);
      window.removeEventListener("resize", checkFades);
    };
  }, [options]);

  return (
    <div className="fp-outer">
      <style>{`
        .fp-outer {
          position: relative;
          width: 100%;
        }
        .fp-scroll {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          scroll-snap-type: x proximity;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 4px 2px 10px;
        }
        .fp-scroll::-webkit-scrollbar { display: none; }

        .fp-pill {
          flex: 0 0 auto;
          scroll-snap-align: start;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          color: #475569;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .fp-pill:hover {
          border-color: #151D4A;
          color: #151D4A;
        }
        .fp-pill:active { transform: scale(0.96); }
        .fp-pill.active {
          background: linear-gradient(135deg, #151D4A 0%, #404569 100%);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 6px 16px rgba(21, 29, 74, 0.28);
        }
        .fp-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: currentColor; opacity: 0.55; flex-shrink: 0;
        }
        .fp-pill.active .fp-dot { opacity: 1; }

        /* Edge fade hints that more pills are scrollable */
        .fp-fade {
          position: absolute;
          top: 0; bottom: 10px;
          width: 32px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
          z-index: 2;
        }
        .fp-fade.show { opacity: 1; }
        .fp-fade-left {
          left: 0;
          background: linear-gradient(90deg, #fff 0%, rgba(255,255,255,0) 100%);
        }
        .fp-fade-right {
          right: 0;
          background: linear-gradient(270deg, #fff 0%, rgba(255,255,255,0) 100%);
        }

        /* Small phones: tighter padding, still fully touch-friendly (44px+ target) */
        @media (max-width: 480px) {
          .fp-pill { padding: 9px 16px; font-size: 13.5px; }
        }

        /* Tablet & up: allow wrap so it doesn't feel like a cramped mobile scroller when there's room */
        @media (min-width: 768px) {
          .fp-scroll {
            flex-wrap: wrap;
            overflow-x: visible;
          }
          .fp-fade { display: none; }
        }
      `}</style>

      <div className={`fp-fade fp-fade-left ${showLeftFade ? "show" : ""}`} />
      <div className={`fp-fade fp-fade-right ${showRightFade ? "show" : ""}`} />

      <div className="fp-scroll" ref={scrollRef}>
        <button
          type="button"
          className={`fp-pill ${activeValue === "" ? "active" : ""}`}
          onClick={() => onChange("")}
        >
          <span className="fp-dot" />
          {allLabel}
        </button>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`fp-pill ${activeValue === opt.value ? "active" : ""}`}
            onClick={() => onChange(opt.value)}
          >
            <span className="fp-dot" />
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterPills;