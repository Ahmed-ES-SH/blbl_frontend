import { Metadata } from "next";
import React from "react";
import OrderPage from "../../../_components/_Dashbord/OrderPage";

export const metadata: Metadata = {
  title: "تعديل بيانات الخدمة ",
  description: "لوحة التحكم - الصفحة الخاصة بتعديل بيانات الخدمة",
};

export default function ServiceEditPage() {
  return (
    <>
      <div className="w-full">
        <OrderPage />
      </div>
    </>
  );
}
