// src/components/TourDetailsMain.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade, EffectCoverflow } from "swiper/modules";
import axios from "axios";
import { ENV } from "../../env/environment";
import ItineraryTimeline from "../ItineraryTimeline/ItineraryTimeline";

const sliderOptions = {
  modules: [EffectCoverflow],
  effect: "coverflow",
  centeredSlides: true,
  slidesPerView: "5",
  initialSlide: 0,
  grabCursor: true,
  loop: true,
  speed: 1500,
  coverflowEffect: { rotate: 0, stretch: 95, depth: 212, modifier: 1 },
  breakpoints: {
    0: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 3 },
  },
};

const THEMES = {
  honeymoon: { gradient: "linear-gradient(135deg,#9f1239,#e11d48,#fb7185)" },
};

function isHoneymoonTour(tour) {
  const slug = tour?.tourType?.slug || "";
  const name = tour?.tourType?.name || "";
  return slug.includes("honeymoon") || name.toLowerCase().includes("honeymoon");
}

// ── Custom SVG icons (replace emojis) ───────────────────────────────────────
const HeartIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21s-6.7-4.3-9.3-8.2C1 10 1.4 6.4 4.2 4.7c2.4-1.5 5.1-.8 6.8 1.3l1 1.2 1-1.2c1.7-2.1 4.4-2.8 6.8-1.3 2.8 1.7 3.2 5.3 1.5 8.1C18.7 16.7 12 21 12 21z" />
  </svg>
);

const HeartOutlineIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
    <path d="M12 21s-6.7-4.3-9.3-8.2C1 10 1.4 6.4 4.2 4.7c2.4-1.5 5.1-.8 6.8 1.3l1 1.2 1-1.2c1.7-2.1 4.4-2.8 6.8-1.3 2.8 1.7 3.2 5.3 1.5 8.1C18.7 16.7 12 21 12 21z" />
  </svg>
);

const CoupleIcon = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    <circle cx="24" cy="18" r="9" fill="#fff" fillOpacity="0.95" />
    <path d="M10 52c0-9 6-16 14-16s14 7 14 16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
    <circle cx="42" cy="18" r="9" fill="#fff" fillOpacity="0.95" />
    <path d="M28 52c0-9 6-16 14-16s14 7 14 16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
    <path
      d="M32 32c-2-2.5-6-2-6 1.5 0 2.5 3 4.5 6 6.5 3-2 6-4 6-6.5 0-3.5-4-4-6-1.5z"
      fill="#fff"
    />
  </svg>
);

const PetalIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2c3 3 3 8 0 11-3-3-3-8 0-11zM12 22c-3-3-3-8 0-11 3 3 3 8 0 11zM2 12c3-3 8-3 11 0-3 3-8 3-11 0zM22 12c-3 3-8 3-11 0 3-3 8-3 11 0z" />
  </svg>
);

const SparkleIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2z" />
  </svg>
);

const MailHeartIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 7l9 6 9-6" />
    <path d="M12 3.2c-.6-.9-2-1.4-2.9-.6-.9.8-.7 2.1.2 2.9L12 8l2.7-2.5c.9-.8 1.1-2.1.2-2.9-.9-.8-2.3-.3-2.9.6z" fill="currentColor" stroke="none" />
  </svg>
);

// ── Floating hearts + petals background ────────────────────────────────────
function FloatingRomance() {
  const items = Array.from({ length: 14 });
  return (
    <div className="hm-particles-layer" aria-hidden="true">
      {items.map((_, i) => {
        const isHeart = i % 2 === 0;
        const size = 12 + (i % 4) * 6;
        return (
          <span
            key={i}
            className={`hm-particle ${isHeart ? "hm-particle-heart" : "hm-particle-petal"}`}
            style={{
              left: `${(i * 71) % 100}%`,
              animationDelay: `${(i * 1.3) % 14}s`,
              animationDuration: `${16 + (i % 5) * 2.5}s`,
            }}
          >
            {isHeart ? <HeartIcon size={size} /> : <PetalIcon size={size - 2} />}
          </span>
        );
      })}
    </div>
  );
}

