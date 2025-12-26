import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { Link } from 'react-router-dom';

function GalleryOne() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);

    // Fetch gallery images from backend
    useEffect(() => {
        axios.get('http://localhost:5000/api/public/gallery') // your backend route
            .then(res => {
                setGalleryImages(res.data); // Assuming API returns [{ imageUrl, title, description }]
            })
            .catch(err => console.error("Error fetching gallery images:", err));
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
                    {galleryImages.map((img, index) => (
                        <div className="col-md-6 col-lg-2" key={index}>
                            <div className="gallery-card">
                                <div className="box-img global-img">
                                    <Link
                                        to={img.imageUrl}
                                        className="popup-image"
                                        onClick={(e) => openModal(img.imageUrl, e)}
                                    >
                                        <div className="icon-btn">
                                            <i className="fal fa-magnifying-glass-plus" />
                                        </div>
                                    </Link>
                                    <img
                                        src={img.imageUrl}
                                        alt={img.title || 'gallery'}
                                        onClick={(e) => openModal(img.imageUrl, e)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal isOpen={isModalOpen} closeModal={closeModal} imageSrc={modalImage} />
            </div>
        </div>
    );
}

export default GalleryOne;
