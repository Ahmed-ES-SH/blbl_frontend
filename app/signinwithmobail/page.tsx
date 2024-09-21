import React from "react";
import Navbar from "../_components/_Website/Navbar";
import { Metadata } from "next";
import PhoneInputCheck from "../_components/PhoneInputCheck";

export const metadata: Metadata = {
  title: "بلبل للخدمات  - التسجيل عن طريق رقم الهاتف ",
  description:
    "متجر بلبل للخدمات الرائجة المصغرة - صفحة تسجيل الدخول عن طريق الهاتف",
};

export default function SignWithMobail() {
  return (
    <>
      <div className="bg-gradient-to-b from-main_color to-white w-full max-lg:h-fit h-screen  ">
        <Navbar />
        <PhoneInputCheck />
      </div>
    </>
  );
}
