import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import NiceSelect from "./NiceSelect";
import MobileMenu from "./MobileMenu";
import LoginForm from "./LoginForm";
import { useAuth } from "../../Context/AuthContext";

function HeaderOne() {
  const languageOptions = [
    { value: "language", label: "Language" },
    { value: "CNY", label: "CNY" },
    { value: "EUR", label: "EUR" },
    { value: "AUD", label: "AUD" },
  ];
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const { user } = useAuth(); // ← add this

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/*============================== Header Area ==============================*/}
      <header className="th-header header-layout1">
        <div className={`sticky-wrapper ${isSticky ? "sticky" : ""}`}>
          {/* Main Menu Area */}
          <div className="menu-area">
            <div className="container th-container">
              <div className="row align-items-center justify-content-between">
                {/* Logo Left */}
                <div className="col-auto">
                  <div className="header-logo">
                    <Link to="/">
                      <img src="/assets/img/nbt-logo.png" alt="NBT" />
                    </Link>
                  </div>
                </div>

                {/* Menu Center */}
                <div className="col d-none d-xl-block">
                  <nav className="main-menu text-center">
                    <ul className="d-flex justify-content-center gap-4 m-0">
                      <li>
                        <NavLink
                          to="/"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                          end
                        >
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/about"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          About Us
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/destination"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Destination
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/service"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Service
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/contact"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Contact us
                        </NavLink>
                      </li>
                      {user && user.role === "admin" ? (
                          <li style={{display: "flex", alignItems: "center"}}>
                            <Link
                                to="/admin"
                                style={{
                                  background: "linear-gradient(135deg, #151D4A 0%, #404569 100%)",
                                  color: "#fff",
                                  padding: "8px 20px",
                                  borderRadius: "20px",
                                  fontWeight: 600,
                                  fontSize: 14,
                                  textDecoration: "none",
                                  whiteSpace: "nowrap",
                                  boxShadow: "0 4px 12px rgba(21, 29, 74, 0.25)",
                                  transition: "all 0.3s ease",
                                }}
                            >
                              Admin Portal →
                            </Link>
                          </li>
                        ) : (
                        <li>
                        <NavLink
                        to="/login"
                        className={({isActive}) =>
                        isActive ? "active" : ""
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                  )}
                </ul>
              </nav>
            </div>

            {/* Mobile Toggle Right */}
            <div className="col-auto">
              <button
                  type="button"
                  className="th-menu-toggle d-block d-xl-none"
                  onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <i className="far fa-bars" />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="logo-bg bg-mask"
              style={{
                WebkitMaskImage: "url(/assets/img/logo_bg_mask.png)",
                maskImage: "url(/assets/img/logo_bg_mask.png)",
              }}
            />
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <LoginForm
        isOpen={isLoginFormOpen}
        onClose={() => setIsLoginFormOpen(false)}
      />
    </>
  );
}

export default HeaderOne;
