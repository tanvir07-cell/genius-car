import React, { useState } from "react";
import banner1 from "../../../images/images/banner/banner1.jpg";
import banner2 from "../../../images/images/banner/banner2.jpg";
import banner3 from "../../../images/images/banner/banner3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./styles.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
// import { Carousel } from "react-bootstrap";

const Banner = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div>
            <img src={banner1} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div>
            <img src={banner2} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div>
            <img src={banner3} alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
