import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const guides = [
  {
    id: 1,
    name: "Atif Zafar",
    designation: "Malaysian office CEO",
    image1: "/assets/img/tour-guides/tour_guide_cover.jpg",
    image2: "/assets/img/tour-guides/tour_guide_1.jpg",
    description:
      "Leading our operations in the heart of Southeast Asia, our Malaysian Office CEO bridges the gap between global standards and local expertise. With a deep passion for Malaysian heritage, they ensure every traveler experiences the true Truly Asia hospitality through curated, seamless itineraries.",
  },
  {
    id: 2,
    name: "Kashif Zafar",
    designation: "Chief financial officer",
    image1: "/assets/img/tour-guides/tour_guide_cover.jpg",
    image2: "/assets/img/tour-guides/tour_guide_2.jpg",
    description:
      "The architect of our financial integrity, our CFO ensures that world-class travel remains accessible and transparent. By managing resources with precision, they allow us to invest in better safety, premium partnerships, and the best possible value for our clients' adventures.",
  },
  {
    id: 3,
    name: "Arshad Zafar",
    designation: "Chief executive officer",
    image1: "/assets/img/tour-guides/tour_guide_cover.jpg",
    image2: "/assets/img/tour-guides/tour_guide_3.jpg",
    description:
      "As the visionary behind our global journey, the CEO drives our commitment to redefining travel. With a focus on innovation and excellence, they lead our team in transforming simple trips into life-changing stories, ensuring that every destination we touch meets our gold standard of service.",
  },
];

function TourGuideTwo() {
  return (
    <section className="team-area3 position-relative bg-top-center space">
      <div className="container z-index-common">
        <div className="title-area text-center">
          <span className="sub-title">Meet with Guide</span>
          <h2 className="sec-title">Meet with our team of professional</h2>
        </div>
        <div className="slider-area">
          <Swiper
            slidesPerView={3}
            spaceBetween={24}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: ".slider-prev",
              nextEl: ".slider-next",
            }}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="th-slider teamSlider3 has-shadow"
          >
            {guides.map((guide) => (
              <SwiperSlide key={guide.id}>
                <div className="th-team team-grid">
                  <div className="team-img">
                    <img src={guide.image1} alt={guide.name} />
                  </div>
                  <div className="team-img2">
                    <img src={guide.image2} alt={guide.name} />
                  </div>
                  <div className="team-content">
                    <div className="media-body">
                      <h3 className="box-title">
                        {guide.name ? guide.name : "No Name"}
                        {/* <Link to={`/tour-guide/${guide.id}`}>{guide.name}</Link> */}
                      </h3>
                      <span className="team-desig">{guide.designation}</span>
                      <div className="th-social">
                        <p>{guide.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Slider Navigation */}
          <button className="slider-arrow slider-prev">
            <img src="/assets/img/icon/right-arrow2.svg" alt="Prev" />
          </button>
          <button className="slider-arrow slider-next">
            <img src="/assets/img/icon/left-arrow2.svg" alt="Next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TourGuideTwo;
