"use client";
import { instance } from "@/app/Api/axios";
import { UseVariabels } from "@/app/context/VariabelsContext";
import { MessageCircleMore, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookie from "cookie-universal";

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
  const [loginError, setLoginError] = useState(false); // مؤشر خطأ تسجيل الدخول
  const router = useRouter();
  const isguest = currentuser?.data?.is_guest;
  const cookie = Cookie();
  const token = cookie.get("token");

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

  const handleLoginError = () => {
    setLoginError(true);
  };

  return (
    <>
      {!loading ? (
        <div
          onClick={() => {
            if (isguest || !token) {
              handleLoginError(); // إظهار خطأ تسجيل الدخول إذا كان الضيف أو لا يوجد توكن
            } else {
              handleStartConversation();
            }
          }}
          className="text-[15px] cursor-pointer self-end text-secend_color flex-two"
        >
          <p className="whitespace-nowrap">تواصل معى</p>
          <MessageCircleMore />
        </div>
      ) : (
        <h1>جارى تهيئة المحادثة...</h1>
      )}

      {loginError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold">معلومات</h2>
            <p className="text-center">
              عذرًا، يجب أن تسجل الدخول لتتمكن من إجراء محادثة!
            </p>
            <button
              onClick={() => setLoginError(false)}
              className="mt-4 px-4 py-2 bg-secend_color text-white rounded-md"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
}
