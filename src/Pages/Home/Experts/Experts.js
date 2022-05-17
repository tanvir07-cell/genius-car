import React from "react";
import expert1 from "../../../images/images/experts/expert-1.jpg";
import expert2 from "../../../images/images/experts/expert-2.jpg";
import expert3 from "../../../images/images/experts/expert-3.jpg";
import expert4 from "../../../images/images/experts/expert-4.jpg";
import expert5 from "../../../images/images/experts/expert-5.jpg";
import expert6 from "../../../images/images/experts/expert-6.png";
import Expert from "../Expert/Expert";

const experts = [
  {
    id: 1,
    name: "Will Smith",
    img: expert1,
  },
  {
    id: 2,
    name: "Brd pitt",
    img: expert2,
  },
  {
    id: 3,
    name: "Cillian Murphy",
    img: expert3,
  },
  {
    id: 4,
    name: "Poly gray",
    img: expert4,
  },
  {
    id: 5,
    name: "John Shelby",
    img: expert5,
  },
  {
    id: 6,
    name: "Aurthar Shelby",
    img: expert6,
  },
];

const Experts = () => {
  return (
    <div className="container " id="experts">
      <div className="row ">
        {experts.map((expert) => (
          <Expert key={expert.id} expert={expert}></Expert>
        ))}
      </div>
    </div>
  );
};

export default Experts;
