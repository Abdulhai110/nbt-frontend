import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Core Swiper styles
import { Pagination, EffectFade, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
function BannerOne() {
  const swiperRef = useRef(null);
  const heroButtons = [
    {
      id: 1,
      label: "Pakistan Tour Packages",
      path: "/pakistan-tour-packages",
      style: "",
    },
    {
      id: 2,
      label: "Honeymoon Packages",
      path: "/honeymoon-packages",
      style: "style2",
    },
  ];

  useEffect(() => {
    // Function to add animation classes
    const animationProperties = () => {
      document.querySelectorAll("[data-ani]").forEach((element) => {
        const animationName = element.getAttribute("data-ani");
        element.classList.add(animationName);
      });

      document.querySelectorAll("[data-ani-delay]").forEach((element) => {
        const delayTime = element.getAttribute("data-ani-delay");
        element.style.animationDelay = delayTime;
      });
    };

    animationProperties();
  }, []);

  // Event handler for custom navigation arrows
  const handleSliderNavigation = (direction) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      if (direction === "prev") {
        swiper.slidePrev();
      } else {
        swiper.slideNext();
      }
    }
  };

  return (
    <div className="th-hero-wrapper hero-1" id="hero">
      <Swiper
        modules={[Navigation, Pagination, EffectFade]} // Initialize necessary modules
        effect="fade" // Use fade effect
        loop={true} // Enable loop
        speed={1000}
        pagination={{
          el: ".swiper-pagination", // Custom pagination container
          clickable: true, // Enable clickable pagination
        }}
        navigation={{
          nextEl: ".slider-next", // Custom next button
          prevEl: ".slider-prev", // Custom prev button
        }}
        className="th-slider hero-slider-1"
        id="heroSlide1"
      >
        <div className="swiper-wrapper">
          <SwiperSlide>
            <div className="hero-inner">
              <div
                className="th-hero-bg"
                style={{
                  backgroundImage: "url(/assets/img/hero/hunza.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="container">
                <div className="hero-style1">
                  <span
                    className="sub-title style1"
                    data-ani="slideinup"
                    data-ani-delay="0.2s"
                    style={{
                      lineHeight: "normal",
                      height: "auto",
                    }}
                  >
                    Welcome to pakistan north blossom travel and tours
                  </span>
                  <h1
                    className="hero-title"
                    data-ani="slideinup"
                    data-ani-delay="0.4s"
                  >
                    Discover unforgettable wonders with us – the true natural
                    marvels of the Pakistan{" "}
                  </h1>
                  <div
                    className="btn-group flex flex-col items-start gap-4"
                    data-ani="slideinup"
                    data-ani-delay="0.6s"
                  >
                    {" "}
                    <div className="flex flex-wrap justify-center gap-4">
                      {heroButtons.map((button, index) => (
                        <Link
                          key={button.id}
                          to={button.path}
                          className={`th-btn th-icon transition-all duration-300 ${
                            index % 2 === 0 ? "" : "style2"
                          }`}
                        >
                          {button.label}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <Link
                        to="/service"
                        className="th-btn style2 th-icon transition-all duration-300 hover:scale-105"
                      >
                        Our Services
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-inner">
              <div
                className="th-hero-bg"
                style={{
                  backgroundImage: "url(/assets/img/hero/skardu.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="container">
                <div className="hero-style1">
                  <span
                    className="sub-title style1"
                    data-ani="slideinup"
                    data-ani-delay="0.2s"
                  >
                    Get unforgetable pleasure with us
                  </span>
                  <h1
                    className="hero-title"
                    data-ani="slideinup"
                    data-ani-delay="0.4s"
                  >
                    Create Unforgettable Memories – Your Best Trip Starts with
                    Us!{" "}
                  </h1>
                  <div
                    className="btn-group"
                    data-ani="slideinup"
                    data-ani-delay="0.6s"
                  >
                    <Link to="/tour" className="th-btn th-icon">
                      Explore Tours
                    </Link>
                    <Link to="/service" className="th-btn style2 th-icon">
                      Our Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-inner">
              <div
                className="th-hero-bg"
                style={{
                  backgroundImage: "url(/assets/img/hero/gilgit.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="container">
                <div className="hero-style1">
                  <span
                    className="sub-title style1"
                    data-ani="slideinup"
                    data-ani-delay="0.2s"
                  >
                    Get unforgetable pleasure with us
                  </span>
                  <h1
                    className="hero-title"
                    data-ani="slideinup"
                    data-ani-delay="0.4s"
                  >
                    Discover Pakistan's northern mountains, cultural gems, and
                    coastal wonders with expert guides{" "}
                  </h1>
                  <div
                    className="btn-group"
                    data-ani="slideinup"
                    data-ani-delay="0.6s"
                  >
                    <Link to="/tour" className="th-btn th-icon">
                      Explore Tours
                    </Link>
                    <Link to="/service" className="th-btn style2 th-icon">
                      Our Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </div>
        <div className="th-swiper-custom">
          <button
            className="slider-arrow slider-prev"
            onClick={() => handleSliderNavigation("prev")}
          >
            <img src="/assets/img/icon/right-arrow.svg" alt="Prev" />
          </button>
          <div className="swiper-pagination" /> {/* Pagination container */}
          <button
            className="slider-arrow slider-next"
            onClick={() => handleSliderNavigation("next")}
          >
            <img src="/assets/img/icon/left-arrow.svg" alt="Next" />
          </button>
        </div>
      </Swiper>
    </div>
  );
}

export default BannerOne;
