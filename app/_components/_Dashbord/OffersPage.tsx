"use client";
import { instance } from "@/app/Api/axios";
import { allstring } from "@/app/types/dashbordcontenttypes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingDashbord from "../LoadingDashbord";

export default function OffersPage() {
  const [offers, setoffers] = useState<any>(null);
  const [refresh, setrefresh] = useState<boolean>(false);

  useEffect(() => {
    const getdata = async () => {
      const res = await instance
        .get("/sliders")
        .then((res) => setoffers(res.data.data));
    };
    getdata();
  }, []);

  const handledelete = async (id: any) => {
    try {
      const res = instance.delete(`/slider/${id}`);
      setoffers((offers: allstring[]) =>
        offers.filter((offer: allstring) => offer.id !== id)
      );
      setrefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(offers);
  return (
    <div className="h-[75vh] bg-main_color dark:bg-transparent rounded-md hidden-scrollbar overflow-y-auto w-full flex items-start justify-center">
      {offers == null ? (
        <LoadingDashbord />
      ) : offers.length > 0 ? (
        <div className="mt-8  overflow-y-auto  w-full px-4  flex flex-col items-start gap-4">
          {offers.map((offer: allstring, index: number) => (
            <div
              key={index}
              className="w-full relative group pl-2  overflow-hidden max-md:flex-col-reverse max-md:gap-4 max-md:items-start flex items-center justify-between rounded-md bg-secend_color dark:bg-secend_dash border shadow-md text-white dark:text-secend_color"
            >
              <div className="content px-4 ">
                <div className="flex items-center max-md:flex-col max-md:items-start gap-2 ">
                  <label className="my-1">العنوان الرئيسى :</label>
                  <h1 className="my-1 py-2">{offer.title}</h1>
                </div>
                <div className="flex items-center max-md:flex-col max-md:items-start gap-2 ">
                  <label className="my-1">وصف العرض :</label>
                  <p className="py-2 my-1 ">{offer.description}</p>
                </div>
                <div className="flex items-center max-md:flex-col max-md:items-start gap-2 ">
                  <label className="my-1"> محتوى إضافى :</label>
                  <p className="py-2 my-1 ">
                    {offer["extra-content"] && offer["extra-content"]}
                  </p>
                </div>

                <div className="flex gap-4 items-center justify-between my-2 w-3/4 max-md:w-full">
                  <div className="flex gap-2 items-center">
                    <label className="whitespace-nowrap">التقييم:</label>
                    <p>{offer.rating}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="whitespace-nowrap">عدد النجوم:</label>
                    <p>{offer.stars}</p>
                  </div>
                </div>
              </div>
              <div className="image w-[20%] max-md:w-full h-full">
                <Image
                  src={offer.image}
                  width={1024}
                  height={1280}
                  alt={offer.title}
                  className="w-full  "
                />
                <p
                  onClick={() => handledelete(offer.id)}
                  className="px-3 py-1 w-fit invisible group-hover:visible group-hover:top-4 absolute -top-20 left-1/2 -translate-x-1/2 hover:text-white bg-red-400 text-white rounded-md shadow-md cursor-pointer hover:bg-red-500 duration-300 "
                >
                  حذف <span className="px-2">x</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[50vh] gap-3 flex flex-col items-center justify-center">
          <h1>لا يوجد عروض حتى الأن</h1>
          <Image
            src={"/images/empty.svg"}
            alt="image"
            width={1024}
            height={1280}
            className="w-[300px]"
          />
        </div>
      )}
    </div>
  );
}
