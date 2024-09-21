import React from "react";
import Navbar from "../_components/_Website/Navbar";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const DynamicAddressesBody = dynamic(
  () => import("../_components/_Website/AddressesBody"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "بلبل للخدمات - صفحة العناوين",
  description: "بلبل للخدمات - صفحة العناوين",
};

export default function page() {
  return (
    <>
      <div className="main-bg h-screen w-full relative ">
        <Navbar />
        <DynamicAddressesBody />
      </div>
    </>
  );
}
