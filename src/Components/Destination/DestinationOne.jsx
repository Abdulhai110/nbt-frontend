import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Link } from "react-router-dom";
import { ENV } from "../../../src/env/environment";

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

function DestinationOne() {
  const [destinations, setDestinations] = useState([]);
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    fetch(`${ENV.BASE_URL}/public/destinations`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch destinations");
        return res.json();
      })
      .then((data) => {
        setDestinations(data.destinations);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Add event listeners for hover effect
    const sliderWrap = document.querySelector(".slider-drag-wrap");
    const sliderLink = document.querySelectorAll(".slider-drag-wrap a");

    const handleMouseEnter = () => setCursorActive(true);
    const handleMouseLeave = () => setCursorActive(false);

    if (sliderWrap) {
      sliderWrap.addEventListener("mouseenter", handleMouseEnter);
      sliderWrap.addEventListener("mouseleave", handleMouseLeave);
    }

    sliderLink.forEach((link) => {
      link.addEventListener("mouseenter", () => setCursorActive(false));
      link.addEventListener("mouseleave", () => setCursorActive(true));
    });

    // Clean up event listeners on component unmount
    return () => {
      if (sliderWrap) {
        sliderWrap.removeEventListener("mouseenter", handleMouseEnter);
        sliderWrap.removeEventListener("mouseleave", handleMouseLeave);
      }

      sliderLink.forEach((link) => {
        link.removeEventListener("mouseenter", () => setCursorActive(false));
        link.removeEventListener("mouseleave", () => setCursorActive(true));
      });
    };
  }, []);

  return (
    <div className="position-relative overflow-hidden">
      <div className="container">
        <div className="title-area text-center">
          <span className="sub-title">Top Destination</span>
          <h2 className="sec-title">Popular Destination</h2>
        </div>

        <div className={`slider-drag-wrap ${cursorActive ? "active" : ""}`}>
          <Swiper {...sliderOptions} className="destination-slider">
            {destinations.map((dest) => (
              <SwiperSlide key={dest.id}>
                <div className="destination-box gsap-cursor">
                  <div className="destination-img">
                    <img src={dest.coverImage} alt={dest.name} />
                    <div className="destination-content">
                      <div className="media-left">
                        <h4 className="box-title">
                          {dest.name}
                          {/* <Link to="/destination/1"></Link> */}
                        </h4>
                        <span className="destination-subtitle">
                          {dest.listings} Listing
                        </span>
                      </div>
                      <div>
                        <Link
                          to="/destination"
                          className="th-btn style2 th-icon"
                        >
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default DestinationOne;
