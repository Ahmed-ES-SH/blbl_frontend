"use client";
import React from "react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { otherproducts, serviceprogram } from "@/app/constant/websitecontent";
import Navbar from "../_components/_Website/Navbar";

export default function OrdersPage() {
  return (
    <>
      <div className="w-full  relative overflow-hidden main-bg">
        <Navbar />
        <div className="main-page h-[80vh] flex items-center justify-center  ">
          <div className="w-[80%] max-lg:w-full m-auto">
            <h1 className="text-2xl block w-full mb-6 px-4 self-start">
              تصميم وبرمجة موقع{" "}
            </h1>
            <Swiper
              breakpoints={{
                // 320px
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                // 480px
                480: {
                  slidesPerView: 2,
                  spaceBetween: 12,
                },
                // 640px
                640: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                // 768px
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                // 1024px
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
              }}
              // grabCursor={true}
              // effect={"creative"}
              // loopAdditionalSlides={3}
              // autoplay={{
              //   delay: 1500,
              //   disableOnInteraction: false,
              // }}
              // modules={[Autoplay]}
              className="myswiper"
              spaceBetween={10}
              slidesPerView={6}
            >
              {serviceprogram.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative flex flex-col  items-center justify-center bg-white w-[150px] h-[150px] shadow-lg rounded-sm ">
                      <Image
                        src={slide.imgsrc}
                        alt={slide.title}
                        width={1024}
                        height={1280}
                        className="w-[100px] max-sm:w-[75px] "
                      />
                      <h1 className=" text-center py-1 ">{slide.title}</h1>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
