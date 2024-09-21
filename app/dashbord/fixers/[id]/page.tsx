import { Metadata } from "next";
import React from "react";
import DynamicPage from "../../../_components/_Dashbord/DynamicPage";

export const metadata: Metadata = {
  title: "تعديل بيانات الفنى ",
  description: "لوحة التحكم - الصفحة الخاصة بتعديل بيانات الفنى ",
};

export default function EditVendorPage() {
  const inputs: {
    [key: string]: string;
  }[] = [
    { name: "name", label: "الاسم :", type: "text" },
    { name: "gender", label: " الجنس :", type: "text" },
    { name: "job", label: " الوظيفة :", type: "text" },
    { name: "location", label: " الموقع :", type: "text" },
    { name: "phone_number", label: " رقم الجوال  :", type: "text" },
    { name: "image", type: "file" },
  ];
  return (
    <>
      <div>
        <DynamicPage
          imgsrc=""
          inputs={inputs}
          api="/vendors"
          direct="/dashbord/fixers"
        />
      </div>
    </>
  );
}
