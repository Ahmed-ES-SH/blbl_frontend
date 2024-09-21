import PaginatedTable from "@/app/_components/_Dashbord/PagenationTable";
import React from "react";

export default function ServiceCustomer() {
  const headers = [
    "id",
    "صورة المستخدم",
    "إسم المتسخدم",
    "الرسالة",
    "حالة الرسالة",
    "وقت الإرسال",
  ];
  const headersvendor = [
    "id",
    "صورة الفنى",
    "إسم الفنى",
    "الرسالة",
    "حالة الرسالة",
    "وقت الإرسال",
  ];
  const keys = [
    "id",
    "user.image",
    "user.name",
    "message",
    "message_status",
    "created_at",
  ];
  const keysvendor = [
    "id",
    "vendor",
    "vendor.name",
    "message",
    "message_status",
    "created_at",
  ];
  return (
    <div className="w-[98%] h-[90vh] hidden-scrollbar overflow-y-auto px-4 py-4 mt-4 m-auto dark:bg-secend_dash rounded-md">
      <div className="w-full">
        <h1 className="text-xl pb-4 border-b border-gray-300 dark:dark:text-white text-black ">
          أخر استفسارات مستخدمين الموقع
        </h1>
        <PaginatedTable
          keys={keys}
          headers={headers}
          api="/messagescustomer"
          apidelete="/messagecustomer"
        />
      </div>
      <div className="w-full mt-4">
        <h1 className="text-xl pb-4 border-b border-gray-300 dark:dark:text-white text-black ">
          أخر استفسارات فنيين الموقع
        </h1>
        <PaginatedTable
          keys={keysvendor}
          headers={headersvendor}
          api="/messagesvendor"
          apidelete="/messagevendor"
        />
      </div>
    </div>
  );
}
