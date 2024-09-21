import HeadTable from "@/app/_components/_Dashbord/HeadTable";
import PaginatedTable from "@/app/_components/_Dashbord/PagenationTable";
import React from "react";

export default function page() {
  const headers: string[] = [
    "id",
    "الصورة",
    "الإسم",
    "البريد الالكترونى",
    "وقت الإنشاء",
  ];
  const keys: string[] = ["id", "image", "name", "email", "created_at"];
  return (
    <>
      <HeadTable
        title="الفنيين"
        linktitle="أضف فنى جديد "
        path="/dashbord/addfixer"
      />
      <PaginatedTable
        keys={keys}
        headers={headers}
        api="/vendors"
        apidelete="/vendors"
      />
    </>
  );
}
