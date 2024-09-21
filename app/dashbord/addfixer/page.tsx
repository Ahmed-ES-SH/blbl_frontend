import Form from "@/app/_components/_Dashbord/Form";
import Image from "next/image";
import React from "react";

export default function page() {
  const inputs = [
    { title: "الإسم", name: "name", type: "text" },
    { title: "البريد الإلكترونى", name: "email", type: "email" },
    { title: "كلمة السر ", name: "password", type: "password" },
    { title: "المهنة", name: "job", type: "text" },
    { title: "رقم الجوال ", name: "phone_number", type: "text" },
    {
      title: "المهارات والخبرات (إختيارى)",
      name: "skills_experiences",
      type: "text",
    },
    { title: "معلومات او وصف عن الفنى (إختيارى)", name: "About", type: "text" },
    {
      title: "سعر بداية الخدمة ",
      name: "start_price",
      type: "number",
    },
    {
      title: "أقصى سعر للخدمة ",
      name: "end_price",
      type: "number",
    },
  ];

  //  ;

  return (
    <>
      <Form
        inputs={inputs}
        api="/storefromdashbord"
        direct="/dashbord/fixers"
        image_or_images={true}
      />
    </>
  );
}
