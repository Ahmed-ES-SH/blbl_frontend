import React from "react";
import { arabic } from "@/app/content/AR";
import { Metadata } from "next";
import { getdata } from "@/app/_components/_Website/Getdata";
import Navbar from "@/app/_components/_Website/Navbar";
import VendorBody from "@/app/_components/_Website/VendorBody";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.vendor_id;
  const data = await getdata(`vendors/${id}`);

  return {
    title: data && data.data.name ? data.data.name : "صفحة الفنى",
    description: data ? data.data.description : "وصف صفحة الفنى",
  };
}

export default function VendorpublicPage({ params }: any) {
  const id = params.vendor_id;
  return (
    <>
      <div className="main-bg">
        <Navbar />
        <h1 className="w-fit m-auto text-3xl text-secend_color mt-8 ">
          {arabic.detailesvendor}
        </h1>
        <VendorBody id={id} />
      </div>
    </>
  );
}
