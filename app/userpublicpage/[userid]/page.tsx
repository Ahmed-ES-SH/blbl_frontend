import React from "react";
import { Metadata } from "next";
import { getdata } from "@/app/_components/_Website/Getdata";
import { arabic } from "@/app/content/AR";
import Navbar from "@/app/_components/_Website/Navbar";
import Userbody from "@/app/_components/_Website/Userbody";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.userid;
  const data = await getdata(`user/${id}`);

  return {
    title: data && data.data.name ? data.data.name : "صفحة المستخدم",
    description: data ? data.data.description : "وصف صفحة المستخدم",
  };
}

export default function USerPublicPage({ params }: any) {
  // get id
  const id: any = params.userid;

  return (
    <div className="main-bg h-screen w-full">
      <Navbar />
      <div className=" w-full  relative mt-16 ">
        <h1 className="text-4xl my-6 text-secend_color w-fit m-auto">
          {arabic.personaldetails}
        </h1>
        <Userbody id={id} />
      </div>
    </div>
  );
}
