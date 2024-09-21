"use client";
import React, { useState } from "react";
import Image from "next/image";
import { arabic } from "@/app/content/AR";
import { instance } from "@/app/Api/axios";
import Cookie from "cookie-universal";
export default function SignAsGuest() {
  const [loading, setloading] = useState(false);
  const cookies = Cookie();
  const handlesign = async () => {
    try {
      setloading(true);
      const res = await instance.post("/registerasguest");
      const fetchdata = res.data.data;
      cookies.set("token", res.data.token);
      if (typeof window !== "undefined") {
        location.pathname = "/";
      }
    } catch (error) {
      setloading(false);
      throw error;
    }
  };

  return (
    <>
      {loading ? (
        <p className="w-fit m-auto text-center">إنشاء حساب ضيف ....</p>
      ) : (
        <div className="flex-two my-2">
          <Image
            src={"/images/userbg.png"}
            alt="VENDOR"
            width={1024}
            height={1280}
            className="w-[30px]"
          />
          <button onClick={handlesign} className="text-xl text-secend_text">
            {arabic.signasgest}
          </button>
        </div>
      )}
    </>
  );
}
