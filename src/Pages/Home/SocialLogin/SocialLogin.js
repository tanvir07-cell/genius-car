import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../../Firebase/firebase.init";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const navigate = useNavigate();
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  if (googleUser) {
    navigate("/");
  }

  useEffect(() => {
    if (googleError) {
      toast.error(`${googleError}`, { id: "google-error-1" });
    }
  }, [googleError]);
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

      <button className="btn btn-primary text-uppercase d-block mx-auto my-2">
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
