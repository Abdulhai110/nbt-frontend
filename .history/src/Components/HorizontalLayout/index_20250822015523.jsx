// src/components/HorizontalLayout.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

// components
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";

const HorizontalLayout = ({ children }) => {
  const location = useLocation();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  // update document title on route change
  useEffect(() => {
    const title = location.pathname === "/" ? "Home" : location.pathname.replace("/", "");
    document.title = `${title} | My Website`;
  }, [location.pathname]);

  // scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <div id="layout-wrapper">
      <Header isMenuOpened={isMenuOpened} openLeftMenuCallBack={toggleMenu} />
      <Navbar menuOpen={isMenuOpened} />
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  );
};

HorizontalLayout.propTypes = {
  children: PropTypes.node,
};

export default HorizontalLayout;
