import React from "react";
import Navbar from "../_components/_Website/Navbar";
import { Metadata } from "next";
import PhoneInputCheck from "../_components/PhoneInputCheck";
import QuikAccess from "../_components/QuikAccess";

export const metadata: Metadata = {
  title: "بلبل للخدمات  - التسجيل  بشكل سريع ",
  description:
    "متجر بلبل للخدمات الرائجة المصغرة - صفحة تسجيل الدخول بشكل سريع  ",
};

export default function SignWithMobail() {
  return (
    <>
      <div className="bg-gradient-to-b from-main_color to-white w-full max-lg:h-fit h-screen  ">
        <Navbar />
        <QuikAccess />
      </div>
    </>
  );
}
