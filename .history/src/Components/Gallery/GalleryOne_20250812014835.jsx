import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import axios from "axios";

function GalleryOne() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [galleryItems, setGalleryItems] = useState([]);

    // Fetch gallery data from API
    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await axios.get("/api/public/gallery"); // Adjust base URL if needed
                setGalleryItems(res.data);
            } catch (err) {
                console.error("Error fetching gallery:", err);
            }
        };
        fetchGallery();
    }, []);

    // Function to open the modal
    const openModal = (imageSrc, event) => {
        event.preventDefault();
        setModalImage(imageSrc);
        setIsModalOpen(true);
    };

    // Function to close the modal
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
                    {galleryItems.map((item, index) => (
                        <div className="col-md-6 col-lg-2" key={item._id || index}>
                            <div className="gallery-card">
                                <div className="box-img global-img">
                                    <Link
                                        to={item.imageUrl}
                                        className="popup-image"
                                        onClick={(e) => openModal(item.imageUrl, e)}
                                    >
                                        <div className="icon-btn">
                                            <i className="fal fa-magnifying-glass-plus" />
                                        </div>
                                    </Link>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title || "gallery"}
                                        onClick={(e) => openModal(item.imageUrl, e)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Shape decorations */}
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

            {/* Modal */}
            <Modal isOpen={isModalOpen} closeModal={closeModal} imageSrc={modalImage} />
        </div>
    );
}

export default GalleryOne;
