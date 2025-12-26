import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // Import navigation styles
import "swiper/css/pagination"; // Import pagination styles
import { Link } from "react-router-dom";
import { ENV } from "../../env/environment";

function TourOne() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch(`${ENV.BASE_URL}/public/tours`)
      .then((res) => res.json())
      .then((data) => setTours(data))
      .catch((err) => console.error("Error fetching tours:", err));
  }, []);

  return (
    <section
      className="tour-area position-relative bg-top-center overflow-hidden space bg-no-repeat"
      id="service-sec"
      // style={{ backgroundImage: 'url(/assets/img/bg/tour_bg_1.jpg)' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="title-area text-center">
              <span className="sub-title">Best Place For You</span>
              <h2 className="sec-title">Most Popular Tour</h2>
              <p className="sec-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className="slider-area tour-slider">
          <Swiper
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
              1300: { slidesPerView: 4 },
            }}
            spaceBetween={24}
            grabCursor={true}
            className="swiper th-slider has-shadow slider-drag-wrap"
          >
            {tours.map((tour) => (
              <SwiperSlide key={tour.id}>
                <div className="tour-box th-ani gsap-cursor">
                  <div className="tour-box_img global-img">
                    <img src={tour.coverImage} alt={tour.alt} />
                  </div>
                  <div className="tour-content">
                    <h3 className="box-title">
                      <Link to={`/tour-details/${tour._id}`}>{tour.title}</Link>
                    </h3>
                    {/* <div className="tour-rating">
            <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5">
              <span style={{ width: '100%' }}>
                Rated <strong className="rating">5.00</strong> out of 5 based on{' '}
                <span className="rating">{tour.rating}</span> ({tour.rating} Rating)
              </span>
            </div>
            <Link to="/tour-details" className="woocommerce-review-link">
              (<span className="count">{tour.rating}</span> Rating)
            </Link>
          </div> */}
                    <h4 className="tour-box_price">
                      <span className="currency">{tour.price}</span>/Person
                    </h4>
                    <div className="tour-action">
                      <span>
                        <i className="fa-light fa-clock" />
                        {tour.duration}
                      </span>
                      <Link to="/contact" className="th-btn style4 th-icon">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default TourOne;
