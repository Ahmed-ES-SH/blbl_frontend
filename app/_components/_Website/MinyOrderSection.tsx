"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { allstring } from "@/app/types/dashbordcontenttypes";
import { instance } from "@/app/Api/axios";
import LoadingDashbord from "../LoadingDashbord";

export default function MinyOrderSection() {
  const [data, setdata] = useState<allstring[] | null>(null);

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await instance.get("/lastorders");
        setdata(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getdata();
  }, []);

  return (
    <>
      <div className="container-x ">
        <div className="flex gap-2 max-md:flex-col items-center">
          <h1 className="py-8 whitespace-nowrap w-full text-3xl">
            بعض طلبات المستخدمين{" "}
          </h1>
          <Link
            className="px-4 text-[16px] max-md:self-end whitespace-nowrap text-sky-500"
            href={"/search"}
          >
            (كل الطلبات)
          </Link>
        </div>
        {data == null ? (
          <LoadingDashbord />
        ) : (
          <div>
            {data.length > 0 ? (
              data.map((order: any, index: number) => (
                <div
                  className="px-4 py-2 my-2 bg-bglight  h-fit flex items-center gap-4 border rounded-md shadow-md"
                  key={index}
                >
                  <Link
                    href={`${
                      order.sender_type == "user"
                        ? "userpublicpage"
                        : "vendorpublicpage"
                    }/${order?.sender?.id}`}
                  >
                    <Image
                      src={order?.sender?.image || "/images/userbg.png"}
                      alt="image"
                      width={1024}
                      height={1280}
                      className="w-[75px] h-[75px] rounded-full"
                    />
                  </Link>
                  <Link href={`orders/${order?.id}`}>
                    <p className="text-2xl max-md:text-[22px] w-full max-sm:text-[18px] text-secend_text">
                      {order.title}
                    </p>
                  </Link>
                </div>
              ))
            ) : (
              <div className="w-full h-[50vh] gap-3 flex flex-col items-center justify-center">
                <h1>لا يوجد طلبات جديدة حتى الأن</h1>
                <Image
                  src={"/images/empty.svg"}
                  alt="image"
                  width={1024}
                  height={1280}
                  className="w-[300px]"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
