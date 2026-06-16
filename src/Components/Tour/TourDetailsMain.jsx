// src/components/TourDetailsMain.jsx
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, EffectFade } from "swiper/modules"
import axios from 'axios'
import { ENV } from '../../env/environment'

function TourDetailsMain() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalImage, setModalImage] = useState(null)

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`${ENV.BASE_URL}/public/tours/${id}`)
        setTour(res.data.data || res.data)
      } catch (err) {
        setError(err.response?.status === 404 ? 'Tour not found' : 'Failed to load tour')
      } finally {
        setLoading(false)
      }
    }
    fetchTour()
  }, [id])

  if (loading) return (
    <section className="space">
      <div className="container text-center py-5">
        <div className="spinner-border text-success" role="status" />
        <p className="mt-3 text-muted">Loading tour details...</p>
      </div>
    </section>
  )

  if (error) return (
    <section className="space">
      <div className="container text-center py-5">
        <h3>{error}</h3>
        <button className="th-btn mt-3" onClick={() => navigate('/tour')}>Back to Tours</button>
      </div>
    </section>
  )

  if (!tour) return null

  // Build images array: coverImage first, then gallery
  const coverUrl = typeof tour.coverImage === 'string' ? tour.coverImage : tour.coverImage?.url
  const galleryImages = (tour.images || []).map(img => img.url || img)
  const allImages = [...(coverUrl ? [coverUrl] : []), ...galleryImages]

  const difficultyColor = {
    easy: '#4CAF50', moderate: '#f59e0b', challenging: '#ef4444', extreme: '#7c3aed'
  }

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
                    navigation={{ prevEl: ".slider-prev", nextEl: ".slider-next" }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    className="swiper th-slider mb-4"
                    id="tourSlider4"
                  >
                    {allImages.map((img, i) => (
                      <SwiperSlide key={i}>
                        <div className="tour-slider-img" onClick={() => setModalImage(img)} style={{ cursor: 'pointer' }}>
                          <img src={img} alt={`${tour.title} - ${i + 1}`} style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: 16 }} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {allImages.length > 1 && (
                    <Swiper
                      modules={[Navigation, Thumbs]}
                      loop={allImages.length > 3}
                      spaceBetween={10}
                      slidesPerView={Math.min(allImages.length, 4)}
                      watchSlidesProgress
                      onSwiper={setThumbsSwiper}
                      className="swiper th-slider tour-thumb-slider"
                    >
                      {allImages.map((img, i) => (
                        <SwiperSlide key={i}>
                          <div className="tour-slider-img">
                            <img src={img} alt={`Thumb ${i + 1}`} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 10 }} />
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
                <div className="bg-light rounded-3 mb-4" style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 64 }}>🗺️</span>
                </div>
              )}

              {/* ── Page Content ── */}
              <div className="page-content">
                <div className="page-meta mb-45 d-flex align-items-center gap-3 flex-wrap">
                  <Link className="page-tag mr-5" to="/tour">Tour</Link>
                  {tour.difficulty && (
                    <span className="page-tag" style={{ background: `${difficultyColor[tour.difficulty]}20`, color: difficultyColor[tour.difficulty], border: 'none' }}>
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

                <h2 className="box-title">{tour.title}</h2>

                <h4 className="tour-price">
                  <span className="currency">PKR {Number(tour.price).toLocaleString()}</span>/Person
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
                      {tour.locations?.length > 0 && <li>{tour.locations.join(', ')}</li>}
                      {tour.duration && <li>{tour.duration} Days</li>}
                      {tour.groupSize && <li>Max {tour.groupSize} People</li>}
                      {tour.difficulty && <li style={{ color: difficultyColor[tour.difficulty], fontWeight: 600 }}>{tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1)}</li>}
                    </ul>
                  </div>
                </div>

                {/* ── Includes / Excludes ── */}
                {(tour.includes?.length > 0 || tour.excludes?.length > 0) && (
                  <>
                    <h2 className="box-title">Included and Excluded</h2>
                    <div className="destination-checklist mb-50">
                      {tour.includes?.length > 0 && (
                        <div className="checklist style2 style4">
                          <ul>
                            {tour.includes.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                      )}
                      {tour.excludes?.length > 0 && (
                        <div className="checklist style5">
                          <ul>
                            {tour.excludes.map((item, i) => <li key={i}>{item}</li>)}
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
                        {tour.locations.map((loc, i) => <li key={i}>{loc}</li>)}
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
                        <div className="col-xxl-auto col-md-3 col-6 filter-item" key={i}>
                          <div className="gallery-box style3">
                            <div className="gallery-img global-img">
                              <img src={img} alt={`Gallery ${i + 1}`} style={{ cursor: 'pointer' }} onClick={() => setModalImage(img)} />
                              <button
                                className="icon-btn popup-image"
                                onClick={() => setModalImage(img)}
                                style={{ border: 'none', background: 'none' }}
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
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72FloqkFzkBSzc3tHJclh2Dno&q=${encodeURIComponent(tour.locations[0])}`}
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
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={() => setModalImage(null)}
        >
          <button
            onClick={() => setModalImage(null)}
            style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: '#fff', fontSize: 36, cursor: 'pointer', lineHeight: 1 }}
          >×</button>
          <img src={modalImage} alt="" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 12, objectFit: 'contain' }} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}

export default TourDetailsMain