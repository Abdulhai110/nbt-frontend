// src/components/TourDetailsMain.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Thumbs,
  EffectFade,
  EffectCoverflow,
} from "swiper/modules";
import axios from "axios";
import { ENV } from "../../env/environment";
import ItineraryTimeline from "../ItineraryTimeline/ItineraryTimeline";
const sampleItinerary20Days = [
  { day: 1,  title: "Arrival in Islamabad",              activities: ["Arrival at Islamabad International Airport", "Meet & greet with tour representative", "Transfer to hotel", "Welcome dinner", "Overnight stay in Islamabad"] },
  { day: 2,  title: "Islamabad City Tour",                activities: ["Visit Faisal Mosque", "Explore Lok Virsa Museum", "Drive through Margalla Hills", "Overnight stay in Islamabad"] },
  { day: 3,  title: "Islamabad to Naran",                 activities: ["Early morning departure", "Scenic drive along Kaghan Valley", "Lunch en route", "Check-in at Naran", "Overnight stay in Naran"] },
  { day: 4,  title: "Saif-ul-Malook & Lake Excursion",     activities: ["Jeep ride to Lake Saif-ul-Malook", "Boating at the lake", "Photography stop at Lulusar", "Return to Naran", "Overnight stay in Naran"] },
  { day: 5,  title: "Naran to Chilas",                    activities: ["Drive along Karakoram Highway", "Stop at Babusar Top", "Views of Nanga Parbat", "Overnight stay in Chilas"] },
  { day: 6,  title: "Chilas to Gilgit",                    activities: ["Continue along KKH", "Visit Rakaposhi viewpoint", "Check-in at Gilgit", "Overnight stay in Gilgit"] },
  { day: 7,  title: "Gilgit to Hunza Valley",              activities: ["Drive to Karimabad", "Visit Altit Fort", "Sunset at Eagle's Nest viewpoint", "Overnight stay in Hunza"] },
  { day: 8,  title: "Hunza Sightseeing",                   activities: ["Visit Baltit Fort", "Explore Karimabad bazaar", "Attabad Lake boat ride", "Overnight stay in Hunza"] },
  { day: 9,  title: "Hunza to Khunjerab Pass",              activities: ["Drive to Khunjerab Pass (Pak-China border)", "Wildlife spotting en route", "Return to Hunza", "Overnight stay in Hunza"] },
  { day: 10, title: "Hunza to Passu",                       activities: ["Visit Passu Cones viewpoint", "Cross Hussaini Suspension Bridge", "Explore Passu Glacier", "Overnight stay in Passu"] },
  { day: 11, title: "Passu to Skardu",                      activities: ["Long scenic drive to Skardu", "Stop at Gilgit for lunch", "Overnight stay in Skardu"] },
  { day: 12, title: "Skardu Sightseeing",                   activities: ["Visit Shangrila Resort (Lower Kachura Lake)", "Explore Upper Kachura Lake", "Sunset views", "Overnight stay in Skardu"] },
  { day: 13, title: "Shigar Valley Excursion",              activities: ["Drive to Shigar Valley", "Visit Shigar Fort", "Explore Shigar bazaar", "Overnight stay in Skardu"] },
  { day: 14, title: "Sarfaranga Cold Desert & Katpana",     activities: ["Visit Sarfaranga Cold Desert", "Jeep safari on the dunes", "Sunset at Katpana Desert", "Overnight stay in Skardu"] },
  { day: 15, title: "Basho Valley Adventure",                activities: ["4x4 jeep ride to Basho Valley", "Visit Basho Meadows", "Cross Basho Suspension Bridge", "Overnight stay in Skardu"] },
  { day: 16, title: "Deosai Plains",                         activities: ["Early departure to Deosai National Park", "Visit Sheosar Lake", "Wildlife spotting", "Overnight stay in Skardu"] },
  { day: 17, title: "Skardu to Gilgit (Return Leg)",         activities: ["Scenic drive back to Gilgit", "Lunch en route", "Overnight stay in Gilgit"] },
  { day: 18, title: "Gilgit to Besham",                      activities: ["Long drive along Indus River", "Stop at scenic viewpoints", "Overnight stay in Besham"] },
  { day: 19, title: "Besham to Islamabad",                   activities: ["Return drive to Islamabad", "Free time for shopping at Centaurus Mall", "Farewell dinner", "Overnight stay in Islamabad"] },
  { day: 20, title: "Departure",                             activities: ["Breakfast at hotel", "Transfer to Islamabad Airport", "Departure flight home"] },
];

const sliderOptions = {
  modules: [EffectCoverflow],
  effect: "coverflow",
  centeredSlides: true,
  slidesPerView: "5",
  initialSlide: 0,
  grabCursor: true,
  loop: true, // Change from "true" to true
  speed: 1500,
  coverflowEffect: {
    rotate: 0,
    stretch: 95,
    depth: 212,
    modifier: 1,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 3 },
  },
};

