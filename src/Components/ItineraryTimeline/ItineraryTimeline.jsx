// src/Components/Tour/ItineraryTimeline.jsx
import React from "react";

function ItineraryTimeline({ itinerary }) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="itn-wrap">
      <style>{`
        .itn-wrap { width: 100%; }
        .itn-track {
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          row-gap: 28px;
          column-gap: 0;
        }
        .itn-card {
          flex: 0 0 auto;
          width: 270px;
          max-width: 100%;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 6px 24px rgba(15, 23, 42, 0.08);
          overflow: hidden;
          border: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .itn-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.14);
        }

        /* ── Header: real image ── */
        .itn-card-img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          background: #f1f5f9;
          display: block;
        }
        .itn-card-img-wrap { position: relative; }
        .itn-card-img-wrap .itn-day-chip {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255,255,255,0.95);
          color: #151D4A;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.03em;
          padding: 6px 12px;
          border-radius: 999px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }

        /* ── Header: no image fallback — gradient block with big day number ── */
        .itn-card-noimg {
          width: 100%;
          height: 110px;
          background: linear-gradient(135deg, #151D4A 0%, #404569 60%, #5b6089 100%);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .itn-card-noimg::before {
          content: "";
          position: absolute;
          width: 140px; height: 140px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          top: -40px; right: -30px;
        }
        .itn-card-noimg::after {
          content: "";
          position: absolute;
          width: 90px; height: 90px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          bottom: -30px; left: -20px;
        }
        .itn-noimg-daynum {
          color: rgba(255,255,255,0.92);
          font-size: 36px;
          font-weight: 800;
          letter-spacing: 0.02em;
          position: relative;
          z-index: 1;
          text-shadow: 0 2px 12px rgba(0,0,0,0.15);
        }
        .itn-noimg-daylabel {
          position: absolute;
          top: 12px;
          left: 14px;
          color: rgba(255,255,255,0.85);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          z-index: 1;
        }

        .itn-card-body { padding: 16px 18px 18px; flex: 1; display: flex; flex-direction: column; }
        .itn-day-title { font-weight: 700; font-size: 15px; color: #0f172a; margin-bottom: 10px; line-height: 1.35; }
        .itn-activities { list-style: none; padding: 0; margin: 0; }
        .itn-activities li {
          font-size: 13px; color: #475569; padding-left: 16px; position: relative;
          margin-bottom: 7px; line-height: 1.5;
        }
        .itn-activities li::before {
          content: ""; position: absolute; left: 0; top: 7px;
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #151D4A, #404569);
        }

        .itn-arrow { flex: 0 0 auto; display: flex; align-items: center; justify-content: center; width: 48px; align-self: center; }
        .itn-arrow svg { width: 24px; height: 24px; color: #cbd5e1; }
        .itn-arrow-vert { display: none; }

        @media (max-width: 1024px) {
          .itn-track { justify-content: center; }
        }

        @media (max-width: 767px) {
          .itn-track { flex-direction: column; align-items: center; }
          .itn-card { width: 100%; max-width: 340px; }
          .itn-arrow-horiz { display: none; }
          .itn-arrow-vert { display: flex; }
          .itn-arrow { width: 100%; height: 36px; }
        }
      `}</style>

      <div className="itn-track">
        {itinerary.map((day, idx) => (
          <React.Fragment key={day._id || idx}>
            <div className="itn-card">
              {day.image ? (
                <div className="itn-card-img-wrap">
                  <img src={day.image} alt={day.title} className="itn-card-img" />
                  <span className="itn-day-chip">DAY {day.day}</span>
                </div>
              ) : (
                <div className="itn-card-noimg">
                  <span className="itn-noimg-daylabel">Day</span>
                  <span className="itn-noimg-daynum">{day.day}</span>
                </div>
              )}
              <div className="itn-card-body">
                <h4 className="itn-day-title">{day.title}</h4>
                {day.activities?.length > 0 && (
                  <ul className="itn-activities">
                    {day.activities.filter(Boolean).map((act, i) => <li key={i}>{act}</li>)}
                  </ul>
                )}
              </div>
            </div>

            {idx < itinerary.length - 1 && (
              <div className="itn-arrow">
                <svg className="itn-arrow-horiz" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <svg className="itn-arrow-vert" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ItineraryTimeline;