"use client";
import ClientLayout from "../_components/_Dashbord/ClientLayout";
import Sidebarchatsforusers from "../_components/_Website/Sidebarchatsforusers";
import Navbar from "../_components/_Website/Navbar";
import Sidebarchatsforusersmobail from "../_components/_mobail/sidebatchatsforusersmobail";
import React, { useEffect, useState } from "react";
import { allstring } from "../types/dashbordcontenttypes";
import { UseVariabels } from "../context/VariabelsContext";
import { instance } from "../Api/axios";
export default function ConversationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id, currentuser } = UseVariabels();
  const [done, setdone] = useState<string>("");
  const [problem, setproblem] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<allstring[] | any>(null);

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

  const handleSendProplem = async () => {
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("message", problem);
      if (currentuser.type == "user") {
        formdata.append("user_id", id);
        const res = await instance.post("/messagecustomer/send", formdata);
        setdone("تم إرسال طلبك وسيتم الرد عليك بأسرع وقت إنشاء اللة .");
      } else {
        formdata.append("vendor_id", id);
        const res = await instance.post("/messagevendor/send", formdata);
        setdone("تم إرسال طلبك وسيتم الرد عليك بأسرع وقت إنشاء اللة .");
      }
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  return (
    <div className="main-bg dark:bg-secend_dash">
      <Navbar />
      {conversations && conversations.length > 0 ? (
        <ClientLayout>
          <div className="parent h-[85vh] overflow-hidden py-2 mt-4 dark:bg-secend_dash">
            <main
              className="flex items-start gap-4 px-4 dark:bg-secend_dash"
              style={{ direction: "rtl" }}
            >
              <div className="w-[96%] h-[90vh] overflow-y-auto hidden-scrollbar mx-auto pb-2  rounded-md dark:bg-main_dash ">
                {children}
              </div>
              <Sidebarchatsforusers />
              <Sidebarchatsforusersmobail />
            </main>
          </div>
        </ClientLayout>
      ) : (
        <div className="w-[90%] m-auto max-md:w-[98%] mt-6">
          <h1 className="text-[18px] pb-3 border-b border-black ">
            أكتب مشكلتك مع وصف مناسب :
          </h1>
          <textarea
            value={problem}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setproblem(e.target.value)
            }
            className="w-full h-[50vh] px-4 py-2  outline-none shadow-md mt-3 border border-gray-300"
          />
          <div className="w-fit mr-auto">
            <button
              onClick={handleSendProplem}
              className="px-4 py-2 rounded-md shadow-md text-white bg-secend_color mt-3 "
            >
              أرسل الطلب
            </button>
          </div>
          {done && (
            <p className="w-full px-2 py-1 bg-green-300 mt-2 ">{done}</p>
          )}
        </div>
      )}
    </div>
  );
}
