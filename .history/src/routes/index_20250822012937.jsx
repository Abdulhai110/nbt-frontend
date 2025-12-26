// routes/index.js
import React from "react";

// Public pages
import HomeOne from "../Pages/HomeOne";
import HomeTwo from "../Pages/HomeTwo";
import HomeThree from "../Pages/HomeThree";
import HomeFour from "../Pages/HomeFour";
import About from "../Pages/About";
import Destination from "../Pages/Destination";
import DestinationDetails from "../Pages/DestinationDetails";
import Service from "../Pages/Service";
import ServiceDetails from "../Pages/ServiceDetails";
import Activities from "../Pages/Activities";
import ActivitiesDetails from "../Pages/ActivitiesDetails";
import Shop from "../Pages/Shop";
import ShopDetails from "../Pages/ShopDetails";
import Cart from "../Pages/Cart";
import Checkout from "../Pages/Checkout";
import Wishlist from "../Pages/Wishlist";
import Gallery from "../Pages/Gallery";
import Tour from "../Pages/Tour";
import TourDetails from "../Pages/TourDetails";
import Resort from "../Pages/Resort";
import ResortDetails from "../Pages/ResortDetails";
import TourGuide from "../Pages/TourGuide";
import TourGuiderDetails from "../Pages/TourGuiderDetails";
import Faq from "../Pages/Faq";
import Pricing from "../Pages/Pricing";
import ErrorPage from "../Pages/Error";
import Blog from "../Pages/Blog";
import BlogDetails from "../Pages/BlogDetails";
import Contact from "../Pages/Contact";

// Protected pages (for later)
import AdminDashboard from "../Pages/AdminDashboard";

export const publicRoutes = [
  { path: "/", component: <HomeOne /> },
  { path: "/home-tour", component: <HomeTwo /> },
  { path: "/home-agency", component: <HomeThree /> },
  { path: "/home-yacht", component: <HomeFour /> },
  { path: "/about", component: <About /> },
  { path: "/destination", component: <Destination /> },
  { path: "/destination/:id", component: <DestinationDetails /> },
  { path: "/service", component: <Service /> },
  { path: "/service/:id", component: <ServiceDetails /> },
  { path: "/activities", component: <Activities /> },
  { path: "/activities-details", component: <ActivitiesDetails /> },
  { path: "/shop", component: <Shop /> },
  { path: "/shop/:id", component: <ShopDetails /> },
  { path: "/cart", component: <Cart /> },
  { path: "/checkout", component: <Checkout /> },
  { path: "/wishlist", component: <Wishlist /> },
  { path: "/gallery", component: <Gallery /> },
  { path: "/tour", component: <Tour /> },
  { path: "/tour-details", component: <TourDetails /> },
  { path: "/resort", component: <Resort /> },
  { path: "/resort/:id", component: <ResortDetails /> },
  { path: "/tour-guide", component: <TourGuide /> },
  { path: "/tour-guide/:id", component: <TourGuiderDetails /> },
  { path: "/faq", component: <Faq /> },
  { path: "/price", component: <Pricing /> },
  { path: "/error", component: <ErrorPage /> },
  { path: "/blog", component: <Blog /> },
  { path: "/blog/:id", component: <BlogDetails /> },
  { path: "/contact", component: <Contact /> },
];

export const authProtectedRoutes = [
  {
    path: "/admin",
    component: <AdminDashboard />,
    roles: ["admin"], // example role-based access
  },
];
