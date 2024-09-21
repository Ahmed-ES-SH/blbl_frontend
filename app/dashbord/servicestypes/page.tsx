import HeadTable from "@/app/_components/_Dashbord/HeadTable";
import PaginatedTable from "@/app/_components/_Dashbord/PagenationTable";
import React from "react";

export default function page() {
  const headers: string[] = ["المعرف", "الصورة", "العنوان", "وقت الإنشاء"];
  const keys: string[] = ["id", "image", "title", "created_at"];
  return (
    <>
      <HeadTable
        title="أقسام الخدمات"
        linktitle="أضف قسم جديد "
        path="/dashbord/addservicetype"
      />
      <PaginatedTable
        keys={keys}
        headers={headers}
        api="/servicestypes"
        apidelete="/service-type"
      />
    </>
  );
}
