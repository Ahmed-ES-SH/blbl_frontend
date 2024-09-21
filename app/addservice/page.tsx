import React from "react";
import Navbar from "../_components/_Website/Navbar";
import { Metadata } from "next";
import AddService from "../_components/_Website/AddService";

export const metadata: Metadata = {
  title: "بلبل للخدمات - صفحة إضافة خدمة جديدة ",
  description: " بلبل للخدمات  - صفحة إضافة خدمة جديدة",
};

export default function page() {
  return (
    <>
      <div className="main-bg ">
        <Navbar />
        <AddService />
      </div>
    </>
  );
}
