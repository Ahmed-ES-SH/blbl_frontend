"use client";
import React, { useState } from "react";
import Image from "next/image";
import DropLangs from "./DropLangs";
export default function LangButton() {
  const [open, setopen] = useState(false);
  return (
    <>
      <Image
        onClick={() => setopen(!open)}
        src={"/images/translate.png"}
        alt="logo"
        width={1024}
        height={1280}
        priority={true}
        className="w-[40px] h-[40px] max-sm:w-[30px] max-sm:h-[30px] cursor-pointer"
      />
      {open && <DropLangs />}
    </>
  );
}
