import Form from "@/app/_components/_Dashbord/Form";
import React from "react";

export default function page() {
  const inputs = [
    { title: "الإسم", name: "name", type: "text" },
    { title: "البريد الإلكترونى", name: "email", type: "email" },
    { title: "كلمة السر ", name: "password", type: "password" },
    { title: " رقم الجوال ", name: "phone_number", type: "tel" },
  ];
  return (
    <>
      <Form
        inputs={inputs}
        api="/registerfromdashbord"
        direct="/dashbord/users"
        image_or_images={true}
      />
    </>
  );
}
