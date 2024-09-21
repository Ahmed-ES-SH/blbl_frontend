import HeadTable from "@/app/_components/_Dashbord/HeadTable";
import PaginatedTable from "@/app/_components/_Dashbord/PagenationTable";
import React from "react";

export default function page() {
  const headers: string[] = [
    "id",
    "الصورة",
    "عنوان الخدمة",
    "الحالة",
    "التقييم",
    "وقت الإنشاء",
  ];
  const keys: string[] = [
    "id",
    "image",
    "title",
    "status",
    "rating",
    "created_at",
  ];
  return (
    <>
      <HeadTable title="الخدمات" linktitle="أضف خدمة جديدة " path="" />
      <PaginatedTable
        keys={keys}
        headers={headers}
        api="/services"
        apidelete="/services"
      />
    </>
  );
}
