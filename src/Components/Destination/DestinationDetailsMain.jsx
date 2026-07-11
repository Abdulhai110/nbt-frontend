// src/components/DestinationDetailsMain.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ENV } from "../../env/environment";

function DestinationDetailsMain() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await axios.get(
          `${ENV.BASE_URL}/public/destinations/${id}`,
        );
        setDestination(res.data.data || res.data);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "Destination not found"
            : "Failed to load destination",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDestination();
  }, [id]);

  if (loading)
    return (
      <section className="space">
        <div className="container text-center py-5">
          <div className="spinner-border text-success" role="status" />
          <p className="mt-3 text-muted">Loading destination...</p>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="space">
        <div className="container text-center py-5">
          <h3>{error}</h3>
          <button
            className="th-btn mt-3"
            onClick={() => navigate("/destination")}
          >
            Back to Destinations
          </button>
        </div>
      </section>
    );

  if (!destination) return null;

  const coverUrl =
    typeof destination.coverImage === "string"
      ? destination.coverImage
      : destination.coverImage?.url;

  const galleryImages = (destination.images || []).map((img) => img.url || img);

  return (
    <section className="space">
      <div className="container">
        <div className="row">
          {/* ── Main Content ── */}
          <div className="col-xxl-8 col-lg-7">
            <div className="page-single">
              {/* Cover Image */}
              {coverUrl ? (
                <div
                  className="service-img"
                  style={{ cursor: "pointer" }}
                  onClick={() => setModalImage(coverUrl)}
                >
                  <img
                    src={coverUrl}
                    alt={destination.name}
                    style={{
                      width: "100%",
                      height: 450,
                      objectFit: "cover",
                      borderRadius: 16,
                    }}
                  />
                </div>
              ) : (
                <div
                  className="bg-light rounded-3 mb-4"
                  style={{
                    height: 350,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 64 }}>🌍</span>
                </div>
              )}

              <div className="page-content d-block">
                {/* Meta */}
                <div className="page-meta mt-50 mb-45 d-flex align-items-center gap-3 flex-wrap">
                  <Link className="page-tag mr-5" to="/destination">
                    Destination
                  </Link>
                  {destination.continent && (
                    <span
                      className="page-tag"
                      style={{
                        background: "#f0fdf4",
                        color: "#151D4A",
                        border: "none",
                      }}
                    >
                      {destination.continent}
                    </span>
                  )}
                  {destination.published && (
                    <span className="ratting">
                      <i className="fa-sharp fa-solid fa-star" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <h2 className="box-title">{destination.name}</h2>

                {(destination.location || destination.country) && (
                  <p
                    className="box-text mb-10"
                    style={{ fontSize: 16, color: "#151D4A", fontWeight: 600 }}
                  >
                    <i className="fa-solid fa-location-dot me-2" />
                    {[destination.location, destination.country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}

                {destination.description && (
                  <p className="blog-text mb-35 mt-20">
                    {destination.description}
                  </p>
                )}

                {/* ── Basic Information ── */}
                <h2 className="box-title">Basic Information</h2>
                <div className="destination-checklist mb-50">
                  <div className="checklist style2">
                    <ul>
                      {destination.location && <li>Region / City</li>}
                      {destination.country && <li>Country</li>}
                      {destination.continent && <li>Continent</li>}
                      {destination.bestTimeToVisit && (
                        <li>Best Time to Visit</li>
                      )}
                    </ul>
                  </div>
                  <div className="checklist style2">
                    <ul>
                      {destination.location && <li>{destination.location}</li>}
                      {destination.country && <li>{destination.country}</li>}
                      {destination.continent && (
                        <li>{destination.continent}</li>
                      )}
                      {destination.bestTimeToVisit && (
                        <li>{destination.bestTimeToVisit}</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* ── Highlights ── */}
                {destination.highlights?.length > 0 && (
                  <>
                    <h2 className="box-title">Highlights</h2>
                    <div className="checklist mb-50">
                      <ul>
                        {destination.highlights.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {/* ── Gallery ── */}
                {galleryImages.length > 0 && (
                  <div className="destination-gallery-wrapper">
                    <h3 className="page-title mt-30 mb-30">From our gallery</h3>

                    <div className="row gy-4 gx-4 gallery-row">
                      {galleryImages.map((img, i) => (
                        <div key={i} className="col-lg-3 col-md-4 col-6">
                          <div className="gallery-box style3 h-100">
                            <div className="gallery-img global-img overflow-hidden">
                              <img
                                src={img}
                                alt={`Gallery ${i + 1}`}
                                className="img-fluid w-100"
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
                                style={{
                                  border: "none",
                                  background: "none",
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
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

          {/* ── Sidebar ── */}
          <div className="col-xxl-4 col-lg-5">
            <aside className="sidebar-area style3">
              {/* Quick Info Widget */}
              <div
                className="widget"
                style={{
                  background: "#f9fafb",
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 30,
                }}
              >
                <h3 className="widget_title">Quick Info</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {destination.location && (
                    <li
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #e5e7eb",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#6b7280", fontWeight: 500 }}>
                        Region
                      </span>
                      <span style={{ fontWeight: 600, color: "#111827" }}>
                        {destination.location}
                      </span>
                    </li>
                  )}
                  {destination.country && (
                    <li
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #e5e7eb",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#6b7280", fontWeight: 500 }}>
                        Country
                      </span>
                      <span style={{ fontWeight: 600, color: "#111827" }}>
                        {destination.country}
                      </span>
                    </li>
                  )}
                  {destination.continent && (
                    <li
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #e5e7eb",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#6b7280", fontWeight: 500 }}>
                        Continent
                      </span>
                      <span style={{ fontWeight: 600, color: "#151D4A" }}>
                        {destination.continent}
                      </span>
                    </li>
                  )}
                  {destination.bestTimeToVisit && (
                    <li
                      style={{
                        padding: "10px 0",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#6b7280", fontWeight: 500 }}>
                        Best Time
                      </span>
                      <span style={{ fontWeight: 600, color: "#111827" }}>
                        {destination.bestTimeToVisit}
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Highlights Widget */}
              {destination.highlights?.length > 0 && (
                <div
                  className="widget"
                  style={{
                    background: "#f0fdf4",
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 30,
                  }}
                >
                  <h3 className="widget_title">Top Highlights</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {destination.highlights.map((h, i) => (
                      <span
                        key={i}
                        style={{
                          background: "#151D4A20",
                          color: "#2E7D32",
                          padding: "6px 14px",
                          borderRadius: 20,
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>

        {/* ── Map ── */}
        {(destination.location || destination.country) && (
          <div className="location-map">
            <h3 className="page-title mt-45 mb-30">Location</h3>
            <div className="contact-map style3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1584.4916683641343!2d74.31155047549632!3d35.92097186978339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e6360760572d1d%3A0x6cfc714aba945583!2sCol%20Hassan%20Rd%2C%20Gilgit!5e0!3m2!1sen!2s!4v1755996530206!5m2!1sen!2s"
                allowFullScreen=""
                loading="lazy"
                title="Destination Location"
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

export default DestinationDetailsMain;
