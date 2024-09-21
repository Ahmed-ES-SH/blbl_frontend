"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../_components/_Website/Navbar";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { allstring } from "../types/dashbordcontenttypes";
import { instance } from "../Api/axios";
import LoadingDashbord from "../_components/LoadingDashbord";

export default function OrdersPage() {
  const [data, setdata] = useState<allstring[] | null>(null);

  useEffect(() => {
    const getdata = async () => {
      const cacheKey = "servicesrandom-data";
      const cacheTimeKey = `${cacheKey}-time`;
      const cacheTime = localStorage.getItem(cacheTimeKey);
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData && cacheTime) {
        const now = new Date().getTime();
        const elapsedTime = now - parseInt(cacheTime, 10);

        // إذا لم يمر أكثر من 30 دقيقة، نستخدم البيانات المخزنة
        if (elapsedTime < 2 * 60 * 1000) {
          setdata(JSON.parse(cachedData));
          return;
        } else {
          // إذا مر أكثر من 30 دقيقة، نقوم بحذف البيانات المخزنة
          localStorage.removeItem(cacheKey);
          localStorage.removeItem(cacheTimeKey);
        }
      }

      try {
        const res = await instance.get("/servicesrandom");
        setdata(res.data.data);

        // تخزين البيانات في localStorage
        localStorage.setItem(cacheKey, JSON.stringify(res.data.data));
        localStorage.setItem(cacheTimeKey, new Date().getTime().toString());
      } catch (error) {
        setdata([]);
        console.log(error);
      }
    };

    getdata();
  }, []);
  return (
    <>
      <div className="w-full  overflow-hidden main-bg">
        <Navbar />
        <div className="main-page relative mt-16 lg:px-8">
          <div className=" relative px-3 ">
            <h1 className="text-3xl">إدارة الطلبات</h1>
            <p className="text-2xl text-secend_color my-6 mr-16">
              الطلبات السابقة
            </p>
          </div>
          <div className=" px-2 grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1   gap-4 justify-items-center mt-8">
            {data !== null ? (
              data.map((service: any, index) => (
                <div
                  className="relative w-full h-[220px]  max-md:h-[110px] shadow-lg  bg-bglight px-4 py-2 flex-two  lg:flex-col rounded-md "
                  key={index}
                >
                  <Image
                    src={service?.vendor?.image}
                    alt="alt-image"
                    width={1024}
                    height={1280}
                    className="w-[80px] h-[80px] rounded-full border-[6px] border-secend_color "
                  />

                  <div className="text  lg:self-center ">
                    <p className="font-semibold lg:text-center text-[20px] max-md:text-[17px]">
                      {service.title}
                    </p>
                    <p className="text-secend_text">
                      تكلفة الخدمة : {service.coast}
                    </p>
                  </div>
                  <div className="rating flex-two absolute bottom-2 left-2">
                    <Star color="gold" />
                    <p>{service.rating}</p>
                  </div>
                  <div className="chat cursor-pointer flex-two absolute   left-[85%]  top-[85%]   max-lg:top-2 max-lg:left-2">
                    <Image
                      src={"/images/chat.png"}
                      alt="alt"
                      width={1024}
                      height={1280}
                      className="w-[20px]  self-start"
                    />
                  </div>
                </div>
              ))
            ) : (
              <LoadingDashbord />
            )}
          </div>
          <div className="pagenation-group text-[30px] text-secend_color w-fit my-2 px-3 py-1 mr-auto flex items-center justify-between">
            <ChevronRight />
            <div className="numbers bg-secend_color/50 text-[14px] text-black px-2 py-1 rounded-md flex items-center gap-1">
              <p>1,</p>
              <p>2,</p>
              <p>3,</p>
              <p>...</p>
            </div>
            <ChevronLeft />
          </div>
        </div>
      </div>
    </>
  );
}
