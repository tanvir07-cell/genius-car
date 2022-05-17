import React from "react";
import notFound from "../../images/images/notFound.svg";

const NotFound = () => {
  return (
    <div className=" w-50 mx-auto">
      <h2 className="text-center text-primary mb-5">
        This page is under construction
      </h2>
      <img src={notFound} alt="" className="w-100" />
    </div>
  );
};

export default NotFound;
