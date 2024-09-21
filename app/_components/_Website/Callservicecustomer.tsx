import Link from "next/link";
import React from "react";

export default function Callservicecustomer() {
  return (
    <>
      <div className=" flex items-center gap-1  w-fit  m-auto px-2 my-6 text-[20px] max-md:text-[17px]">
        <p className="whitespace-nowrap">إذا واجهت أى مشكلة يمكنك الإتصال </p>
        <Link
          className="text-secend_color underline whitespace-nowrap undeline-secend_color"
          href={"/customerservice"}
        >
          بالدعم الفنى
        </Link>
      </div>
    </>
  );
}
