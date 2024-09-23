"use client";
import { langs } from "@/app/constant/websitecontent";
import Image from "next/image";
import React, { useState } from "react";

export default function DropLangs() {
  const [showPopup, setShowPopup] = useState(false);

  const handleLangClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="w-[200px] h-fit py-3  absolute top-20 right-8 z-[999] rounded-md bg-bglight flex items-center justify-center">
        <div className="w-full">
          {langs.map((lang, index) => (
            <div
              key={index}
              onClick={handleLangClick}
              className="w-[140px] m-auto cursor-pointer duration-150 flex-between py-2 px-4 flex-row-reverse border-b border-secend_color"
            >
              <Image
                src={lang.imgsrc}
                alt={lang.text}
                width={1024}
                height={1280}
                className="w-[25px] h-[25px]"
              />
              <p className="text-secend_color text-[15px]">{lang.text}</p>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold">معلومات</h2>
            <p>
              اللغة لا تزال في مرحلة التطوير، وستتم إضافتها إلى الموقع في القريب
              العاجل.
            </p>
            <button
              onClick={handleClosePopup}
              className="mt-4 px-4 py-2 bg-secend_color text-white rounded-md"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
}
