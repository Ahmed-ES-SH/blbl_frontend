import UserSendBody from "@/app/_components/_Dashbord/UserSendBody";
import VendorSendBody from "@/app/_components/_Dashbord/VendorSendBody";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "صفحة الإشعارات ",
  description: "لوحة التحكم - صفحة إدارة الإشعارات إلى المستخدمين والفنيين",
};

export default function NotifactionsPage() {
  return (
    <>
      <main>
        <div className="parent mt-6 w-full h-[80vh] overflow-y-auto hidden-scrollbar px-4 py-2  dark:bg-secend_dash dark:text-white rounded-md">
          <UserSendBody />
          <VendorSendBody />
        </div>
      </main>
    </>
  );
}
