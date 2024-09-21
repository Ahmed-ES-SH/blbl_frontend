import Form from "@/app/_components/_Dashbord/Form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "إضافة خدمة جديدة",
  description: "لوحة التحكم - صفحةإضافة خدمة جديدة",
};

export default function AddOffer() {
  const inputs = [{ title: "النص الرئيسى ", name: "title", type: "text" }];
  return (
    <>
      <Form
        inputs={inputs}
        api="/service-slider/add"
        direct="/dashbord/servicesslider"
        image_or_images={true}
      />
    </>
  );
}
