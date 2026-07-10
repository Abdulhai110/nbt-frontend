import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import axios from "axios";
import { ENV } from "../../env/environment";
import Modal from "../Gallery/Modal";

const CategoryOne = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [categories, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${ENV.BASE_URL}/public/gallery`);
        setImages(res.data.data); // expecting [{ imageUrl: "..." }, ...]
      } catch (err) {
        console.error("Error fetching gallery images:", err);
      }
    };
    fetchImages();
  }, []);

  const openModal = (imageSrc, event) => {
    event.preventDefault();
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const swiperRef = useRef(null);
  useEffect(() => {
    if (!swiperRef.current) return;

    const swiperInstance = swiperRef.current.swiper;

    // ✅ Start autoplay properly
    if (swiperInstance && swiperInstance.autoplay) {
      swiperInstance.autoplay.start();
    }
    // ✅ Custom pagination with numbers
    if (swiperInstance.pagination) {
      swiperInstance.pagination.renderBullet = function (index, className) {
        let formattedNumber = index + 1 < 10 ? "0" + (index + 1) : index + 1;
        return `<span class="${className} number">${formattedNumber}</span>`;
      };
      swiperInstance.pagination.init();
      swiperInstance.pagination.update();
    }
    // ✅ Custom wheel effect for category slider
    const multiplier = {
      translate: 0.1,
      rotate: 0.01,
    };

    const calculateWheel = () => {
      const slides = document.querySelectorAll(".single");
      slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const r = window.innerWidth * 0.5 - (rect.x + rect.width * 0.5);
        let ty =
          Math.abs(r) * multiplier.translate -
          rect.width * multiplier.translate;

        if (ty < 0) {
          ty = 0;
        }
        const transformOrigin = r < 0 ? "left top" : "right top";
        slide.style.transform = `translate(0, ${ty}px) rotate(${
          -r * multiplier.rotate
        }deg)`;
        slide.style.transformOrigin = transformOrigin;
      });
    };

    const raf = () => {
      requestAnimationFrame(raf);
      calculateWheel();
    };

    raf();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="category-area bg-top-center"
      style={{
        // backgroundImage: "url(/assets/img/bg/category_bg_1.png)",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container th-container">
        <div className="title-area text-center">
          <span className="sub-title">Make Your Tour More Pleasure</span>
          <h2 className="sec-title">Recent Gallery</h2>
        </div>

        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          breakpoints={{
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 3 },
            1400: { slidesPerView: 5 },
          }}
          spaceBetween={40}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={1000}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            type: "bullets",
          }} // ✅ Defined renderBullet inside pagination
          className="th-slider has-shadow categorySlider"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="category-card gallery-card single">
                <div className="box-img global-img">
                  <Link
                    to={category.imageUrl}
                    className="popup-image"
                    onClick={(e) => openModal(category.imageUrl, e)}
                  >
                    <div className="icon-btn">
                      <i className="fal fa-magnifying-glass-plus" />
                    </div>
                  </Link>
                  <img
                    src={category.imageUrl}
                    alt="gallery"
                    onClick={(e) => openModal(category.imageUrl, e)}
                    style={{
                      width: "100%",
                      height: "350px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* <h3 className="box-title">
                  <Link to="/destination">{category.title}</Link>
                </h3>
                <Link className="line-btn" to="/destination">
                  See more
                </Link> */}
              </div>
            </SwiperSlide>
          ))}
          <div className="slider-controller w-100 justify-content-center">
            <div
              className="swiper-pagination"
              style={{ maxWidth: "100%" }}
            ></div>
          </div>
        </Swiper>
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          imageSrc={modalImage}
        />
      </div>
    </section>
  );
};

export default CategoryOne;
