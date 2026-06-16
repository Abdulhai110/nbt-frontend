// src/Context/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

// ── Set up interceptors ONCE outside the component ──────────────────────────
let isRedirecting = false; // prevent multiple redirects firing at once

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("[Interceptor] status:", error.response?.status); // debug
    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
// ────────────────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("authToken")
  );
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("authUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (token, userData) => {
    isRedirecting = false; // reset on fresh login
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);