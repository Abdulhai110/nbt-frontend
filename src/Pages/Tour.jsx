// import React from "react";
// import HeaderOne from "../Components/Header/HeaderOne";
// import Breadcrumb from "../Components/BreadCrumb/Breadcrumb";
// import TourInner from "../Components/Tour/TourInner";
// import FooterFour from "../Components/Footer/FooterFour";
// import ScrollToTop from "../Components/ScrollToTop";

// function Tour({ category }) {
//   return (
//     <>
//       <HeaderOne />
//       <Breadcrumb
//         title={
//           category
//             ? category === "honeymoon"
//               ? "Honeymoon Packages"
//               : "Pakistan Tour Packages"
//             : "All Tours"
//         }
//       />
//       <TourInner category={category} />
//       <FooterFour />
//       {/* <ScrollToTop />  */}
//     </>
//   );
// }

// export default Tour;




















// src/Pages/Tour.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderOne from "../Components/Header/HeaderOne";
import Breadcrumb from "../Components/BreadCrumb/Breadcrumb";
import TourInner from "../Components/Tour/TourInner";
import FooterFour from "../Components/Footer/FooterFour";
import { ENV } from "../env/environment";

function Tour() {
  const { typeSlug } = useParams();
  const [tourTypeMeta, setTourTypeMeta] = useState(null);

  useEffect(() => {
    if (!typeSlug) {
      setTourTypeMeta(null);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`${ENV.BASE_URL}/public/tour-types`);
        const data = await res.json();
        const match = (data.data || []).find((t) => t.slug === typeSlug);
        setTourTypeMeta(match || null);
      } catch (err) {
        console.error("Error fetching tour type:", err);
      }
    })();
  }, [typeSlug]);

  return (
    <>
      <HeaderOne />
      <Breadcrumb title={tourTypeMeta ? tourTypeMeta.name : "All Tours"} />
      <TourInner typeSlug={typeSlug} />
      <FooterFour />
    </>
  );
}

export default Tour;