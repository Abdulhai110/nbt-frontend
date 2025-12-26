// src/admin/Pages/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, CardBody, Card, Container, Form, Input, Label } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { ENV } from "../env/environment"; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const validation = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(`${ENV.BASE_URL}/public/auth/login`, {
          email: values.email,
          password: values.password,
        });
        const token = response.data.token;

        // save token in context
        login(`Bearer ${token}`);
        navigate("/admin");
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="overflow-hidden shadow-lg rounded-3 border-0">
              <div className="bg-success-subtle">
                <Row>
                  <Col xs={7}>
                    <div className="text-success p-4">
                      <h5 className="text-success">Welcome Back !</h5>
                      <p>Sign in to continue.</p>
                    </div>
                  </Col>
                  <Col className="col-5 align-self-end"></Col>
                </Row>
              </div>
              <CardBody className="pt-0">
                <div className="auth-logo text-center">
                  <Link to="/" className="auth-logo-dark">
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-success-subtle text-success fs-4 fw-bold">
                        Home
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="p-2">
                  <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                    }}
                  >
                    <div className="mb-3">
                      <Label className="form-label text-success">Email</Label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={validation.values.email}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        className="border-success-subtle focus-ring-success"
                      />
                    </div>

                    <div className="mb-3">
                      <Label className="form-label text-success">Password</Label>
                      <Input
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={validation.values.password}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        className="border-success-subtle focus-ring-success"
                      />
                    </div>

                    <div className="mt-3 d-grid">
                      <button
                        className="btn btn-success btn-block"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Logging in..." : "Log In"}
                      </button>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
