import { Metadata } from "next";
import React from "react";
import DynamicPage from "../../../_components/_Dashbord/DynamicPage";

export const metadata: Metadata = {
  title: "تعديل بيانات مستخدم ",
  description: "لوحة التحكم - الصفحة الخاصة بتعديل بيانات مستخدم ",
};

export default function EditUserPage() {
  const inputs: {
    [key: string]: string;
  }[] = [
    { name: "name", label: "الاسم :", type: "text" },
    { name: "email", label: "البريد الالكترونى :", type: "email" },
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
          api="/user"
          direct="/dashbord/users"
        />
      </div>
    </>
  );
}
