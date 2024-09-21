"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { User2 } from "lucide-react";
import { allstring } from "@/app/types/dashbordcontenttypes";
import { instance } from "@/app/Api/axios";
import LoadingDashbord from "../LoadingDashbord";
import Callservicecustomer from "./Callservicecustomer";
import { UseVariabels } from "@/app/context/VariabelsContext";
import ForbiddenPage from "./ForbddenPage";

export default function Userbody({ id }: any) {
  const [data, setdata] = useState<allstring | null>(null);
  const [location, setlocation] = useState<allstring>({});

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await instance.get(`user/${id}`);
        const fetchdata = res.data.data;
        setdata(fetchdata);
        if (typeof fetchdata.location == "string") {
          setlocation(JSON.parse(fetchdata.location));
        } else {
          setlocation(fetchdata.location);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getdata();
  }, []);

  return (
    <>
      {data == null ? (
        <LoadingDashbord />
      ) : (
        <div className="flex-between max-lg:flex-col justify-center items-center px-[20px] ">
          <div className="img flex items-center justify-center relative  mx-6 ">
            <Image
              src={data?.image ? data?.image : "/images/userbg.png"}
              alt="user"
              width={1024}
              height={1280}
              className="w-[220px] h-[220px] rounded-full border-[6px] border-secend_color "
            />
          </div>
          <div className="form h-[60vh]  pr-6 lg:border-r border-amber-600 w-1/2 max-lg:w-full flex flex-col items-start justify-center gap-4 ">
            <form className="flex flex-col gap-4 w-full">
              <label>الاسم : </label>
              <div className="flex items-center relative w-full">
                <input
                  readOnly
                  value={data?.name}
                  type="text"
                  className={`  text-right h-[50px] rounded-md w-full   bg-gray-300 border border-gray-200 shadow-md  outline-none pr-11 `}
                />
                <User2 className="text-secend_color absolute mr-2" />
              </div>
              <label> رقم الجوال : </label>
              <input
                className={`h-[50px] rounded-md w-full text-left  bg-gray-300 border border-gray-200 shadow-md  outline-none px-4 placeholder-shown:px-4`}
                type="text"
                value={data?.phone_number}
                readOnly
              />
              <label>الموقع :</label>
              <input
                readOnly
                value={location.address}
                type="text"
                className={`h-[50px] rounded-md w-full  border-none  bg-gray-300   shadow-md  outline-none px-4 placeholder-shown:px-4`}
              />
            </form>
          </div>
        </div>
      )}
      <Callservicecustomer />
    </>
  );
}
