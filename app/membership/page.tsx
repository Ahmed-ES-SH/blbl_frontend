import React from "react";
import Navbar from "../_components/_Website/Navbar";
import Image from "next/image";
import { arabic } from "../content/AR";
import Link from "next/link";
import { Metadata } from "next";
import SignAsGuest from "../_components/_sign/SignAsGuest";

export const metadata: Metadata = {
  title: "بلبل للخدمات -  اختيار نوع الحساب",
  description: "بلبل للخدمات - اختيار نوع الحساب",
};

export default function Membership() {
  return (
    <>
      <div className=" overflow-hidden bg-gradient-to-b from-main_color to-white w-full   ">
        <Navbar />
        <div className="px-[15px] w-[98%] m-auto h-[90vh] max-lg:h-[110vh] relative ">
          <div className=" w-full  flex-two max-lg:flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={"/logonobg.png"}
              alt="logo"
              width={1024}
              height={1280}
              className="w-[800px] max-lg:w-[350px]"
            />
            <div className="w-1/2 max-lg:w-full max-md:w-full flex flex-col items-center justify-center gap-6">
              <h1 className="text-4xl text-secend_color">
                {arabic.createaccounttext}
              </h1>
              <p className="py-2 text-2xl">{arabic.selecttype}</p>
              <div className="flex items-center justify-center gap-7 lg:w-3/4  w-full  px-4">
                <Link
                  href={"/formuser"}
                  className="w-[300px] h-[300px] max-sm:h-[250px] bg-main_color rounded-md shadow-md flex flex-col items-center justify-center gap-4"
                >
                  <Image
                    src={"/images/user-2.png"}
                    alt="user"
                    width={1024}
                    height={1280}
                    className="w-[180px]"
                  />
                  <p className="text-xl text-white mt-4">
                    {arabic.customertext}
                  </p>
                </Link>
                <Link
                  href={"/formvendor"}
                  className="w-[300px] h-[300px] max-sm:h-[250px] bg-main_color rounded-md shadow-md flex flex-col items-center justify-center gap-4"
                >
                  <Image
                    src={"/images/avatar.png"}
                    alt="VENDOR"
                    width={1024}
                    height={1280}
                    className="w-[180px]"
                  />
                  <p className="text-xl text-white mt-4">{arabic.vendortext}</p>
                </Link>
              </div>
              <SignAsGuest />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
