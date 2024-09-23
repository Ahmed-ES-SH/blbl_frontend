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

export default function Sidebarchatsmobail() {
  const { id, currentuser, messageunread, setmessageunread } = UseVariabels();
  const [conversations, setConversations] = useState<allstring[] | any>(null);
  const [open, setopen] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      if (id) {
        try {
          const res = await instance.get(
            `/users/${id}/${currentuser.type}/conversations`
          );
          const conversationData = res.data.data;
          setConversations(conversationData);

          // تحقق من وجود أي رسائل غير مقروءة
          const hasUnread = conversationData.some(
            (conversation: any) => conversation.hasUnreadMessages
          );

          console.log("Has unread messages:", hasUnread);

          // إذا كانت هناك رسائل غير مقروءة، قم بتحديث setmessageunread
          if (hasUnread) {
            if (hasUnread !== messageunread) {
              setmessageunread(hasUnread);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchConversations();
  }, [id, messageunread, setmessageunread]); // إضافة messageunread لضمان الاستدعاء الصحيح

  return (
    <motion.div
      initial={{ width: "0", height: "0" }}
      animate={{
        width: open ? "100%" : "12%",
        height: open ? "100vh" : "23vh",
      }}
      exit={{ width: "0" }}
      transition={{ duration: 0.4 }}
      className="md:hidden absolute top-0 left-0  flex overflow-y-auto h-screen hidden-scrollbar items-center justify-center"
    >
      <div
        onClick={() => setopen(!open)}
        className="px-3 absolute right-[43%] py-1 rounded-r-md z-[99999999] text-[12px] cursor-pointer text-white bg-sky-400"
      >
        {open ? <ArrowLeft width={13} /> : <ArrowRight width={13} />}
      </div>
      <motion.div
        initial={{ width: "0" }}
        animate={{ width: open ? "50%" : "0" }}
        transition={{ duration: 0.4 }}
        className="bg-secend_color z-[9999999999] absolute top-0 left-0 h-screen overflow-y-auto hidden-scrollbar rounded-md shadow-md"
      >
        {currentuser && (
          <Link
            style={{ width: open ? "100%" : "fit-content" }}
            href={"/conversations"}
            className="currentuser w-full px-2 py-1 flex items-center justify-between bg-sky-300 rounded-t-md"
          >
            <div
              style={{ display: open ? "block" : "none" }}
              className="content"
            >
              <h1>{currentuser?.data?.name}</h1>
            </div>
            <Image
              src={currentuser.data.image || "/images/userbg.png"}
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
              const secendparty =
                conversation.first_party_id === id
                  ? conversation.second_party
                  : conversation.first_party;
              return (
                <Link
                  style={{ width: open ? "100%" : "fit-content" }}
                  href={`/conversations/${conversation.id}`}
                  key={index}
                  className="w-full my-2 px-2 py-1 flex items-center justify-between bg-main_color rounded-md relative"
                >
                  <div
                    style={{ display: open ? "block" : "none" }}
                    className="content"
                  >
                    <h1>{secendparty?.name}</h1>
                  </div>
                  <Image
                    src={
                      secendparty?.image
                        ? secendparty?.image
                        : "/images/userbg.png"
                    }
                    width={1024}
                    height={1280}
                    alt="image"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  {conversation.hasUnreadMessages && (
                    <span className="absolute top-1 right-1 bg-red-500 w-3 h-3 rounded-full"></span>
                  )}
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
    </motion.div>
  );
}
