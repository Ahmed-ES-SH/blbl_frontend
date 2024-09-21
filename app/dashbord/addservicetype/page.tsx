import Form from "@/app/_components/_Dashbord/Form";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: " إضافة قسم جديد ",
  description: "لوحة التحكم - صفحة إضافة قسم جديد",
};

export default function page() {
  const inputs = [{ title: "العنوان", name: "title", type: "text" }];
  return (
    <>
      <Form
        inputs={inputs}
        api="/service-type/add"
        direct="/dashbord/servicestypes"
        image_or_images={true}
      />
    </>
  );
}
