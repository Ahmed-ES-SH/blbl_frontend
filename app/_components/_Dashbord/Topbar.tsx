"use client";
import React, { useState } from "react";
import Image from "next/image";
import { UseVariabels } from "@/app/context/VariabelsContext";
import DarkModeToggle from "./DarkModeToggle";
import { ArrowDown } from "lucide-react";
import Dropdown from "./Dropdown";
import { dropprofile } from "@/app/constant/dashbordcontent";

export default function Topbar() {
  const { currentuser } = UseVariabels();
  const { opensidebar, setopensidebar } = UseVariabels();
  const [opendrop, setopendrop] = useState(false);
  return (
    <>
      <div className="w-full h-[60px] relative px-4 py-2 flex-between flex-row-reverse bg-bglight shadow-md z-[99] redark ">
        <div className="flex-two">
          <Image
            src={"/logonobg.png"}
            alt="bars"
            width={1024}
            height={1280}
            priority={true}
            className="w-[80px] h-[80px] cursor-pointer"
          />
          <div
            onClick={() => setopendrop((prev) => !prev)}
            className="avater  cursor-pointer flex-between w-[200px] h-[40px] px-2 py-1 shadow-sm rounded-md bg-sky-400"
          >
            <Image
              src={currentuser?.data?.image}
              alt="bars"
              width={1024}
              height={1280}
              className="w-[30px] h-[30px] rounded-full"
            />
            <div className="flex-two">
              <h1 className="text-white">{currentuser?.data?.name}</h1>
              <ArrowDown className="text-white" width={14} />
            </div>
          </div>
          {opendrop && <Dropdown opation={dropprofile} />}
        </div>
        <div className="flex-two">
          <DarkModeToggle />
          <Image
            onClick={() => setopensidebar(!opensidebar)}
            src={"/dashbord/menu-bar.png"}
            alt="bars"
            width={1024}
            height={1280}
            className="w-[30px] h-[30px] cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
