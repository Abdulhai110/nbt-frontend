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
//                                     Rahimabad, Gilgit-Baltistan, Pakistan
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
//                                     <Link to="tel:01234567890">+92 123 456 789</Link>
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

  // Set default method
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
          contactMethod,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message processed successfully!");

        if (contactMethod === "whatsapp" && data.whatsappUrl) {
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
      <div className="space">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Contact Us</span>
            <h2 className="sec-title">Get in touch</h2>
            <p>
              We’d love to hear from you. Choose your preferred contact method.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form-wrapper">
            <div className="row gy-4">
              {/* Contact Method Selection */}
              <div className="col-12 text-center mb-3">
                <label className="d-block mb-2 font-weight-bold">
                  Contact via:
                </label>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className={`th-btn btn-sm ${
                      contactMethod === "email" ? "" : "btn-outline"
                    }`}
                    style={{
                      marginRight: "10px",
                      backgroundColor:
                        contactMethod === "email" ? "#113D48" : "#f4f4f4",
                      color: contactMethod === "email" ? "white" : "black",
                    }}
                    onClick={() => setContactMethod("email")}
                  >
                    <i className="fa fa-envelope mr-2"></i> Email
                  </button>
                  <button
                    type="button"
                    className={`th-btn btn-sm ${
                      contactMethod === "whatsapp" ? "" : "btn-outline"
                    }`}
                    style={{
                      backgroundColor:
                        contactMethod === "whatsapp" ? "#25D366" : "#f4f4f4",
                      color: contactMethod === "whatsapp" ? "white" : "black",
                    }}
                    onClick={() => setContactMethod("whatsapp")}
                  >
                    <i className="fab fa-whatsapp mr-2"></i> WhatsApp
                  </button>
                </div>
              </div>

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
                  placeholder="Phone number (Required for WhatsApp)"
                  required={contactMethod === "whatsapp"}
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

              <div className="col-12 text-center">
                <button
                  className="th-btn"
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor:
                      contactMethod === "whatsapp" ? "#25D366" : "",
                  }}
                >
                  {loading
                    ? "Sending..."
                    : contactMethod === "whatsapp"
                    ? "Send via WhatsApp"
                    : "Send Email"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ... rest of your contact info section remains the same ... */}
      <div className="space">
        <div className="container">
          <div className="title-area text-center">
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
                    Rahimabad, Gilgit-Baltistan, Pakistan
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
                    <Link to="tel:01234567890">+92 123 456 789</Link>
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
