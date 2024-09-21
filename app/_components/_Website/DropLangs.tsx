import { langs } from "@/app/constant/websitecontent";
import Image from "next/image";
import React from "react";

export default function DropLangs() {
  return (
    <>
      <div className="w-[200px] h-fit  py-3 rounded-md  absolute top-20 right-8 z-[999] rouneed-md bg-bglight flex items-center justify-center">
        <div className="w-full">
          {langs.map((lang, index) => (
            <div
              key={index}
              className=" w-[140px] m-auto cursor-pointer duration-150 flex-between py-2 px-4 flex-row-reverse  border-b border-secend_color"
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
    </>
  );
}
