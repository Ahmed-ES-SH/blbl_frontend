"use client";
import { instance } from "@/app/Api/axios";
import { UseVariabels } from "@/app/context/VariabelsContext";
import { MessageCircleMore, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface props {
  secendparty_id: any;
  secendparty_type: any;
}

export default function StartConversationLink({
  secendparty_id,
  secendparty_type,
}: props) {
  const { id, currentuser } = UseVariabels();
  const [loading, setLoading] = useState(false); // مؤشر تحميل
  const [error, seterror] = useState(false); // مؤشر تحميل
  const router = useRouter();
  const isguest = currentuser?.data?.is_guest;

  const handleStartConversation = async () => {
    setLoading(true);
    try {
      // تحقق من وجود المحادثة أو أنشئ محادثة جديدة
      const formdata = new FormData();
      formdata.append("first_party_id", id);
      formdata.append("second_party_id", secendparty_id);
      formdata.append("first_party_type", currentuser.type);
      formdata.append("second_party_type", secendparty_type);
      formdata.append("type", `${currentuser.type}_to_${secendparty_type}`);
      const res = await instance.post("/conversations", formdata);
      const conversationId = res.data.data.id;
      router.push(`/conversations/${conversationId}`);
    } catch (error) {
      console.error("Error creating conversation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleerror = () => {
    seterror(true);
  };

  return (
    <>
      {!loading ? (
        <div
          onClick={() => (isguest ? handleerror() : handleStartConversation())}
          className="text-[15px] cursor-pointer self-end  text-secend_color flex-two"
        >
          <p className="whitespace-nowrap">تواصل معى </p>
          <MessageCircleMore />
        </div>
      ) : (
        <h1>جارى تهيئة المحادثة...</h1>
      )}

      {error && (
        <div className="w-full h-screen  absolute -top-[400px] left-0 flex items-center justify-center">
          <div className=" h-[30vh] relative flex items-center rounded-md shadow-md justify-center bg-secend_color/80 p-1">
            <p className="w-fit whitespace-nowrap m-auto text-center text-white ">
              ستحتاج الى حساب فعلى لتتمكن من إجراء محادثة !
            </p>
            <X
              onClick={() => seterror(false)}
              className=" absolute top-0 -right-6 cursor-pointer text-red-400"
            />
          </div>
        </div>
      )}
    </>
  );
}
