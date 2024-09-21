import Callservicecustomer from "@/app/_components/_Website/Callservicecustomer";
import { getdata } from "@/app/_components/_Website/Getdata";
import Navbar from "@/app/_components/_Website/Navbar";
import UserPrivateBody from "@/app/_components/_Website/UserPrivateBody";
import { arabic } from "@/app/content/AR";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { userid: string };
}): Promise<Metadata> {
  const id = params.userid;
  const data = await getdata(`user/${id}`);

  return {
    title: data && data.data.name ? data.data.name : "صفحة المستخدم",
    description: data ? data.data.description : "وصف صفحة المستخدم",
  };
}

export default function UserPrivatePage({
  params,
}: {
  params: { userid: string };
}) {
  const id = params.userid;

  return (
    <div className="main-bg h-screen w-full">
      <UserPrivateBody id={id} />
    </div>
  );
}
