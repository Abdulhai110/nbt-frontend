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
    designation: "Tourist Guide",
    image1: "/assets/img/tour-guides/tour_guide_cover.jpg",
    image2: "/assets/img/tour-guides/tour_guide_1.jpg",
    socials: {
      facebook: "https://facebook.com/",
      twitter: "https://x.com/",
      linkedin: "https://linkedin.com/",
      youtube: "https://youtube.com/",
      instagram: "https://instagram.com/",
    },
  },
  {
    id: 2,
    name: "Kashif Zafar",
    designation: "Tourist Guide",
    image1: "/assets/img/tour-guides/tour_guide_cover.jpg",
    image2: "/assets/img/tour-guides/tour_guide_2.jpg",
    socials: {
      facebook: "https://facebook.com/",
      twitter: "https://x.com/",
      linkedin: "https://linkedin.com/",
      youtube: "https://youtube.com/",
      instagram: "https://instagram.com/",
    },
  },
  {
    id: 3,
    name: "Arshad Zafar",
    designation: "Tourist Guide",
    image1: "/assets/img/tour-guides/tour_guide_cover.jpg",
    image2: "/assets/img/tour-guides/tour_guide_3.jpg",
    socials: {
      facebook: "https://facebook.com/",
      twitter: "https://x.com/",
      linkedin: "https://linkedin.com/",
      youtube: "https://youtube.com/",
      instagram: "https://instagram.com/",
    },
  },
];

function TourGuideTwo() {
  return (
    <section className="team-area3 position-relative bg-top-center space">
      <div className="container z-index-common">
        <div className="title-area text-center">
          <span className="sub-title">Meet with Guide</span>
          <h2 className="sec-title">Meet with Tour Guide</h2>
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
                        <Link target="_blank" to={guide.socials.facebook}>
                          <i className="fab fa-facebook-f" />
                        </Link>
                        <Link target="_blank" to={guide.socials.twitter}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                          >
                            <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z" />
                          </svg>
                        </Link>
                        <Link target="_blank" to={guide.socials.linkedin}>
                          <i className="fab fa-linkedin-in" />
                        </Link>
                        <Link target="_blank" to={guide.socials.youtube}>
                          <i className="fab fa-youtube" />
                        </Link>
                        <Link target="_blank" to={guide.socials.instagram}>
                          <i className="fab fa-instagram" />
                        </Link>
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
