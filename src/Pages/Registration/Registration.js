import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Button, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import registration from "../../images/images/registration.svg";
import "./Resgistration.css";
import auth from "../../Firebase/firebase.init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "../Home/SocialLogin/SocialLogin";

const Registration = () => {
  // for term agree and not agree:
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const [createUserWithEmailAndPassword, user, loading, hooksError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  console.log(user);

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

    if (userInfo.email && userInfo.password && agree) {
      createUserWithEmailAndPassword(userInfo.email, userInfo.password);
      toast.success(`${userInfo.email} created Successfully`);
    }
  };

  // showing the backend error:
  useEffect(() => {
    if (hooksError) {
      switch (hooksError?.code) {
        case "auth/email-already-exists":
          toast.error("This email already exist! Please provide a new email", {
            toastId: "id-email-exist",
          });
          break;

        case "auth/invalid-email":
          toast.error(
            "Invalid Email Provided ! Please Provide a Valid Email Address",
            { toastId: "id-1" }
          );
          break;

        case "auth/invalid-password":
          toast.error("Wrong Password! Provide a valid Password", {
            toastId: "id-2",
          });
          break;

        default:
          toast.error("Something Went Wrong", { toastId: "id-3" });
          break;
      }
    }
  }, [hooksError]);

  if (user) {
    navigate("/");
  }
  console.log(user);
  return (
    <div>
      <h2 className="text-center text-primary mt-2 mb-4">Please Register</h2>
      <div className="login">
        <div className="w-50 mx-auto">
          <img src={registration} alt="" className="w-100" />
        </div>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter Your name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
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
            <Form.Check
              onClick={() => setAgree(!agree)}
              type="checkbox"
              label={
                agree ? (
                  <span className="text-success">
                    Accept Genius Car Term & Condition
                  </span>
                ) : (
                  <span className="text-danger">
                    Accept Genius Car Term & Condition
                  </span>
                )
              }
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={!agree}>
            Register
          </Button>

          <p className="mt-3">
            Already have an account ?
            <Link
              className="text-primary pe-auto text-decoration-none"
              to="/login"
              onClick={() => Navigate("/login")}
            >
              Please Login first
            </Link>
          </p>
          <SocialLogin></SocialLogin>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
