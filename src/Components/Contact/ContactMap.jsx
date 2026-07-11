import React from 'react'

function ContactMap() {
    return (
        <div className="">
            <div className="container-fluid">
                <div className="contact-map style2">
                    <iframe
                        title='Map location'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1584.4916683641343!2d74.31155047549632!3d35.92097186978339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e6360760572d1d%3A0x6cfc714aba945583!2sCol%20Hassan%20Rd%2C%20Gilgit!5e0!3m2!1sen!2s!4v1755996530206!5m2!1sen!2s"
                        allowFullScreen=""
                        loading="lazy"
                    />
                    <div className="contact-icon">
                        <img src="assets/img/icon/location-dot3.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactMap
