import React from "react";
import PaginatedTable from "../PagenationTable";

export default function BillsSummaryTable() {
  const headers = ["id", "صورة المستخدم", "إسم المستخدم", "مجمل الصرف"];
  const keys = ["user.id", "user.image", "user.name", "total_amount"];
  return (
    <div className="w-[98%] px-4 py-4 mt-4 m-auto dark:bg-secend_dash rounded-md">
      <h1 className="text-xl pb-4 border-b border-gray-300 dark:dark:text-white text-black ">
        أعلى المستخدمين إنفاقا
      </h1>
      <PaginatedTable
        keys={keys}
        headers={headers}
        api="/bills-summary"
        apidelete="/"
      />
    </div>
  );
}