function TourDetailsMain() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`${ENV.BASE_URL}/public/tours/${id}`);
        setTour(res.data.data || res.data);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "Tour not found"
            : "Failed to load tour",
        );
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

  // Build images array: coverImage first, then gallery
  const coverUrl =
    typeof tour.coverImage === "string"
      ? tour.coverImage
      : tour.coverImage?.url;
  const galleryImages = (tour.images || []).map((img) => img.url || img);
  const allImages = [...(coverUrl ? [coverUrl] : []), ...galleryImages];

  const difficultyColor = {
    easy: "#151D4A",
    moderate: "#f59e0b",
    challenging: "#ef4444",
    extreme: "#7c3aed",
  };

  return (
    <section className="space">
      <div className="container shape-mockup-wrap">
        <div className="row">
          <div className="col-xxl-12 col-lg-12">
            <div className="tour-page-single">
              {/* ── Image Slider ── */}
              {allImages.length > 0 ? (
                <div className="slider-area tour-slider1">
                  <Swiper
                    modules={[Navigation, Thumbs, EffectFade]}
                    effect="fade"
                    loop={allImages.length > 1}
                    spaceBetween={10}
                    navigation={{
                      prevEl: ".slider-prev",
                      nextEl: ".slider-next",
                    }}
                    thumbs={{
                      swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
                    }}
                    className="swiper th-slider mb-4"
                    id="tourSlider4"
                  >
                    {allImages.map((img, i) => (
                      <SwiperSlide key={i}>
                        <div
                          className="tour-slider-img"
                          onClick={() => setModalImage(img)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={img}
                            alt={`${tour.title} - ${i + 1}`}
                            style={{
                              width: "100%",
                              height: "500px",
                              objectFit: "cover",
                              borderRadius: 16,
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {allImages.length > 1 && (
                    <Swiper
                      {...sliderOptions}
                      className="swiper th-slider tour-thumb-slider"
                    >
                      {allImages.map((img, i) => (
                        <SwiperSlide key={i}>
                          <div className="destination-box gsap-cursor">
                            <div className="destination-img position-relative">
                              <img
                                src={img}
                                alt={`Thumb ${i + 1}`}
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  objectFit: "cover",
                                  borderRadius: 10,
                                }}
                              />
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}

                  <button
                    data-slider-prev="#tourSlider4"
                    className="slider-arrow style3 slider-prev"
                  >
                    <img src="/assets/img/icon/hero-arrow-left.svg" alt="" />
                  </button>
                  <button
                    data-slider-next="#tourSlider4"
                    className="slider-arrow style3 slider-next"
                  >
                    <img src="/assets/img/icon/hero-arrow-right.svg" alt="" />
                  </button>
                </div>
              ) : (
                <div
                  className="bg-light rounded-3 mb-4"
                  style={{
                    height: 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 64 }}>🗺️</span>
                </div>
              )}

              {/* ── Page Content ── */}
              <div className="page-content">
                <div className="page-meta mb-45 d-flex align-items-center gap-3 flex-wrap">
                  <Link className="page-tag mr-5" to="/tour">
                    Tour
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
                      {tour.difficulty.charAt(0).toUpperCase() +
                        tour.difficulty.slice(1)}
                    </span>
                  )}
                  {tour.published && (
                    <span className="ratting">
                      <i className="fa-sharp fa-solid fa-star" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <h2 className="box-title">{tour.title}</h2>

                <h4 className="tour-price">
                  <span className="currency">
                    PKR {Number(tour.price).toLocaleString()}
                  </span>
                  /Person
                </h4>

                {tour.description && (
                  <p className="box-text mb-50">{tour.description}</p>
                )}

                {/* ── Basic Information ── */}
                <h2 className="box-title">Basic Information</h2>
                <div className="destination-checklist mb-50">
                  <div className="checklist style2">
                    <ul>
                      {tour.locations?.length > 0 && <li>Destination</li>}
                      {tour.duration && <li>Duration</li>}
                      {tour.groupSize && <li>Group Size</li>}
                      {tour.difficulty && <li>Difficulty</li>}
                    </ul>
                  </div>
                  <div className="checklist style2">
                    <ul>
                      {tour.locations?.length > 0 && (
                        <li>{tour.locations.join(", ")}</li>
                      )}
                      {tour.duration && <li>{tour.duration} Days</li>}
                      {tour.groupSize && <li>Max {tour.groupSize} People</li>}
                      {tour.difficulty && (
                        <li
                          style={{
                            color: difficultyColor[tour.difficulty],
                            fontWeight: 600,
                          }}
                        >
                          {tour.difficulty.charAt(0).toUpperCase() +
                            tour.difficulty.slice(1)}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {tour.itinerary?.length > 0 && (
                  <section className="space">
                    <div className="container">
                      <h3 className="mb-4">Itinerary</h3>
                      <ItineraryTimeline itinerary={tour.itinerary} />
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
                          <ul>
                            {tour.includes.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {tour.excludes?.length > 0 && (
                        <div className="checklist style5">
                          <ul>
                            {tour.excludes.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
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
                      <ul>
                        {tour.locations.map((loc, i) => (
                          <li key={i}>{loc}</li>
                        ))}
                      </ul>
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
                                style={{
                                  height: "200px", // Fixed equal height
                                  objectFit: "cover", // Maintains aspect ratio + crops nicely
                                  width: "100%",
                                  borderRadius: "8px",
                                }}
                                onClick={() => setModalImage(img)}
                              />
                              <button
                                className="icon-btn popup-image"
                                onClick={() => setModalImage(img)}
                                style={{ border: "none", background: "none" }}
                              >
                                <i className="fal fa-magnifying-glass-plus" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setModalImage(null)}
        >
          <button
            onClick={() => setModalImage(null)}
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 36,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <img
            src={modalImage}
            alt=""
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: 12,
              objectFit: "contain",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default TourDetailsMain;
