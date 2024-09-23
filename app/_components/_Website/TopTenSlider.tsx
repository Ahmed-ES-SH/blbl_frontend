"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { instance } from "@/app/Api/axios";
import Link from "next/link";
import { Star, UserCircle2 } from "lucide-react";
export default function TopTenSlider() {
  const [topten, settopten] = useState<any>(null);

  useEffect(() => {
    const get_top_10 = async () => {
      try {
        const cachedData = localStorage.getItem("top_10_services");
        const cachedTime = localStorage.getItem("top_10_services_time");
        const now = new Date().getTime();

        if (cachedData && cachedTime) {
          // التحقق من مرور نصف ساعة (1800000 مللي ثانية = 30 دقيقة)
          if (now - parseInt(cachedTime) < 1800000) {
            settopten(JSON.parse(cachedData));
            return; // استخدام البيانات المخزنة وعدم جلبها من الخادم
          } else {
            // حذف البيانات المخزنة إذا مرت نصف ساعة
            localStorage.removeItem("top_10_services");
            localStorage.removeItem("top_10_services_time");
          }
        }

        // جلب البيانات من الخادم وحفظها
        const res = await instance.get("/services-10");
        const data = res.data.data;
        settopten(data);

        // حفظ البيانات ووقت الحفظ في localStorage
        localStorage.setItem("top_10_services", JSON.stringify(data));
        localStorage.setItem("top_10_services_time", now.toString());
      } catch (error) {
        console.log(error);
      }
    };

    get_top_10();
  }, []);

  return (
    <>
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 1, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
        grabCursor={true}
        effect={"creative"}
        loopAdditionalSlides={3}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="myswiper"
        spaceBetween={10}
        slidesPerView={5}
      >
        {topten !== null &&
          topten.map((slide: any, index: number) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[230px] overflow-hidden max-md:h-[110px] shadow-lg bg-bglight px-4 py-2 flex-two md:flex-col rounded-md">
                <Link
                  className="z-[999]"
                  href={`/vendorpublicpage/${slide?.vendor?.id}`}
                >
                  <Image
                    src={slide?.vendor?.image || "/images/userbg.png"}
                    alt="alt-image"
                    width={1024}
                    height={1280}
                    className="w-[80px] h-[80px] rounded-full border-[6px] border-amber-500"
                  />
                </Link>
                <Link
                  href={`/services/${slide.id}`}
                  className="text overflow-hidden lg:self-center"
                >
                  <p className="font-semibold whitespace-nowrap text-ellipsis lg:text-center text-[15px] max-md:text-[14px]">
                    {slide.title}
                  </p>
                  <p className="text-secend_text text-center text-[14px]">
                    {slide?.coast}$
                  </p>
                  <div className="flex-two text-sky-500 w-fit m-auto my-2">
                    <p className="text-black">
                      {slide?.vendor?.number_of_orders}
                    </p>
                    <UserCircle2 width={17} />
                  </div>
                  <div className="rating flex-two absolute bottom-2 left-2">
                    <Star color="gold" />
                    <p>{slide.rating}</p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
