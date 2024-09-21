"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import Link from "next/link";
import { allstring } from "@/app/types/dashbordcontenttypes";
import { instance } from "@/app/Api/axios";
export default function Categoryslider() {
  const [data, setdata] = useState<allstring[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await instance.get("/service-sliders");
        setdata(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="flex items-center max-md:flex-col max-md:items-start gap-3">
        <h1 className="mr-6 py-8 text-3xl "> خدماتنا </h1>
        <Link
          className="px-4 text-[16px] text-sky-500 whitespace-nowrap max-md:self-end"
          href={"/services"}
        >
          (كل الخدمات)
        </Link>
      </div>
      <div className="my-8  w-[90%] m-auto">
        <Swiper
          breakpoints={{
            // 320px
            320: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            // 480px
            480: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            // 640px
            640: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            // 768px
            768: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            // 1024px
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          grabCursor={true}
          effect={"creative"}
          loopAdditionalSlides={3}
          className="myswiper"
          spaceBetween={10}
          slidesPerView={6}
        >
          {data &&
            data.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center">
                  <div className="relative flex  items-center justify-center w-[120px] h-[120px] max-md:w-[80px] max-md:h-[80px] border-[6px] border-amber-600 rounded-full ">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={1024}
                      height={1280}
                      className="w-[100px] h-[100px] rounded-full max-sm:w-[75px] max-sm:h-[75px] "
                    />
                  </div>
                  <h1 className=" text-center py-1 ">{slide.title}</h1>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
