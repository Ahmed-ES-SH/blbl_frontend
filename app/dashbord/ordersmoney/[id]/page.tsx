import OrderMoney from "@/app/_components/_Dashbord/OrderMoney";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "تعديل بيانات الخدمة ",
  description: "لوحة التحكم - الصفحة الخاصة بتعديل بيانات الخدمة",
};

export default function Ordermoney() {
  return (
    <>
      <div className="w-full">
        <OrderMoney />
      </div>
    </>
  );
}
