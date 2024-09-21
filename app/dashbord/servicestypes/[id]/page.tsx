import { Metadata } from "next";
import React from "react";
import DynamicPage from "../../../_components/_Dashbord/DynamicPage";

export const metadata: Metadata = {
  title: "تعديل بيانات قسم ",
  description: "لوحة التحكم - الصفحة الخاصة بتعديل قسم الخدمة",
};

export default function ServiceTypeEditPage() {
  const inputs: {
    [key: string]: string;
  }[] = [
    { name: "title", label: "العنوان :", type: "text" },
    { name: "image", type: "file" },
  ];
  return (
    <>
      <div>
        <DynamicPage
          imgsrc=""
          inputs={inputs}
          api="/service-type"
          direct="/dashbord/servicestypes"
        />
      </div>
    </>
  );
}
