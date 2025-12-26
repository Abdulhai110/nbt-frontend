import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

const TourItem = ({
  image,
  title,
  link,
  rating,
  price,
  duration,
  bookLink,
}) => (
  <div className="tour-box th-ani gsap-cursor">
    <div className="tour-box_img global-img">
      <img src={image} alt={title} />
    </div>
    <div className="tour-content">
      <h3 className="box-title">
        <Link to={link}>{title}</Link>
      </h3>
      {/* <div className="tour-rating">
        <div
          className="star-rating"
          role="img"
          aria-label={`Rated ${rating} out of 5`}
        >
          <span style={{ width: `${rating * 20}%` }}>
            Rated <strong className="rating">{rating}</strong> out of 5
          </span>
        </div>
        <Link to={link} className="woocommerce-review-link">
          (<span className="count">{rating}</span> Rating)
        </Link>
      </div> */}
      <h4 className="tour-box_price">
        <span className="currency">{price}</span>/Person
      </h4>
      <div className="tour-action">
        <span>
          <i className="fa-light fa-clock" /> {duration} Days
        </span>
        <Link to={bookLink} className="th-btn style4 th-icon">
          Book Now
        </Link>
      </div>
    </div>
  </div>
);

function TourTwo() {
  const [activeTab, setActiveTab] = useState("nav-step1");
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/public/tours")
      .then((res) => res.json())
      .then((data) => setTours(data.data))
      .catch((err) => console.error("Error fetching tours:", err));
  }, []);

  return (
    <section
      className="tour-area3 position-relative bg-top-center overflow-hidden space"
      id="service-sec"
    //   style={{
    //     backgroundImage: "url('/assets/img/bg/tour_bg_1.jpg",
    //     backgroundRepeat: "no-repeat",
    //   }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="title-area text-center">
              <span className="sub-title">Best Experience</span>
              <h2 className="sec-title">Amazing Travel Experience</h2>
            </div>
          </div>
        </div>
        <div className="nav nav-tabs tour-tabs" id="nav-tab" role="tablist">
          <button
            className={`nav-link th-btn ${
              activeTab === "nav-step1" ? "active" : ""
            }`}
            id="nav-step1-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-step1"
            type="button"
            onClick={() => setActiveTab("nav-step1")}
          >
            <img src="/assets/img/icon/tour_icon_1.svg" alt="" />
            Tour Package
          </button>
        </div>
        <div className="tab-content" id="nav-tabContent">
          <div
            className={`tab-pane fade ${
              activeTab === "nav-step1" ? "show active" : ""
            }`}
            id="nav-step1"
            role="tabpanel"
          >
            <div className="slider-area tour-slider slider-drag-wrap">
              <Swiper
                modules={[Pagination]}
                spaceBetween={24}
                slidesPerView={4}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  576: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                  1200: { slidesPerView: 3 },
                  1400: { slidesPerView: 4 },
                }}
                pagination={{
                  clickable: true,
                }}
                className="swiper th-slider has-shadow"
              >
                {tours.map((data, index) => (
                  <SwiperSlide>
                    <TourItem
                      image={data.coverImage}
                      title={data.title}
                      link={`/tour-details/${data._id}`}
                      rating={5.0}
                      price={data.price}
                      duration={7}
                      bookLink="/contact"
                    />
                  </SwiperSlide>
                ))}
                {/* Add more SwiperSlide items here */}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TourTwo;
