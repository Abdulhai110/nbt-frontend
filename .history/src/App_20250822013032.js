// App.js
import React from "react";
import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

// Layouts
import HorizontalLayout from "./components/HorizontalLayout";
import NonAuthLayout from "./components/NonAuthLayout";

// Middleware
import AuthMiddleware from "./routes/route";

// Routes
import { publicRoutes, authProtectedRoutes } from "./routes";

// Styles
import "./assets/scss/theme.scss";

// Fake Backend
import fakeBackend from "./helpers/AuthType/fakeBackend";
fakeBackend();

const App = () => {
  const Layout = HorizontalLayout; // 🔥 force horizontal only

  return (
    <React.Fragment>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
          />
        ))}

        {/* Protected Routes (when you add them later) */}
        {authProtectedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <AuthMiddleware roles={route.roles}>
                <Layout>{route.component}</Layout>
              </AuthMiddleware>
            }
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => ({
  layout: state.Layout,
});

export default connect(mapStateToProps)(App);
