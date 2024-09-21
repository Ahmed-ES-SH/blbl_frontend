import HeadTable from "@/app/_components/_Dashbord/HeadTable";
import OffersPage from "@/app/_components/_Dashbord/OffersPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "قسم العروض",
  description: "لوحة التحكم - قسم العروض",
};

export default function Offerspage() {
  return (
    <>
      <HeadTable
        title="العروض"
        linktitle="أضف عرض جديد "
        path="/dashbord/offerplus"
      />
      <OffersPage />
    </>
  );
}
