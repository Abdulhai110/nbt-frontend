import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadTop from "../Components/LoadTop";

// pages
import HomeOne from "./HomeOne";
import HomeTwo from "./HomeTwo";
import HomeThree from "./HomeThree";
import HomeFour from "./HomeFour";
import About from "./About";
import Destination from "./Destination";
import DestinationDetails from "./DestinationDetails";
import Service from "./Service";
import ServiceDetails from "./ServiceDetails";
import Activities from "./Activities";
import ActivitiesDetails from "./ActivitiesDetails";
import Shop from "./Shop";
import ShopDetails from "./ShopDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Wishlist from "./Wishlist";
import Gallery from "./Gallery";
import Tour from "./Tour";
import TourDetails from "./TourDetails";
import Resort from "./Resort";
import ResortDetails from "./ResortDetails";
import TourGuide from "./TourGuide";
import TourGuiderDetails from "./TourGuiderDetails";
import Faq from "./Faq";
import Pricing from "./Pricing";
import Error from "./Error";
import Blog from "./Blog";
import BlogDetails from "./BlogDetails";
import Contact from "./Contact";
import AdminDashboard from "./AdminDashboard"; // <-- example admin page
import AuthMiddleware from "../routes/AuthMiddleware";

function RouterPage() {
  return (
    <Router>
      <LoadTop />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<HomeOne />} />
        <Route path="/home-tour" element={<HomeTwo />} />
        <Route path="/home-agency" element={<HomeThree />} />
        <Route path="/home-yacht" element={<HomeFour />} />
        <Route path="/about" element={<About />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        <Route path="/service" element={<Service />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities-details" element={<ActivitiesDetails />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ShopDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/tour-details" element={<TourDetails />} />
        <Route path="/resort" element={<Resort />} />
        <Route path="/resort/:id" element={<ResortDetails />} />
        <Route path="/tour-guide" element={<TourGuide />} />
        <Route path="/tour-guide/:id" element={<TourGuiderDetails />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/price" element={<Pricing />} />
        <Route path="/error" element={<Error />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />

        {/* protected route example */}
        <Route
          path="/admin"
          element={
            <AuthMiddleware roles={["admin"]}>
              <AdminDashboard />
            </AuthMiddleware>
          }
        />
      </Routes>
    </Router>
  );
}

export default RouterPage;
