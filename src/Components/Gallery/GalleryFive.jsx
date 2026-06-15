import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ENV } from "../../../src/env/environment";

function GalleryFive() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    axios
      .get(`${ENV.BASE_URL}/public/gallery`)
      .then((res) => {
        setGalleryImages(res.data.data); // expecting [{ imageUrl, title, description }]
      })
      .catch((err) => console.error(err));
  }, []);

  const openModal = (imageSrc, title, event) => {
    event.preventDefault();
    setModalImage(imageSrc);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="sidebar-gallery-area space">
      <div className="container-fluid">
        <div className="slider-area">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            centeredSlides={true}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 3 },
              1300: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="th-slider has-shadow"
          >
            {galleryImages.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="gallery-thumb style2 global-img">
                  <img
                    src={item.imageUrl}
                    style={{
                      height: "20rem",
                      objectFit: "cover",
                    }}
                    alt={item.title || "Gallery"}
                    onClick={(e) => openModal(item.imageUrl, item.title, e)}
                  />
                  <Link
                    to={item.imageUrl}
                    className="gallery-btn popup-image"
                    onClick={(e) => openModal(item.imageUrl, item.title, e)}
                  >
                    <i className="fab fa-instagram" />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        imageSrc={modalImage}
        title={modalTitle}
      />
    </div>
  );
}

export default GalleryFive;
