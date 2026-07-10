import React from "react";
import HeaderOne from "../Components/Header/HeaderOne";
import Breadcrumb from "../Components/BreadCrumb/Breadcrumb";
import TourInner from "../Components/Tour/TourInner";
import FooterFour from "../Components/Footer/FooterFour";
import ScrollToTop from "../Components/ScrollToTop";

function Tour({ category }) {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Pakistan Popular Tours" />
      <TourInner category={category} />
      <FooterFour />
      {/* <ScrollToTop />  */}
    </>
  );
}

export default Tour;
