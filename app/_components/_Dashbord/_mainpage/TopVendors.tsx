import React from "react";
import PaginatedTable from "../PagenationTable";

export default function Tobvendors() {
  const headers = [
    "id",
    "صورة التاجر",
    "إسم التاجر",
    "عدد الطلبات",
    "وقت الإنشاء",
  ];
  const keys = ["id", "image", "name", "number_of_orders", "created_at"];
  return (
    <div className="w-[98%] px-4 py-4 mt-4 m-auto dark:bg-secend_dash rounded-md">
      <h1 className="text-xl pb-4 border-b border-gray-300 dark:dark:text-white text-black ">
        أعلى الفنيين طلبا
      </h1>
      <PaginatedTable
        keys={keys}
        headers={headers}
        api="/vendors-by-orders"
        apidelete="/bills-delete"
      />
    </div>
  );
}
