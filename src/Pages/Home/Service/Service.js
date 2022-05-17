import React from "react";
import { useNavigate } from "react-router-dom";
import "./Service.css";

const Service = ({ service }) => {
  const { id, name, img, price, description } = service;
  const navigate = useNavigate();
  return (
    <div className="service col-sm-12 col-md-6 col-lg-4">
      <img src={img} alt="" />
      <div className="service-description">
        <h2> {name}</h2>
        <p>{description}</p>
        <p>
          <small>{price}</small>
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`service/${id}`)}
        >
          Booking : {name}
        </button>
      </div>
    </div>
  );
};

export default Service;
