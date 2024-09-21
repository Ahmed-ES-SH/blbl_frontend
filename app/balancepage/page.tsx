import React from "react";
import Navbar from "../_components/_Website/Navbar";
import BalanceBody from "../_components/_Website/BalanceBody";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "بلبل للخدمات - صفحة معلومات الرصيد",
  description:
    "بلبل للخدمات الرائجة و المصغرة - الصفحة الخاصة بالطلبات الخاصة بالحساب + العنوانين المحفوطة + الرصيد الخاص بالحساب",
};

export default function BalancePage() {
  return (
    <>
      <div className="main-bg  w-full relative ">
        <Navbar />
        <div className="w-full h-[90vh] flex items-center justify-center">
          <BalanceBody />
        </div>
      </div>
    </>
  );
}
