import { mapeletype } from "@/app/types/dashbordcontenttypes";
import Link from "next/link";
import React from "react";
import Logoutbtn from "./Logoutbtn";

export default function Dropdown({ opation }: any) {
  return (
    <div className=" w-[150px] h-fit   absolute top-[55px] left-[18px] overflow-y-auto p-2 rounded-md bg-sky-400 text-white">
      <ul>
        {opation.map((link: mapeletype, index: number) => (
          <Link href={`${link.to}`} className="p-1 flex-between" key={index}>
            <p>{link.title}</p>
            {link.icon}
          </Link>
        ))}
        <Logoutbtn />
      </ul>
    </div>
  );
}
