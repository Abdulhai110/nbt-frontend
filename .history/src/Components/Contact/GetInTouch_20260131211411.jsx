// import React from 'react'
// import { Link } from 'react-router-dom'

// function GetInTouch() {
//     return (
//         <div className="space">
//             <div className="container">
//                 <div className="title-area text-center">
//                     <span className="sub-title">Get In Touch</span>
//                     <h2 className="sec-title">Our Contact Information</h2>
//                 </div>
//                 <div className="row gy-4 justify-content-center">
//                     <div className="col-xl-4 col-lg-6">
//                         <div className="about-contact-grid style2">
//                             <div className="about-contact-icon">
//                                 <img src="/assets/img/icon/location-dot2.svg" alt="" />
//                             </div>
//                             <div className="about-contact-details">
//                                 <h6 className="box-title">Our Address</h6>
//                                 <p className="about-contact-details-text">
//                                     A-218 Dar Plaza Gilgit City, Gilgit Baltistan, Pakistan
//                                 </p>
//                                 <p className="about-contact-details-text"></p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-xl-4 col-lg-6">
//                         <div className="about-contact-grid">
//                             <div className="about-contact-icon">
//                                 <img src="/assets/img/icon/call.svg" alt="" />
//                             </div>
//                             <div className="about-contact-details">
//                                 <h6 className="box-title">Phone Number</h6>
//                                 <p className="about-contact-details-text">
//                                     <Link to="tel:01234567890">+92 349 5899779</Link>
//                                 </p>
//                                 <p className="about-contact-details-text">
//                                     <Link to="tel:01234567890">+92 345 999 9517</Link>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-xl-4 col-lg-6">
//                         <div className="about-contact-grid">
//                             <div className="about-contact-icon">
//                                 <img src="/assets/img/icon/mail.svg" alt="" />
//                             </div>
//                             <div className="about-contact-details">
//                                 <h6 className="box-title">Email Address</h6>
//                                 <p className="about-contact-details-text">
//                                     <Link to="mailto: ar.zafar890@gmail.com"> ar.zafar890@gmail.com</Link>
//                                 </p>
//                                 <p className="about-contact-details-text">
//                                     <Link to="mailto:support24@nbt.com">support24@nbt.com</Link>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default GetInTouch

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../env/environment";

function GetInTouch() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [contactMethod, setContactMethod] = useState("email");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${ENV.BASE_URL}/public/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          contactMethod, // 👈 send selection
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message processed successfully!");

        // ONLY open WhatsApp if backend says so
        if (data.whatsappUrl) {
          window.open(data.whatsappUrl, "_blank");
        }

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CONTACT FORM SECTION */}
      <div className="space">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Contact Us</span>
            <h2 className="sec-title">Get in touch</h2>
            <p>We’d love to hear from you. Please fill out this form.</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form-wrapper">
            <div className="row gy-4">
              <div className="col-md-6">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name *"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name *"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <textarea
                  name="message"
                  placeholder="Leave us a message..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-12">
                <label style={{ fontWeight: "600" }}>Contact Method *</label>

                <div
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                >
                  <label>
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={contactMethod === "email"}
                      onChange={(e) => setContactMethod(e.target.value)}
                    />{" "}
                    Email
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="contactMethod"
                      value="whatsapp"
                      checked={contactMethod === "whatsapp"}
                      onChange={(e) => setContactMethod(e.target.value)}
                    />{" "}
                    WhatsApp
                  </label>
                </div>
              </div>
              <div className="col-12 text-center">
                <button className="th-btn" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* EXISTING CONTACT INFO SECTION (UNCHANGED) */}
      <div className="space">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Get In Touch</span>
            <h2 className="sec-title">Our Contact Information</h2>
          </div>

          <div className="row gy-4 justify-content-center">
            <div className="col-xl-4 col-lg-6">
              <div className="about-contact-grid style2">
                <div className="about-contact-icon">
                  <img src="/assets/img/icon/location-dot2.svg" alt="" />
                </div>
                <div className="about-contact-details">
                  <h6 className="box-title">Our Address</h6>
                  <p className="about-contact-details-text">
                    A-218 Dar Plaza Gilgit City, Gilgit Baltistan, Pakistan
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6">
              <div className="about-contact-grid">
                <div className="about-contact-icon">
                  <img src="/assets/img/icon/call.svg" alt="" />
                </div>
                <div className="about-contact-details">
                  <h6 className="box-title">Phone Number</h6>
                  <p className="about-contact-details-text">
                    <Link to="tel:01234567890">+92 349 5899779</Link>
                  </p>
                  <p className="about-contact-details-text">
                    <Link to="tel:01234567890">+92 345 999 9517</Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6">
              <div className="about-contact-grid">
                <div className="about-contact-icon">
                  <img src="/assets/img/icon/mail.svg" alt="" />
                </div>
                <div className="about-contact-details">
                  <h6 className="box-title">Email Address</h6>
                  <p className="about-contact-details-text">
                    <Link to="mailto:ar.zafar890@gmail.com">
                      ar.zafar890@gmail.com
                    </Link>
                  </p>
                  <p className="about-contact-details-text">
                    <Link to="mailto:support24@nbt.com">support24@nbt.com</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetInTouch;
