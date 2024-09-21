import Form from "@/app/_components/_Dashbord/Form";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "إضافة عرض جديد",
  description: "لوحة التحكم - صفحةإضافة عرض جديد",
};

export default function AddOffer() {
  const inputs = [
    { title: "النص الرئيسى ", name: "title", type: "text" },
    { title: "الوصف الخاص بالعرض ", name: "description", type: "text" },
    { title: "محتوى إضافى (إختيارى)", name: "extra-content", type: "text" },
    { title: "عدد النجوم (إختيارى )", name: "stars", type: "number" },
    { title: "التقييم (إختيارى )", name: "rating", type: "text" },
  ];
  return (
    <>
      <Form
        inputs={inputs}
        api="/slider/add"
        direct="/dashbord/offers"
        image_or_images={true}
      />
    </>
  );
}
