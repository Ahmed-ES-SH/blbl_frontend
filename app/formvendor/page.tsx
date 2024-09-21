import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const DynamicSignUpUser = dynamic(
  () => import("../_components/_sign/SignUpVendor"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "بلبل للخدمات -  إنشاء حساب فنى",
  description: "بلبل للخدمات - إنشاء حساب فنى",
};

export default function FormVendor() {
  return (
    <>
      <DynamicSignUpUser />
    </>
  );
}
