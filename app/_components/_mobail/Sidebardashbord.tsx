"use client";
import {
  inspactorservices,
  navlinks,
  navlinkscustemorservices,
} from "@/app/constant/dashbordcontent";
import { UseVariabels } from "@/app/context/VariabelsContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const { opensidebar, setopensidebar, currentuser } = UseVariabels();
  const links =
    currentuser && currentuser?.data && currentuser.data.role == "Admin"
      ? navlinks
      : currentuser?.data.role == "serviceinspector"
      ? inspactorservices
      : currentuser?.data.role == "customerservice"
      ? navlinkscustemorservices
      : navlinks;
  return (
    <>
      <motion.div
        initial={{ width: "0" }}
        animate={{ width: opensidebar ? "50%" : "0" }}
        exit={{ width: "0" }}
        transition={{ duration: 0.4 }}
        className="max-lg:block hidden z-[9999999999999999999999] bg-main_dash text-secend_text dark:bg-secend_dash absolute top-0 left-0   overflow-y-auto h-screen hidden-scrollbar "
      >
        {links.map((link, index) => (
          <Link
            className={`${
              pathname == link.to ? "bg-sky-400" : ""
            }  flex-two py-4 px-4 hover:bg-sky-500  duration-200`}
            key={index}
            href={link.to}
          >
            <Image
              src={link.imgsrc}
              alt={link.title}
              width={1024}
              height={1280}
              className="w-[30px] h-[30px] "
            />
            <p
              style={{
                opacity: opensidebar ? "1" : "0",
                display: opensidebar ? "block" : "none",
              }}
              className="whitespace-nowrap duration-100"
            >
              {link.title}
            </p>
          </Link>
        ))}
      </motion.div>
    </>
  );
}
