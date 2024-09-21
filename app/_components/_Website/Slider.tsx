"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { instance } from "@/app/Api/axios";
import { allstring } from "@/app/types/dashbordcontenttypes";
import Stars from "../Stars";
export default function Slider(): React.JSX.Element {
  const [data, setdata] = useState<allstring[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await instance.get("/sliders");
        setdata(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="my-8  container-x">
        <Swiper
          breakpoints={{
            // 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // 480px
            480: {
              slidesPerView: 1,
              spaceBetween: 12,
            },
            // 640px
            640: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            // 768px
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          grabCursor={true}
          effect={"creative"}
          loopAdditionalSlides={3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className=""
          spaceBetween={10}
          slidesPerView={3}
        >
          {data.map((slide, index) => (
            <SwiperSlide className=" overflow-hidden" key={index}>
              <div className="relative w-fit max-md:w-full overflow-hidden flex flex-col items-center justify-center after:absolute after:w-full after:h-full after:content-[''] after:bg-sky-300/60 after:left-0 after:top-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={1024}
                  height={1280}
                  className="w-[450px] max-md:w-full h-[250px] rounded-md shadow-md"
                />
                <div className="content absolute">
                  <h1 className="text-4xl text-yellow-300 z-[88] relative">
                    {slide.title}
                  </h1>
                  <h1 className="z-[88] relative text-[12px] text-white">
                    {slide.description}
                  </h1>
                </div>
                <div className="stars absolute bottom-2 left-2 z-[9999]">
                  <Stars
                    goldStars={Number(slide.stars)}
                    grayStars={5 - Number(slide.stars)}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
