"use client";
import { instance } from "@/app/Api/axios";
import { UseVariabels } from "@/app/context/VariabelsContext";
import { allstring } from "@/app/types/dashbordcontenttypes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingDashbord from "../LoadingDashbord";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebarchatsforusers() {
  const { id, currentuser } = UseVariabels();
  const [conversations, setConversations] = useState<allstring[] | any>(null);
  const [open, setopen] = useState(true);
  //
  //
  useEffect(() => {
    const fetchConversations = async () => {
      if (id) {
        try {
          const res = await instance.get(
            `/conversation-details-secend/${id}/${currentuser.type}`
          );
          setConversations(res.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchConversations();
  }, [id, currentuser]);

  return (
    <div className="flex max-md:hidden  pt-14 mb-[60px] overflow-y-auto h-[80vh] hidden-scrollbar self-center  items-center justify-center">
      <div
        onClick={() => setopen(!open)}
        className="p-1 rounded-r-md text-[12px] cursor-pointer text-white bg-sky-400"
      >
        {open ? <ArrowLeft width={13} /> : <ArrowRight width={13} />}
      </div>
      <motion.div
        initial={{ width: "fit-content" }}
        animate={{ width: open ? "300px" : "fit-content" }}
        transition={{ duration: 0.4 }}
        className=" bg-secend_color relative h-[90vh] overflow-y-auto
        hidden-scrollbar rounded-md shadow-md "
      >
        {currentuser && (
          <Link
            style={{ width: open ? "100%" : "fit-content" }}
            href={"/customerservice"}
            className="currentuser mt-[15px]  w-full   px-2 py-1 flex items-center justify-between bg-sky-300 "
          >
            <div
              style={{ display: open ? "block" : "none" }}
              className="content"
            >
              <h1>{currentuser.data.name}</h1>
            </div>
            <Image
              src={currentuser.data.image}
              width={1024}
              height={1280}
              alt="image"
              className="w-[60px] h-[60px] rounded-full"
            />
          </Link>
        )}

        {conversations && conversations.length > 0 ? (
          <div className="px-1">
            {conversations.map((conversation: any, index: number) => {
              return (
                <Link
                  style={{ width: open ? "100%" : "fit-content" }}
                  href={`/customerservice/${conversation?.conversation?.id}`}
                  key={index}
                  className="w-full my-2  px-2 py-1 flex items-center justify-between bg-main_color rounded-md"
                >
                  <div
                    style={{ display: open ? "block" : "none" }}
                    className="content"
                  >
                    <h1>{conversation?.second_party.name}</h1>
                  </div>
                  <Image
                    src={conversation?.second_party.image}
                    width={1024}
                    height={1280}
                    alt="image"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          open && (
            <h1 className="w-fit m-auto mt-8 text-white text-[18px]">
              لا توجد محادثات حتى الآن
            </h1>
          )
        )}
      </motion.div>
    </div>
  );
}
