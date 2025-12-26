// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import HorizontalLayout from "./components/HorizontalLayout";
import NonAuthLayout from "./components/NonAuthLayout";

// Middleware
import AuthMiddleware from "./routes/route";

// Routes
import { authProtectedRoutes, publicRoutes } from "./routes";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={<NonAuthLayout>{route.component}</NonAuthLayout>}
        />
      ))}

      {/* Protected Routes */}
      {authProtectedRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            <AuthMiddleware roles={route.roles}>
              <HorizontalLayout>{route.component}</HorizontalLayout>
            </AuthMiddleware>
          }
        />
      ))}
    </Routes>
  );
};

export default App;
