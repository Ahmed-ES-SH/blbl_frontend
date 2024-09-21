import React from "react";
import Navbar from "../_components/_Website/Navbar";
import ServicesBody from "../_components/_Website/ServicesBody";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "بلبل للخدمات - جميع الخدمات",
  description:
    "الرئيسية - صفحة كل الخدمات الرائجة - كل الخدمات المصغرة - تصليح - صيانة -سيارات  - تطوير - مواقع - هواتف ",
};

export default function ServicesPage() {
  return (
    <>
      <div className="w-full overflow-hidden main-bg">
        <Navbar />
        <ServicesBody />
      </div>
    </>
  );
}
