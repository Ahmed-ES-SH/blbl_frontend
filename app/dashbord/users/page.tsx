import HeadTable from "@/app/_components/_Dashbord/HeadTable";
import PaginatedTable from "@/app/_components/_Dashbord/PagenationTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "UsersPage",
  description:
    "الصفحة الخاصة بعرض جدول خاص بكل المستخدمين الموجودين فى الموقع ",
};

export default function Users() {
  const headers = [
    "id",
    "الصورة",
    "الإسم",
    "البريد الإلكترونى ",
    "نوع الحساب",
    "وقت الإنشاء",
  ];
  const keys = ["id", "image", "name", "email", "role", "created_at"];
  return (
    <>
      <HeadTable
        title="المستخدمين"
        linktitle="أضف مستخدم جديد "
        path="/dashbord/adduser"
      />
      <PaginatedTable
        keys={keys}
        headers={headers}
        api="/users"
        apidelete="/users"
      />
    </>
  );
}
