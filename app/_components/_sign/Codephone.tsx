"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { codephonecontent } from "@/app/constant/websitecontent";
export default function Codephone({ setcodeacitve }: any) {
  const [open, setopen] = useState(false);
  const [activecode, setactivecode] = useState<any>(null);

  useEffect(() => {
    if (activecode) {
      setcodeacitve(activecode);
    }
  }, [activecode]);

  return (
    <>
      <div
        onClick={() => setopen(!open)}
        className="  border border-gray-200  cursor-pointer w-[110px] h-[50px] flex items-center justify-center px-2 flex-row-reverse shadow-md rounded-md relative bg-white"
      >
        {open && (
          <ul className=" rounded-md absolute -left-[20px] w-[100px] h-[150px] overflow-y-auto  px-2 bg-white z-[999] shadow-md">
            {codephonecontent.map((code: any, index) => (
              <li
                onClick={() => setactivecode(code)}
                key={index}
                className="flex-between gap-2 px-2 py-1 "
              >
                <p>{code.code}</p>
                <Image
                  src={code.image}
                  alt="arabic"
                  width={1024}
                  height={1280}
                  className="w-[20px]"
                />
              </li>
            ))}
          </ul>
        )}
        {activecode == null ? (
          <div className="flex-between w-full px-2">
            <p className="text-[12px] whitespace-nowrap">اختر كود الدولة</p>
          </div>
        ) : (
          <div className="flex-between w-full px-2">
            <p>{activecode.code}</p>
            <Image
              src={activecode.image}
              alt="arabic"
              width={1024}
              height={1280}
              className="w-[20px]"
            />
          </div>
        )}
        <ArrowDown width={18} />
      </div>
    </>
  );
}
