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
    <div className="container mt-[30px] h-screen w-full gap-4 flex max-lg:flex-col  items-center justify-center px-4 py-8">
      <Image
        src={"/logonobg.png"}
        alt="logo"
        width={1024}
        height={1280}
        className="w-[500px] max-md:w-[90%]"
      />
      <div className="content w-fit h-full flex flex-col items-center justify-center m-auto">
        <Image
          src={"/images/done.svg"}
          alt="done"
          width={1024}
          height={1280}
          className="w-[500px] mt-6 max-md:w-[90%]"
        />
        <h1 className="text-3xl font-bold text-green-600">
          تمت عملية الدفع بنجاح !
        </h1>
        <p className="mt-4 text-lg">
          الكود الخاص بعملية الدفع : {transactionId}
        </p>
        <Link
          href={"/"}
          className="px-4 py-2 bg-secend_color rounded-md shadow-md mt-6 text-white text-center "
        >
          العودة الى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
