"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { allstring } from "@/app/types/dashbordcontenttypes";
import { instance } from "@/app/Api/axios";
import LoadingDashbord from "../LoadingDashbord";
import StartConversationLink from "./StartConversationLink";

export default function RandomServices() {
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
      <h1 className="py-4 w-full relative container-x text-3xl">
        بعض الخدمات العشوائية{" "}
      </h1>
      {data == null ? (
        <LoadingDashbord />
      ) : data.length > 0 ? (
        <div className=" px-2 grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1   gap-4 justify-items-center mt-4">
          {data.map((service: allstring, index: number) => {
            const vendor: any = service.vendor;
            return (
              <div
                key={index}
                className="relative w-full h-[240px]  max-lg:h-fit shadow-lg  bg-bglight px-4 py-2"
              >
                <div className=" flex items-center gap-2  lg:flex-col rounded-md ">
                  <Link
                    href={`/vendorpublicpage/${service?.vendor_id}`}
                    className="text  lg:self-center "
                  >
                    <Image
                      src={vendor?.image}
                      alt="alt-image"
                      width={1024}
                      height={1280}
                      className="w-[80px] h-[80px] rounded-full border-[6px] border-amber-500 "
                    />
                  </Link>

                  <Link href={`/services/${service?.id}`}>
                    <p className="font-semibold  lg:text-center pt-2 text-[20px] max-md:text-[17px]">
                      {service.title}
                    </p>
                    <p className="text-secend_text my-2">
                      تكلفة الخدمة : {service.coast}$
                    </p>
                  </Link>
                </div>
                <div className=" pt-4 max-lg:pt-2   flex-row-reverse  flex items-center justify-between w-full">
                  <div className="rating flex-two ">
                    <Star color="gold" />
                    <p>{service.rating}</p>
                  </div>
                  <div className="chat w-full relative z-[999999] cursor-pointer ">
                    <StartConversationLink
                      secendparty_id={service.vendor_id}
                      secendparty_type={"vendor"}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-[50vh] gap-3 flex flex-col items-center justify-center">
          <h1>لم يتم إضافة أى خدمات حتى الأن</h1>
          <Image
            src={"/images/empty.svg"}
            alt="image"
            width={1024}
            height={1280}
            className="w-[300px]"
          />
        </div>
      )}
    </>
  );
}
