import React from "react";
import Navbar from "../_components/_Website/Navbar";
import UserordersBody from "../_components/_Website/UserordersBody";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " بلبل للخدمات - صفحة إدارة الطلبات  ",
  description: "بلبل للخدمات - صفحة إدارة الطلبات  ",
};

export default function UserOrdersPage() {
  return (
    <>
      <div className="w-full  overflow-hidden main-bg">
        <Navbar />
        <UserordersBody />
      </div>
    </>
  );
}
