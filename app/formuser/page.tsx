import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const DynamicSignUpUser = dynamic(
  () => import("../_components/_sign/SignUpUser"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "بلبل للخدمات -  إنشاء حساب مستخدم",
  description: "بلبل للخدمات - إنشاء حساب مستخدم",
};

export default function FormUser() {
  return (
    <>
      <DynamicSignUpUser />
    </>
  );
}
