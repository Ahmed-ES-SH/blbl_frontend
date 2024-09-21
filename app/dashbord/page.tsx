import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Head from "../_components/_Dashbord/_mainpage/Head";
import BillsTable from "../_components/_Dashbord/_mainpage/BillsTable";
import TopVendors from "../_components/_Dashbord/_mainpage/TopVendors";
import MapComponent from "../_components/Map";
import BillsSummaryTable from "../_components/_Dashbord/_mainpage/BillsSummary";

export const metadata: Metadata = {
  title: "بلبل للخدمات - لوحة التحكم",
  description:
    "بلبل للخدمات - الصفحةا لخاصة بعرض أخر إحصائيات الموقع والأرقام المهمة ",
};

// قم بتحميل المكون بدون التقديم على جانب الخادم
const FirstCanvesSectiondynamic = dynamic(
  () => import("../_components/_Dashbord/_mainpage/FirstCanvesSection"),
  {
    ssr: false,
  }
);
const SecendCanvesSectionndynamic = dynamic(
  () => import("../_components/_Dashbord/_mainpage/SecendCanvesSection"),
  {
    ssr: false,
  }
);

const FourCardsdynamic = dynamic(
  () => import("../_components/_Dashbord/_mainpage/FourCards"),
  {
    ssr: false,
  }
);

export default function Dashbord() {
  return (
    <div className="w-[98%] ml-auto  h-[90vh] overflow-y-auto hidden-scrollbar">
      <Head />
      <FourCardsdynamic />
      <FirstCanvesSectiondynamic />
      <BillsTable />
      <TopVendors />
      <BillsSummaryTable />
      <SecendCanvesSectionndynamic />
      <MapComponent />
    </div>
  );
}
