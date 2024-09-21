"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SuccessPage = () => {
  const [transactionId, settransactionId] = useState("");

  useEffect(() => {
    const search = location.search;
    settransactionId(search.split("=")[1]);
  }, []);
  return (
    <div className="container h-screen w-full gap-4 flex max-lg:flex-col  items-center justify-center px-4 py-8">
      <div className="content w-fit h-full flex flex-col items-center justify-center m-auto">
        <Image
          src={"/images/error.svg"}
          alt="done"
          width={1024}
          height={1280}
          className="w-[500px] max-md:w-[240px]"
        />
        <h1 className="text-3xl font-bold text-red-600">خطأ فى عملية الدفع!</h1>
        <p className="mt-4 text-lg">
          الرجاء التأكد من البيانات والمحاولة مرة أخرى
        </p>
        <Link
          href={"/"}
          className="px-4 py-2 bg-secend_color rounded-md shadow-md mt-6 text-white text-center "
        >
          العودة الى الصفحة الرئيسية
        </Link>
      </div>
      <Image
        src={"/logonobg.png"}
        alt="logo"
        width={1024}
        height={1280}
        className="w-[500px] max-md:w-[90%]"
      />
    </div>
  );
};

export default SuccessPage;
