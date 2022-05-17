import { Link, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import authentication from "../../images/images/authentication.svg";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const handleEmailChange = (event) => {
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(event.target.value)) {
      setUserInfo({ ...userInfo, email: event.target.value });
      setErrors({ ...errors, emailError: "" });
    } else {
      setErrors({ ...errors, emailError: "Invalid email address" });
      setUserInfo({ ...userInfo, email: "" });
    }
  };

  const handlePasswordChange = (event) => {
    if (/.{6,}/.test(event.target.value)) {
      setUserInfo({ ...userInfo, password: event.target.value });
      setErrors({ ...errors, passwordError: "" });
    } else {
      setErrors({
        ...errors,
        passwordError: "Password must be at least 6 characters",
      });
      setUserInfo({ ...userInfo, password: "" });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <h2 className="text-center text-primary mt-2 mb-5">Please Login</h2>
      <div className="login">
        <div className="w-50 mx-auto">
          <img src={authentication} alt="" className="w-100" />
        </div>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleEmailChange}
            />
            {errors?.emailError && (
              <Form.Text className="error-message">
                {errors?.emailError}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            {errors?.passwordError && (
              <Form.Text className="error-message">
                {errors?.passwordError}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          <p className="mt-3">
            New to Genius Car ?
            <Link
              className="text-danger pe-auto text-decoration-none"
              to="/register"
              onClick={() => navigate("/register")}
            >
              Please Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
