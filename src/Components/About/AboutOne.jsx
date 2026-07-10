import React from "react";
import { Link } from "react-router-dom";

function AboutOne() {
  return (
    <div
      className="about-area position-relative overflow-hidden space"
      id="about-sec"
    >
      <div className="container shape-mockup-wrap">
        <div className="row">
          <div className="col-xl-6">
            <div className="img-box1">
              <div className="img1">
                <img src="/assets/img/normal/about_1_1.jpg" alt="About" />
              </div>
              <div className="img2">
                <img src="/assets/img/normal/about_1_2.jpg" alt="About" />
              </div>
              <div className="img3">
                <img src="/assets/img/normal/about_1_3.jpg" alt="About" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="ps-xl-4 ms-xl-2">
              <div className="title-area mb-20 pe-xl-5 me-xl-5">
                <span className="sub-title style1 ">Let’s Go Together</span>
                <h2 className="sec-title mb-20 pe-xl-5 me-xl-5 heading">
                  Plan Your Trip With us
                </h2>
                <p className="sec-text mb-30">
                  Every journey starts with a plan—and we make it extraordinary.
                  Discover new places, hidden gems, and unforgettable moments
                  with trips designed just for you. Let us handle the logistics
                  while you focus on making memories that last a lifetime.
                </p>
              </div>
              <div className="about-item-wrap">
                <div className="about-item">
                  <div className="about-item_img">
                    <img src="/assets/img/icon/map3.svg" alt="" />
                  </div>
                  <div className="about-item_centent">
                    <h5 className="box-title">Exclusive Trip</h5>
                    <p className="about-item_text">
                      Private, customized itinerary with VIP access, luxury stays for small groups, avoiding crowds
                    </p>
                  </div>
                </div>
                <div className="about-item">
                  <div className="about-item_img">
                    <img src="/assets/img/icon/guide.svg" alt="" />
                  </div>
                  <div className="about-item_centent">
                    <h5 className="box-title">Professional Guide</h5>
                    <p className="about-item_text">
                      Licensed expert offers destination insights, logistics, safety, and tailored commentary
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-35">
                <Link to="/about" className="th-btn style3 th-icon">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutOne;
