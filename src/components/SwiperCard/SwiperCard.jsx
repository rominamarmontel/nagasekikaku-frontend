import React, { useRef, useState } from "react";
import './SwiperCard.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";



function SwiperCard({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={4}
        navigation={true}
        thumbs={{ thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img src={product.image} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={product.image} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={product.image} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={product.image} />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={4}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={product.image} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={product.image} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={product.image} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={product.image} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default SwiperCard