import { Link, useLocation, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BiShow, BiHide } from "react-icons/bi";

import authentication from "../../images/images/authentication.svg";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../Firebase/firebase.init";
import SocialLogin from "../Home/SocialLogin/SocialLogin";
import Loading from "../Loading/Loading";
import PageTitle from "../Shared/PageTitle/PageTitle";
const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [signInWithEmailAndPassword, user, loading, hooksError] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  if (loading || sending) {
    <Loading></Loading>;
  }

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

  const handleConfirmPasswordChange = (event) => {
    if (event.target.value !== userInfo.password) {
      setErrors({ ...errors, passwordError: "Password does not match" });
      setUserInfo({ ...userInfo, confirmPass: "" });
    } else {
      setUserInfo({ ...userInfo, confirmPass: event.target.value });
      setErrors({ ...errors, passwordError: "" });
    }
  };

  // reset password:
  const resetPassword = async () => {
    await sendPasswordResetEmail(userInfo.email);
    if (userInfo.email) {
      toast(`Sending Email to ${userInfo.email}`, { id: "send-email" });
    } else {
      toast.error("Please write a proper email address", {
        id: "send-email-3",
      });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (
      userInfo.password &&
      userInfo.email &&
      userInfo.password === userInfo.confirmPass
    ) {
      signInWithEmailAndPassword(userInfo.email, userInfo.password);
    }
  };

  useEffect(() => {
    //   toast message ti ekbar jate dekhay jotobar ei click kori nah keno toast message ti jate ekbarei dekhay tar jonne
    // {toastId:"id-1"} diye diyechi;
    if (hooksError) {
      switch (hooksError?.code) {
        case "auth/user-not-found":
          toast.error(
            "Invalid User ! Please Provide a Valid Email Address or Password",
            { toastId: "id-email" }
          );
          break;
        case "auth/invalid-email":
          toast.error(
            "Invalid Email Provided ! Please Provide a Valid Email Address",
            { toastId: "id-1" }
          );
          break;

        case "auth/invalid-password	":
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

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  console.log(user);

  return (
    <div>
      {/* dynamic page title */}
      <PageTitle title="Login"></PageTitle>
      <h2 className="text-center text-primary mt-2 mb-4">Please Login</h2>
      <div className="login">
        <div className="w-50 mx-auto">
          <img src={authentication} alt="" className="w-100" />
        </div>
        <Form onSubmit={handleFormSubmit}>
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div className=" parent-hide-show">
              <Form.Control
                type={showPass ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={handleConfirmPasswordChange}
              />

              {showPass ? (
                <BiHide
                  className="position-hide-show"
                  onClick={() => setShowPass(!showPass)}
                ></BiHide>
              ) : (
                <BiShow
                  className="position-hide-show"
                  onClick={() => setShowPass(!showPass)}
                ></BiShow>
              )}
            </div>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="d-block mx-auto w-50"
          >
            Login
          </Button>
          <p className="mt-3">
            New to Genius Car ?
            <Link
              className="text-primary pe-auto text-decoration-none"
              to="/register"
              onClick={() => navigate("/register")}
            >
              Please Register
            </Link>
          </p>
          <p className="mt-3">
            Forget Password ?
            <Link
              to=""
              className="text-primary pe-auto text-decoration-none"
              onClick={resetPassword}
            >
              Reset Password
            </Link>
          </p>
          <SocialLogin></SocialLogin>
        </Form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
