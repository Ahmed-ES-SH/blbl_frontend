import { getdata } from "@/app/_components/_Website/Getdata";
import Navbar from "@/app/_components/_Website/Navbar";
import OrderBody from "@/app/_components/_Website/OrderBody";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.orderid;
  const data = await getdata(`/order/${id}`);

  return {
    title: data ? data.title : "صفحة الطلب",
    description: data ? data.description : "وصف الطلب",
  };
}

export default async function OrderPage({ params }: any) {
  const id: any = params.orderid;
  return (
    <>
      <div className="w-full main-bg ">
        <Navbar />
        <OrderBody order_id={id} />
      </div>
    </>
  );
}
