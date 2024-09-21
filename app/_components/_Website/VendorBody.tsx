"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, User2, ShoppingCart } from "lucide-react";
import { arabic } from "@/app/content/AR";
import { instance } from "@/app/Api/axios";
import { allstring } from "@/app/types/dashbordcontenttypes";
import Stars from "../Stars";
import LoadingDashbord from "../LoadingDashbord";
import Link from "next/link";
import Callservicecustomer from "./Callservicecustomer";

export default function VendorBody({ id }: { id: number }) {
  const [data, setdata] = useState<any>(null);
  const [vendorservices, setvendorservices] = useState<any>([]);
  const [randomservices, setrandomservices] = useState<any>([]);
  const [location, setlocation] = useState<allstring>({});

  useEffect(() => {
    const getdata = async (api: string, set: React.Dispatch<any>) => {
      try {
        const res = await instance.get(api);
        const fetchdata = res.data.data;
        set(fetchdata);
        if (api == `vendors/${id}`) {
          if (typeof fetchdata.location == "string") {
            setlocation(JSON.parse(fetchdata.location));
          } else {
            setlocation(fetchdata.location);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getdata(`vendors/${id}`, setdata);
    getdata(`servicesvendor/${id}`, setvendorservices);
    getdata(`/services-4`, setrandomservices);
  }, [id]);

  return (
    <>
      {data == null ? (
        <LoadingDashbord />
      ) : (
        <div className="flex items-center gap-6 max-lg:flex-col  mt-2">
          <div className="right  w-[30%] max-lg:w-full flex flex-col items-center border-l-2 max-lg:border-transparent border-secend_color px-2">
            <div className="flex items-center justify-center  ">
              <Image
                src={data?.image ? data?.image : "/images/userbg.png"}
                alt="avtar"
                width={1024}
                height={1280}
                className="w-[200px] h-[200px]  rounded-full border-[6px] border-secend_color"
              />
            </div>
            <div className="mt-4 flex items-center justify-center ">
              <Stars
                goldStars={parseInt(Number(data.rating).toFixed(0), 10)}
                grayStars={5 - Math.ceil(Number(data.rating))}
              />
            </div>
            <div className="form pb-2 border-b border-secend_color mt-4 max-lg:mt-4 h-fit hidden-scrollbar overflow-y-auto  w-full  flex flex-col items-center gap-4 ">
              <form className="flex flex-col gap-4 w-full">
                <label>الإسم</label>
                <div className="flex items-center relative">
                  <input
                    readOnly
                    value={data.name}
                    placeholder=" إسم المستخدم"
                    type="text"
                    className={` placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full   bg-disable_color border border-gray-200 shadow-md  outline-none pr-11 `}
                  />
                  <User2 className="text-secend_color absolute mr-2" />
                </div>
                <label>رقم الجوال</label>
                <div className="flex-two">
                  <div className="flex items-center relative w-full">
                    <input
                      readOnly
                      className={`h-[50px] bg-disable_color rounded-md w-[340px] max-md:w-full text-left   border border-gray-200 shadow-md  outline-none px-4 placeholder-shown:px-4`}
                      type="text"
                      placeholder="رقم الجوال"
                      value={data.phone_number}
                      maxLength={10}
                    />
                    <Phone className="text-secend_color absolute mr-2" />
                  </div>
                </div>
                <div className="flex items-center gap-6 w-1/2">
                  <p>الجنس</p>
                  <label className="font-bold">
                    {data.gender == "female" ? "ذكر" : "أنثى"}
                  </label>
                </div>
                <label>الموقع</label>
                <input
                  readOnly
                  value={location.address}
                  type="text"
                  className={`h-[50px] rounded-md w-full  border-none  bg-disable_color   shadow-md  outline-none px-4 placeholder-shown:px-4`}
                />
                <label>الخبرات والمهارات</label>
                <input
                  readOnly
                  placeholder="الخبرات والمهارات"
                  type="text"
                  value={data?.skills_experiences}
                  className={` placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full   bg-disable_color border border-gray-200 shadow-md  outline-none px-4 `}
                />
              </form>
            </div>
            {/* <div className="bg-bglight w-full my-6 px-2 py-1 rounded-md shadow-md">
              <h1 className="text-center text-xl ">
                {arabic.ratingandwhatcastomerssaystext}
              </h1>
              <div className="w-full bg-white border my-4 h-fit shadow-md rounded-md px-4 py-2 flex-between ">
                <div className="flex items-center gap-4">
                  <Image
                    src={"/images/avatar-4.jpg"}
                    alt="image"
                    width={1024}
                    height={1280}
                    className="w-[40px] "
                  />
                  <p className="text-sky-500">علاء</p>
                  <p className="mt-4">عملة رائع للغاية</p>
                </div>
                <div className="flex-two">
                  <Image
                    src={"/images/star.png"}
                    alt="image"
                    width={1024}
                    height={1280}
                    className="w-[20px] "
                  />
                  <p>4.6</p>
                </div>
              </div>

              <div className="addcomment">
                <input
                  type="text"
                  className="w-full p-3 h-[55px] text-secend_text rounded-t-md bg-bglight border shadow-md px-2 py-1 placeholder-shown:px-2 outline-none placeholder-shown:py-1 "
                  placeholder="أضف تقييم "
                />
                <div className="bg-[#ddd] h-[50px] rounded-b-md flex items-end px-2">
                  <input
                    type="submit"
                    value="نشر"
                    className="px-4 py-1 bg-secend_color text-white w-fit mr-auto my-2 "
                  />
                </div>
              </div>
            </div> */}
          </div>
          <div className="left w-full">
            <h1 className="w-fit m-auto text-2xl  my-8 ">
              {arabic.servicesavailabletext}
            </h1>
            <div className="   grid grid-cols-4  max-md:grid-cols-3 max-sm:grid-cols-2 gap-4 px-2 pb-4 border-b-2 border-secend_color w-full">
              {vendorservices.length > 0 ? (
                vendorservices.map((service: allstring, index: number) => (
                  <Link
                    href={`/services/${service?.id}`}
                    key={index}
                    className="w-full h-fit flex flex-col items-start rounded-t-md  border shadow-md"
                  >
                    <Image
                      src={service.image}
                      alt="image"
                      width={1024}
                      height={1280}
                      className="w-full h-[200px] rounded-t-md"
                    />
                    <div className="content w-full px-2 mt-1">
                      <h1 className="text-[18px] text-secend_color">
                        {service.title}
                      </h1>
                      <p className="text-[14px] text-secend_text">
                        {service.description}
                      </p>
                      <div className="flex-two w-fit mr-auto py-2 text-[15px] text-secend_text">
                        <p>{service.coast}$</p>
                        <ShoppingCart width={16} />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <h1 className="h-[10vh] text-center text-[20px] whitespace-nowrap w-fit m-auto">
                  لا يوجد خدمات متوفرة حتى الأن
                </h1>
              )}
            </div>
            <h1 className="w-fit m-auto text-2xl  my-8 ">
              {arabic.recommedndedsercicestext}
            </h1>
            <div className=" mt-6 pb-6 border-b-2 border-secend_color  grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4 px-2  w-full">
              {randomservices.length > 2 ? (
                randomservices.map((service: any, index: number) => (
                  <div
                    key={index}
                    className="w-full h-fit flex flex-col items-center rounded-t-md  border shadow-md  "
                  >
                    <Link
                      href={`/vendorpublicpage/${service?.vendor?.id}`}
                      className="w-full h-[150px] flex items-center justify-center py-2 bg-[#ddd]"
                    >
                      <Image
                        src={service.image}
                        alt="image"
                        width={1024}
                        height={1280}
                        className="w-[100px] h-[100px]  border-[6px] border-secend_color rounded-full"
                      />
                    </Link>
                    <Link
                      href={`/services/${service.id}`}
                      className="content w-full px-2 mt-1"
                    >
                      <h1 className="text-[18px] text-secend_color">
                        {service.title}
                      </h1>
                      <p className="text-[14px] text-secend_text">
                        {service?.description}
                      </p>
                      <div className="flex-two w-fit mr-auto py-2 text-[15px] text-secend_text">
                        <p>{service.coast}$</p>
                        <ShoppingCart width={16} />
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <h1 className="h-[10vh] text-center text-[20px] whitespace-nowrap w-fit m-auto">
                  لا يوجد خدمات فنيين لاقتراحها حد الأن
                </h1>
              )}
            </div>
            <div className="keywords">
              <h1 className="w-fit m-auto text-2xl mt-6 mb-2 ">
                {arabic.keywordstext}
              </h1>
              <ul className="flex items-center gap-3 mb-2 text-[18px] w-fit m-auto text-secend_color">
                {vendorservices &&
                  vendorservices[0] &&
                  vendorservices[0].key_words &&
                  vendorservices[0].key_words.map(
                    (word: string, index: number) => (
                      <li className=" underline  cursor-pointer" key={index}>
                        {word}
                      </li>
                    )
                  )}
              </ul>
            </div>
          </div>
        </div>
      )}
      <Callservicecustomer />
    </>
  );
}
