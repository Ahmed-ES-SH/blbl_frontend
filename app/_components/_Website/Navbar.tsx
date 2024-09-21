import Image from "next/image";
import Link from "next/link";
import React from "react";
import LangButton from "./LangButton";
import Notifications from "./Notification";
import BarsMenue from "./BarsMenue";

export default function Navbar() {
  return (
    <>
      <div className="w-full pl-[20px] lg:pr-[55px] bg-transparent pt-6 flex-row-reverse  flex-between  py-1 h-[80px]">
        <BarsMenue />
        <Link className=" absolute top-0 left-1/2 -translate-x-1/2" href={"/"}>
          <Image
            src={"/logonobg.png"}
            alt="logo"
            width={1024}
            height={1280}
            priority={true}
            className="w-[120px] h-[120px]"
          />
        </Link>
        <div className="flex-two">
          <LangButton />
          <Notifications />
        </div>
      </div>
    </>
  );
}
