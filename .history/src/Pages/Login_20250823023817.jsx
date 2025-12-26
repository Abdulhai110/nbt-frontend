// src/admin/Pages/Login.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../Context/AuthContext"; 
// import profile from "../../assets/images/profile-img.png";
// import logo from "../../assets/images/logo.svg";
// import lightlogo from "../../assets/images/logo-light.svg";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const validation = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: (values) => {
      if (values.email === "test@mail.com" && values.password === "test") {
        login("Bearer dummyToken123"); // use context login
        navigate("/admin");
      } else {
        alert("Invalid credentials. Try test@mail.com / test");
      }
    },
  });

  return (
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="overflow-hidden">
              <div className="bg-primary-subtle">
                <Row>
                  <Col xs={7}>
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p>Sign in to continue.</p>
                    </div>
                  </Col>
                  <Col className="col-5 align-self-end">
                    {/* <img src={profile} alt="" className="img-fluid" /> */}
                  </Col>
                </Row>
              </div>
              <CardBody className="pt-0">
                <div className="auth-logo text-center">
                  <Link to="/" className="auth-logo-dark">
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-light">
                        {/* <img
                          src={logo}
                          alt=""
                          className="rounded-circle"
                          height="34"
                        /> */}
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
                      return false;
                    }}
                  >
                    <div className="mb-3">
                      <Label className="form-label">Email</Label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={validation.values.email}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                      />
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Password</Label>
                      <Input
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={validation.values.password}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                      />
                    </div>

                    <div className="mt-3 d-grid">
                      <button className="btn btn-primary btn-block" type="submit">
                        Log In
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
