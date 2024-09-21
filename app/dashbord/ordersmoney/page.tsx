import HeadTable from "@/app/_components/_Dashbord/HeadTable";
import PaginatedTable from "@/app/_components/_Dashbord/PagenationTable";
import React from "react";

export default function page() {
  const headers = [
    "id",
    "الصورة",
    "المبلغ",
    "البريد الإلكترونى paypal ",
    "رصيد التاجر",
    "حالة الطلب",
    "وقت الطلب",
  ];
  const keys = [
    "id",
    "vendor",
    "amount",
    "paypalaccount",
    "balance",
    "order_status",
    "created_at",
  ];
  return (
    <>
      <HeadTable title="طلبات السحب" linktitle="" path="/" />
      <PaginatedTable
        keys={keys}
        headers={headers}
        api="/ordersmoney"
        apidelete="/ordersmoney-delete"
      />
    </>
  );
}
