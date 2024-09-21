import { getdata } from "@/app/_components/_Website/Getdata";
import Navbar from "@/app/_components/_Website/Navbar";
import ServiceBody from "@/app/_components/_Website/ServiceBody";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.serviceid;
  const data = await getdata(`services/${id}`);

  return {
    title: data ? data.data.title : "صفحة الخدمة",
    description: data ? data.data.description : "وصف الخدمة",
  };
}

export default async function page(params: any) {
  const id = params.params.serviceid;

  return (
    <>
      <div className="w-full main-bg ">
        <Navbar />
        <ServiceBody id={id} />
      </div>
    </>
  );
}
