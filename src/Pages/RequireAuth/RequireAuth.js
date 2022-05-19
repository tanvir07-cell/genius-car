import React from "react";
import "./RequireAuth.css";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../Firebase/firebase.init";
import Loading from "../Loading/Loading";

const RequireAuth = ({ children }) => {
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  //   checkout Page reload dile jate user ti abar login Page e nah ase tar jonne:
  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // verified email address then login/signup user:

  if (!user.emailVerified) {
    return (
      <div className="verify-email">
        <h3 className="text-danger mb-5">Your Email is not verified ❌</h3>
        <h5 className="text-success mb-5">Please Verify Your Email Address</h5>
        <button
          className="btn btn-primary"
          onClick={async () => {
            await sendEmailVerification();
            toast.info("Send Email", { id: "verification-email" });
          }}
        >
          Send Verification Email Again
        </button>
      </div>
    );
  }

  return children;
};

export default RequireAuth;