// ── Auto romantic entrance reveal ──────────────────────────────────────────
function RomanticIntro({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 4600);
    const doneTimer = setTimeout(() => onDone(), 5300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`hm-intro ${fading ? "hm-intro-fade" : ""}`}>
      <div className="hm-intro-sparkles" aria-hidden="true">
        <SparkleIcon size={16} className="hm-sparkle hm-sparkle-1" />
        <SparkleIcon size={10} className="hm-sparkle hm-sparkle-2" />
        <SparkleIcon size={13} className="hm-sparkle hm-sparkle-3" />
        <SparkleIcon size={9} className="hm-sparkle hm-sparkle-4" />
      </div>
      <div className="hm-intro-icon-wrap">
        <CoupleIcon size={64} />
      </div>
      <div className="hm-intro-script">Two Hearts, One Journey</div>
      <div className="hm-intro-sub">Preparing your romantic escape…</div>
    </div>
  );
}

function TourDetailsMain() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`${ENV.BASE_URL}/public/tours/${id}`);
        const data = res.data.data || res.data;
        setTour(data);
        if (isHoneymoonTour(data)) setShowIntro(true);
      } catch (err) {
        setError(err.response?.status === 404 ? "Tour not found" : "Failed to load tour");
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (loading)
    return (
      <section className="space">
        <div className="container text-center py-5">
          <div className="spinner-border text-success" role="status" />
          <p className="mt-3 text-muted">Loading tour details...</p>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="space">
        <div className="container text-center py-5">
          <h3>{error}</h3>
          <button className="th-btn mt-3" onClick={() => navigate("/tour")}>
            Back to Tours
          </button>
        </div>
      </section>
    );

  if (!tour) return null;

  const honeymoon = isHoneymoonTour(tour);
  const theme = honeymoon ? THEMES.honeymoon : null;

  const coverUrl = typeof tour.coverImage === "string" ? tour.coverImage : tour.coverImage?.url;
  const galleryImages = (tour.images || []).map((img) => img.url || img);
  const allImages = [...(coverUrl ? [coverUrl] : []), ...galleryImages];

  const difficultyColor = {
    easy: "#151D4A",
    moderate: "#f59e0b",
    challenging: "#ef4444",
    extreme: "#7c3aed",
  };

  return (
    <section className={`space ${honeymoon ? "hm-section" : ""}`} style={honeymoon ? { position: "relative", overflow: "hidden" } : undefined}>
      {honeymoon && (
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@600;700&display=swap');

          /* ── Romantic entrance overlay ── */
          .hm-intro {
            position: fixed; inset: 0; z-index: 10000;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            background: linear-gradient(135deg,#881337 0%,#9f1239 45%,#e11d48 100%);
            color: #fff; text-align: center;
            animation: hmIntroIn 0.5s ease;
          }
          .hm-intro-fade { animation: hmIntroOut 0.7s ease forwards; }
          @keyframes hmIntroIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes hmIntroOut { to { opacity: 0; visibility: hidden; } }

          .hm-intro-icon-wrap {
            width: 108px; height: 108px; border-radius: 50%;
            background: rgba(255,255,255,0.12);
            border: 1.5px solid rgba(255,255,255,0.35);
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 22px;
            animation: hmIntroPulse 1.6s ease-in-out infinite;
            box-shadow: 0 0 0 0 rgba(255,255,255,0.25);
          }
          @keyframes hmIntroPulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.2); }
            50% { transform: scale(1.06); box-shadow: 0 0 0 14px rgba(255,255,255,0); }
          }

          .hm-intro-sparkles { position: relative; width: 0; height: 0; }
          .hm-sparkle { position: absolute; color: #fecdd3; animation: hmSparkleTwinkle 2.2s ease-in-out infinite; }
          .hm-sparkle-1 { top: -70px; left: -90px; animation-delay: 0s; }
          .hm-sparkle-2 { top: -40px; left: 80px; animation-delay: 0.5s; }
          .hm-sparkle-3 { top: 30px; left: -110px; animation-delay: 1s; }
          .hm-sparkle-4 { top: 10px; left: 100px; animation-delay: 1.5s; }
          @keyframes hmSparkleTwinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.15) rotate(20deg); }
          }

          .hm-intro-script {
            font-family: 'Great Vibes', cursive;
            font-size: 44px;
            color: #fff;
            text-shadow: 0 2px 14px rgba(0,0,0,0.25);
          }
          .hm-intro-sub {
            font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;
            color: rgba(255,255,255,0.75); margin-top: 10px; font-weight: 600;
          }

          /* ── Page wash ── */
          .hm-section {
            background:
              radial-gradient(ellipse 800px 400px at 10% 0%, #fff1f2 0%, transparent 60%),
              radial-gradient(ellipse 700px 500px at 90% 20%, #fdf2f8 0%, transparent 55%),
              #fffbfb;
          }

          /* ── Typography ── */
          .hm-wrap .box-title { color: #831843; font-family: 'Playfair Display', serif; }
          .hm-wrap .box-text { color: #57534e; }
          .hm-wrap .tour-price { color: #be123c; font-weight: 800; display: inline-flex; align-items: baseline; gap: 6px; }
          .hm-wrap .checklist.style2 li { border-color: #fecdd3 !important; color: #4c0519; }
          .hm-wrap .page-tag {
            background: linear-gradient(135deg,#9f1239,#e11d48) !important;
            color: #fff !important; border: none !important;
          }

          .hm-script-row {
            display: flex; align-items: center; gap: 10px; margin-bottom: 6px;
            position: relative; z-index: 2;
          }
          .hm-script {
            font-family: 'Great Vibes', cursive;
            font-size: 36px;
            color: #be123c;
            line-height: 1;
          }
          .hm-script-icon { color: #fb7185; animation: hmHeartbeat 1.6s ease-in-out infinite; }
          @keyframes hmHeartbeat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.15); }
            40% { transform: scale(1); }
          }

          .hm-banner {
            display: inline-flex; align-items: center; gap: 8px;
            background: linear-gradient(135deg,#9f1239,#e11d48);
            color: #fff; font-size: 13px; font-weight: 700;
            padding: 9px 20px; border-radius: 999px;
            box-shadow: 0 8px 20px rgba(159,18,57,0.32);
            margin-bottom: 20px;
            position: relative; z-index: 2;
            animation: hmPulse 2.6s ease-in-out infinite;
          }
          @keyframes hmPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.035); }
          }

          .hm-heart-divider { display: flex; align-items: center; gap: 12px; margin: 8px 0 28px; }
          .hm-heart-divider::before, .hm-heart-divider::after {
            content: ""; flex: 1; height: 1px;
            background: linear-gradient(90deg, transparent, #fda4af, transparent);
          }
          .hm-heart-divider .hm-divider-icon { color: #be123c; flex-shrink: 0; }

          .hm-frame { position: relative; }
          .hm-frame-icon {
            position: absolute; z-index: 3; pointer-events: none; color: #fff;
            filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));
          }
          .hm-frame-icon.tl { top: 16px; left: 16px; }
          .hm-frame-icon.tr { top: 16px; right: 16px; }

          .hm-particles-layer { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
          .hm-particle {
            position: absolute; bottom: -40px; opacity: 0; display: block;
            animation-name: hmFloat; animation-timing-function: ease-in; animation-iteration-count: infinite;
          }
          .hm-particle-heart { color: #fda4af; }
          .hm-particle-petal { color: #fbcfe8; }
          @keyframes hmFloat {
            0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
            10%  { opacity: 0.4; }
            50%  { transform: translateY(-55vh) translateX(24px) rotate(20deg); }
            90%  { opacity: 0.3; }
            100% { transform: translateY(-110vh) translateX(-18px) rotate(-14deg); opacity: 0; }
          }

          .hm-cta {
            position: relative; z-index: 2;
            margin-top: 50px;
            background: linear-gradient(135deg,#831843,#be123c,#f472b6);
            border-radius: 24px;
            padding: 46px 30px;
            text-align: center;
            color: #fff;
            overflow: hidden;
          }
          .hm-cta-bg-icon {
            position: absolute; top: -50px; right: -30px; opacity: 0.08; transform: rotate(-15deg);
          }
          .hm-cta h3 {
            font-family: 'Playfair Display', serif;
            font-size: 28px; margin-bottom: 10px; position: relative; z-index: 1; color: #fff;
          }
          .hm-cta p { opacity: 0.95; margin-bottom: 22px; position: relative; z-index: 1; color: #fff; }
          .hm-cta-btn {
            position: relative; z-index: 1;
            display: inline-flex; align-items: center; gap: 8px;
            background: #fff; color: #be123c; font-weight: 700;
            padding: 13px 30px; border-radius: 999px; text-decoration: none;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .hm-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,0.25); color: #be123c; }

          .hm-title-icon { color: #fb7185; margin-right: 8px; vertical-align: -3px; }
        `}</style>
      )}

      {honeymoon && showIntro && <RomanticIntro onDone={() => setShowIntro(false)} />}
      {honeymoon && <FloatingRomance />}

      <div className={`container shape-mockup-wrap ${honeymoon ? "hm-wrap" : ""}`} style={honeymoon ? { position: "relative", zIndex: 1 } : undefined}>
        <div className="row">
          <div className="col-xxl-12 col-lg-12">
            <div className="tour-page-single">

              {honeymoon && (
                <>
                  <div className="hm-script-row">
                    <HeartIcon size={22} className="hm-script-icon" />
                    <span className="hm-script">A Love Story Begins Here</span>
                  </div>
                  <span className="hm-banner">
                    <HeartIcon size={14} /> Perfect for Couples
                  </span>
                </>
              )}

              {/* ── Image Slider ── */}
              {allImages.length > 0 ? (
                <div className={`slider-area tour-slider1 ${honeymoon ? "hm-frame" : ""}`}>
                  {honeymoon && (
                    <>
                      <HeartIcon size={24} className="hm-frame-icon tl" />
                      <HeartIcon size={24} className="hm-frame-icon tr" />
                    </>
                  )}
                  <Swiper
                    modules={[Navigation, Thumbs, EffectFade]}
                    effect="fade"
                    loop={allImages.length > 1}
                    spaceBetween={10}
                    navigation={{ prevEl: ".slider-prev", nextEl: ".slider-next" }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    className="swiper th-slider mb-4"
                    id="tourSlider4"
                  >
                    {allImages.map((img, i) => (
                      <SwiperSlide key={i}>
                        <div className="tour-slider-img" onClick={() => setModalImage(img)} style={{ cursor: "pointer" }}>
                          <img
                            src={img}
                            alt={`${tour.title} - ${i + 1}`}
                            style={{
                              width: "100%",
                              height: "500px",
                              objectFit: "cover",
                              borderRadius: 16,
                              filter: honeymoon ? "saturate(1.1) contrast(1.02)" : "none",
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {allImages.length > 1 && (
                    <Swiper {...sliderOptions} className="swiper th-slider tour-thumb-slider">
                      {allImages.map((img, i) => (
                        <SwiperSlide key={i}>
                          <div className="destination-box gsap-cursor">
                            <div className="destination-img position-relative">
                              <img src={img} alt={`Thumb ${i + 1}`} style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: 10 }} />
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}

                  <button data-slider-prev="#tourSlider4" className="slider-arrow style3 slider-prev">
                    <img src="/assets/img/icon/hero-arrow-left.svg" alt="" />
                  </button>
                  <button data-slider-next="#tourSlider4" className="slider-arrow style3 slider-next">
                    <img src="/assets/img/icon/hero-arrow-right.svg" alt="" />
                  </button>
                </div>
              ) : (
                <div className="bg-light rounded-3 mb-4" style={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {honeymoon ? <CoupleIcon size={72} className="text-danger" /> : <span style={{ fontSize: 64 }}>🗺️</span>}
                </div>
              )}

              {/* ── Page Content ── */}
              <div className="page-content">
                <div className="page-meta mb-45 d-flex align-items-center gap-3 flex-wrap">
                  <Link className="page-tag mr-5" to="/tour">
                    {honeymoon ? "Honeymoon" : "Tour"}
                  </Link>
                  {tour.difficulty && (
                    <span
                      className="page-tag"
                      style={{
                        background: `${difficultyColor[tour.difficulty]}20`,
                        color: difficultyColor[tour.difficulty],
                        border: "none",
                      }}
                    >
                      {tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1)}
                    </span>
                  )}
                  {tour.published && (
                    <span className="ratting">
                      <i className="fa-sharp fa-solid fa-star" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <h2 className="box-title">
                  {honeymoon && <CoupleIcon size={30} className="hm-title-icon" style={{ filter: "drop-shadow(0 0 0 #be123c)", color: "#be123c" }} />}
                  {tour.title}
                </h2>

                <h4 className="tour-price">
                  <span className="currency">PKR {Number(tour.price).toLocaleString()}</span>
                  {honeymoon ? "/Couple" : "/Person"}
                </h4>

                {tour.description && <p className="box-text mb-50">{tour.description}</p>}

                {/* ── Basic Information ── */}
                <h2 className="box-title">Basic Information</h2>
                {honeymoon && (
                  <div className="hm-heart-divider">
                    <HeartIcon size={16} className="hm-divider-icon" />
                  </div>
                )}
                <div className="destination-checklist mb-50">
                  <div className="checklist style2">
                    <ul>
                      {tour.locations?.length > 0 && <li>Destination</li>}
                      {tour.duration && <li>Duration</li>}
                      {tour.groupSize && <li>{honeymoon ? "Ideal For" : "Group Size"}</li>}
                      {tour.difficulty && <li>Difficulty</li>}
                    </ul>
                  </div>
                  <div className="checklist style2">
                    <ul>
                      {tour.locations?.length > 0 && <li>{tour.locations.join(", ")}</li>}
                      {tour.duration && <li>{tour.duration} Days</li>}
                      {tour.groupSize && <li>{honeymoon ? "Couples" : `Max ${tour.groupSize} People`}</li>}
                      {tour.difficulty && (
                        <li style={{ color: difficultyColor[tour.difficulty], fontWeight: 600 }}>
                          {tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1)}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {tour.itinerary?.length > 0 && (
                  <section className="space">
                    <div className="container">
                      <h3 className="mb-4">{honeymoon ? "Your Romantic Journey" : "Itinerary"}</h3>
                      <ItineraryTimeline itinerary={tour.itinerary} accentGradient={theme?.gradient} />
                    </div>
                  </section>
                )}

                {/* ── Includes / Excludes ── */}
                {(tour.includes?.length > 0 || tour.excludes?.length > 0) && (
                  <>
                    <h2 className="box-title">Included and Excluded</h2>
                    <div className="destination-checklist mb-50">
                      {tour.includes?.length > 0 && (
                        <div className="checklist style2 style4">
                          <ul>{tour.includes.map((item, i) => <li key={i}>{item}</li>)}</ul>
                        </div>
                      )}
                      {tour.excludes?.length > 0 && (
                        <div className="checklist style5">
                          <ul>{tour.excludes.map((item, i) => <li key={i}>{item}</li>)}</ul>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* ── Locations ── */}
                {tour.locations?.length > 0 && (
                  <>
                    <h2 className="box-title">Destinations Covered</h2>
                    <div className="checklist mb-50">
                      <ul>{tour.locations.map((loc, i) => <li key={i}>{loc}</li>)}</ul>
                    </div>
                  </>
                )}

                {/* ── Gallery ── */}
                {galleryImages.length > 0 && (
                  <div className="destination-gallery-wrapper">
                    <h3 className="page-title mt-30 mb-30">Photo Gallery</h3>
                    <div className="row gy-4 gallery-row filter-active">
                      {galleryImages.map((img, i) => (
                        <div className="col-lg-3 col-md-4 col-6" key={i}>
                          <div className="gallery-box style3">
                            <div className="gallery-img global-img">
                              <img
                                src={img}
                                alt={`Gallery ${i + 1}`}
                                style={{ height: "200px", objectFit: "cover", width: "100%", borderRadius: "8px" }}
                                onClick={() => setModalImage(img)}
                              />
                              <button className="icon-btn popup-image" onClick={() => setModalImage(img)} style={{ border: "none", background: "none" }}>
                                <i className="fal fa-magnifying-glass-plus" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Closing romantic CTA ── */}
                {honeymoon && (
                  <div className="hm-cta">
                    <HeartIcon size={220} className="hm-cta-bg-icon" />
                    <h3>Ready to Begin Your Forever?</h3>
                    <p>Let us craft the perfect honeymoon escape, just for the two of you.</p>
                    <Link to="/contact" className="hm-cta-btn">
                      <MailHeartIcon size={18} /> Book This Honeymoon
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Location Map ── */}
        {tour.locations?.length > 0 && (
          <div className="location-map">
            <h3 className="page-title mt-45 mb-30">Location</h3>
            <div className="contact-map style3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1584.4916683641343!2d74.31155047549632!3d35.92097186978339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e6360760572d1d%3A0x6cfc714aba945583!2sCol%20Hassan%20Rd%2C%20Gilgit!5e0!3m2!1sen!2s!4v1755996530206!5m2!1sen!2s"
                allowFullScreen=""
                loading="lazy"
                title="Tour Location"
              />
              <div className="contact-icon">
                <img src="/assets/img/icon/location-dot3.svg" alt="" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Image Modal ── */}
      {modalImage && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setModalImage(null)}
        >
          <button
            onClick={() => setModalImage(null)}
            style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "#fff", fontSize: 36, cursor: "pointer", lineHeight: 1 }}
          >
            ×
          </button>
          <img src={modalImage} alt="" style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 12, objectFit: "contain" }} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

export default TourDetailsMain;