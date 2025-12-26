import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, closeModal, imageSrc, title  }) => {
    const [visible, setVisible] = useState(false);

    // Handle smooth opening
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setVisible(true), 10);
        } else {
            setVisible(false);
        }
    }, [isOpen]);

    if (!isOpen) return null; // Don't render if it's closed

    return (
        <div className={`modal-overlay ${visible ? "show" : ""}`} onClick={closeModal}>
            <div className={`modal-content ${visible ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>×</button>
                <img src={imageSrc} alt="Modal content" className="modal-image" />
                {title && <h4 style={{ marginTop: "10px", textAlign: "center" }}>{title}</h4>}
            </div>
        </div>
    );
};

export default Modal;
