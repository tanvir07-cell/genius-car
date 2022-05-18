import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../Firebase/firebase.init";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const navigate = useNavigate();

  // google signIn:
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  // github SignIn:
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);

  // user ti jodi login kore tahole jeikhan theke user ti login page e eseche sei page e jate redirect hoy tar jonne :
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const User = googleUser || githubUser;
    if (User) {
      navigate(from, { replace: true });
    }
  }, [googleUser, githubUser, from, navigate]);

  // showing error from firebase backend:

  useEffect(() => {
    const hooksError = googleError || githubError;
    if (hooksError) {
      toast.error(`${hooksError}`, { id: "google-error-1" });
    }
  }, [googleError, githubError]);
  return (
    <div>
      <div className="d-flex align-items-center ">
        <div className="bg-primary w-50" style={{ height: "1px" }}></div>
        <div>
          <p className="mt-2 px-2">OR</p>
        </div>
        <div className="bg-primary w-50" style={{ height: "1px" }}></div>
      </div>

      <button
        className="btn btn-primary text-uppercase d-block mx-auto "
        onClick={() => signInWithGoogle()}
      >
        <div className="d-flex align-items-center justify-content-center">
          <FcGoogle></FcGoogle>
          <span className="mx-2"> Continue With Google</span>
        </div>
      </button>

      <button className="btn btn-primary text-uppercase d-block mx-auto my-2">
        <div className="d-flex align-items-center justify-content-center">
          <FaFacebook></FaFacebook>
          <span className="mx-2"> Continue With Facebook</span>
        </div>
      </button>

      <button
        className="btn btn-primary text-uppercase d-block mx-auto my-2"
        onClick={() => signInWithGithub()}
      >
        <div className="d-flex align-items-center justify-content-center">
          <BsGithub></BsGithub>
          <span className="mx-2"> Continue With Github</span>
        </div>
      </button>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SocialLogin;
