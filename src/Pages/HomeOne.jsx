import React from "react";
import HeaderOne from "../Components/Header/HeaderOne";
import BannerOne from "../Components/Banner/BannerOne";
import CategoryOne from "../Components/Category/CategoryOne";
import DestinationOne from "../Components/Destination/DestinationOne";
import AboutOne from "../Components/About/AboutOne";
import TourOne from "../Components/Tour/TourOne";
import ReviewsSection from "../Components/Testimonials/ReviewsSection";
import FooterFour from "../Components/Footer/FooterFour";

function HomeOne() {
  return (
    <div>
      <HeaderOne />
      <BannerOne />
      <CategoryOne />
      <TourOne />
      <DestinationOne />
      <AboutOne />
      <ReviewsSection />
      <FooterFour />
    </div>
  );
}

export default HomeOne;
