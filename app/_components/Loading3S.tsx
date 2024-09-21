import Image from "next/image";
import React from "react";
import { Metadata } from "next";
import { arabic } from "../content/AR";

export const metadata: Metadata = {
  title: "Loading",
};

export default function loading() {
  return (
    <div>
      <div className="flex-center bg-gradient-to-t from-main_color to-white h-screen">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/logonobg.png"}
            alt="logo"
            width={1024}
            height={1280}
            className="w-[500px]"
          />
          <div className="content text-center">
            <p className="text-[18px] ">{arabic.loadingtext}</p>
            <p className="text-[20px] font-bold"> {arabic.welcometext}</p>
          </div>
          <div className="relative  w-[10%] ">
            <span className="loader absolute "></span>
          </div>
        </div>
      </div>
    </div>
  );
}
