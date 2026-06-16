import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import { ENV } from "../../../src/env/environment";

function GalleryOne() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [images, setImages] = useState([]);

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

  return (
    <div className="gallery-area">
      <div className="container th-container shape-mockup-wrap">
        <div className="title-area text-center">
          <span className="sub-title">Make Your Tour More Pleasure</span>
          <h2 className="sec-title">Recent Gallery</h2>
        </div>
        <div className="row gy-10 gx-10 justify-content-center align-items-center">
          {/* Column 1 */}
          <div className="col-md-6 col-lg-2">
            {images[0] && (
              <div className="gallery-card">
                <div className="box-img global-img">
                  <Link
                    to={images[0].imageUrl}
                    className="popup-image"
                    onClick={(e) => openModal(images[0].imageUrl, e)}
                  >
                    <div className="icon-btn">
                      <i className="fal fa-magnifying-glass-plus" />
                    </div>
                  </Link>
                  <img
                    src={images[0].imageUrl}
                    alt="gallery"
                    onClick={(e) => openModal(images[0].imageUrl, e)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Column 2 */}
          <div className="col-md-6 col-lg-2">
            {images[1] && (
              <div className="gallery-card">
                <div className="box-img global-img">
                  <Link
                    to={images[1].imageUrl}
                    className="popup-image"
                    onClick={(e) => openModal(images[1].imageUrl, e)}
                  >
                    <div className="icon-btn">
                      <i className="fal fa-magnifying-glass-plus" />
                    </div>
                  </Link>
                  <img
                    src={images[1].imageUrl}
                    alt="gallery"
                    onClick={(e) => openModal(images[1].imageUrl, e)}
                  />
                </div>
              </div>
            )}
            {images[2] && (
              <div className="gallery-card">
                <div className="box-img global-img">
                  <Link
                    to={images[2].imageUrl}
                    className="popup-image"
                    onClick={(e) => openModal(images[2].imageUrl, e)}
                  >
                    <div className="icon-btn">
                      <i className="fal fa-magnifying-glass-plus" />
                    </div>
                  </Link>
                  <img
                    src={images[2].imageUrl}
                    alt="gallery"
                    onClick={(e) => openModal(images[2].imageUrl, e)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Column 3 */}
          <div className="col-md-6 col-lg-2">
            {images[3] && (
              <div className="gallery-card">
                <div className="box-img global-img">
                  <Link
                    to={images[3].imageUrl}
                    className="popup-image"
                    onClick={(e) => openModal(images[3].imageUrl, e)}
                  >
                    <div className="icon-btn">
                      <i className="fal fa-magnifying-glass-plus" />
                    </div>
                  </Link>
                  <img
                    src={images[3].imageUrl}
                    alt="gallery"
                    onClick={(e) => openModal(images[3].imageUrl, e)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Column 4 */}
          <div className="col-md-6 col-lg-2">
            {images[4] && (
              <div className="gallery-card">
                <div className="box-img global-img">
                  <Link
                    to={images[4].imageUrl}
                    className="popup-image"
                    onClick={(e) => openModal(images[4].imageUrl, e)}
                  >
                    <div className="icon-btn">
                      <i className="fal fa-magnifying-glass-plus" />
                    </div>
                  </Link>
                  <img
                    src={images[4].imageUrl}
                    alt="gallery"
                    onClick={(e) => openModal(images[4].imageUrl, e)}
                  />
                </div>
              </div>
            )}
            {images[5] && (
              <div className="gallery-card">
                <div className="box-img global-img">
                  <Link
                    to={images[5].imageUrl}
                    className="popup-image"
                    onClick={(e) => openModal(images[5].imageUrl, e)}
                  >
                    <div className="icon-btn">
                      <i className="fal fa-magnifying-glass-plus" />
                    </div>
                  </Link>
                  <img
                    src={images[5].imageUrl}
                    alt="gallery"
                    onClick={(e) => openModal(images[5].imageUrl, e)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Column 5 */}
          <div className="col-md-6 col-lg-2">
            {images[6] && (
              <div className="gallery-card">
                <div className="box-img global-img">
                  <Link
                    to={images[6].imageUrl}
                    className="popup-image"
                    onClick={(e) => openModal(images[6].imageUrl, e)}
                  >
                    <div className="icon-btn">
                      <i className="fal fa-magnifying-glass-plus" />
                    </div>
                  </Link>
                  <img
                    src={images[6].imageUrl}
                    alt="gallery"
                    onClick={(e) => openModal(images[6].imageUrl, e)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Shapes */}
        <div
          className="shape-mockup d-none d-xl-block"
          style={{ top: "-25%", left: "0%" }}
        >
          <img src="/assets/img/shape/line.png" alt="shape" />
        </div>
        <div
          className="shape-mockup movingX d-none d-xl-block"
          style={{ top: "30%", left: "-3%" }}
        >
          <img
            className="gmovingX"
            src="/assets/img/shape/shape_4.png"
            alt="shape"
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        imageSrc={modalImage}
      />
    </div>
  );
}

export default GalleryOne;
