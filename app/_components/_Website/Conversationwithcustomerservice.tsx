"use client";
import React, { useEffect, useState } from "react";
import {
  Camera,
  CheckCircle,
  ChevronRight,
  MapPinIcon,
  Mic,
  Phone,
  SendHorizonal,
  Truck,
  Video,
} from "lucide-react";
import Image from "next/image";
import Pusher from "pusher-js";
import { UseVariabels } from "@/app/context/VariabelsContext";
import { instance } from "@/app/Api/axios";
import ChatBody from "./RenderMessages";
import LoadingDashbord from "../LoadingDashbord";

export default function Conversationwithcustomerservice() {
  const { id, currentuser } = UseVariabels();
  const [data, setdata] = useState(null);

  const [loading, setloading] = useState(false);
  const [conversation_id, setconversation_id] = useState<any>(0);
  const [messages, setMessages] = useState<any>(null);
  const [firstparty, setfirstparty] = useState<any>(null);
  const [secendparty, setsecendparty] = useState<any>(null);
  const [message, setmessage] = useState<string>("");
  const [done, setdone] = useState<string>("");
  const [problem, setproblem] = useState<string>("");

  // Function to fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await instance.get(
          `/conversation-details-secend/${id}/${currentuser.type}`
        );
        const fetchedData = res.data.data;
        setdata(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      getData();
    }
  }, [id, currentuser]);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        try {
          const res = await instance.get(
            `/customer-conversations/${conversation_id}/messages`
          );
          if (res.status != 404) {
            setMessages(res.data.data);
          } else {
            setMessages([]);
          }
        } catch (error) {
          console.log(error);
          setMessages([]);
        }
      }
    };
    getData();
  }, [id, conversation_id]);

  // pusher channel
  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("fbcee0a3b98076641f54", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("MessageSent", function (datachat: any) {
      setMessages((prevMessages: any) => {
        // التحقق إذا كانت الرسالة موجودة بالفعل
        const messageExists = prevMessages.some(
          (message: any) => message.id === datachat.message.id
        );

        // إذا كانت الرسالة غير موجودة، قم بإضافتها
        if (!messageExists) {
          return [...prevMessages, datachat.message];
        }

        // إذا كانت الرسالة موجودة بالفعل، ارجع المصفوفة كما هي
        return prevMessages;
      });
    });

    // تنظيف القناة عند إلغاء التثبيت
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append("customerserviceconversation_id", conversation_id);
      formData.append("message", message);
      formData.append("sender_id", id);
      formData.append("sender_type", currentuser?.data?.role);
      const res = await instance.post("/customer-messages-send", formData);
      setmessage("");
    } catch (error) {
      console.log(error);
    }
  };

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
  console.log(messages);
  return (
    <>
      <div className="px-3 py-2 mt-4">
        <h1 className="text-bold text-[22px]  text-secend_color">
          خدمة العملاء
        </h1>
        <span className="before:w-[70%] before:h-[1px] before:content-[''] before:absolute max-md:before:w-[90%] before:bg-black " />
      </div>
      {data == null ? (
        <LoadingDashbord />
      ) : (
        <div className="px-2 py-2 mt-4">
          {data ? (
            <div className="main-bg mt-6 rounded-t-md dark:bg-secend_dash w-full  h-full">
              {data !== null ? (
                <div className="Conversation-section  rounded-t-md dark:bg-secend_dash  w-full h-full   bg-white">
                  <div className="firstpart bg-disable_color dark:bg-secend_dash rounded-md flex-between px-2 py-1 rounded-t-md">
                    <div className="info flex-two">
                      <ChevronRight />
                      <Image
                        src={
                          (secendparty && secendparty.image) ||
                          "/images/userbg.png"
                        }
                        alt="avatar"
                        width={1024}
                        height={1280}
                        className="w-[40px] h-[40px] rounded-full border-[4px] border-secend_color"
                      />
                      <div className="max-sm:text-[13px]">
                        <p className="text-[18px] max-sm:text-[13px]">
                          {secendparty?.name}
                        </p>
                        <p className="text-[12px] max-sm:text-[10px] text-secend_text">
                          متاح الأن
                        </p>
                      </div>
                    </div>
                    <div className="icons flex-two flex-row-reverse text-white text-[12px]">
                      <Video />
                      <Phone />
                      <MapPinIcon />
                    </div>
                  </div>
                  <ChatBody messages={messages} />
                  <div className="input-text bg-[#ddd]/80 dark:bg-secend_dash/50 w-full relative flex-between">
                    <input
                      autoComplete=""
                      type="text"
                      name="message"
                      value={message}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setmessage(e.target.value)
                      }
                      placeholder="اكتب هنا "
                      className="w-full bg-[#ddd] dark:bg-secend_dash/50 outline-none shadow-md px-4 pr-9 py-2"
                    />
                    <div className="icons-2 absolute top-2 left-3 flex-two flex-row-reverse">
                      <Camera className="cursor-pointer text-gray-400" />
                      <Mic className="cursor-pointer text-gray-400" />
                    </div>
                    <SendHorizonal
                      onClick={handleSendMessage}
                      className="cursor-pointer absolute top-2 right-2 text-sky-400"
                    />
                  </div>
                </div>
              ) : (
                <LoadingDashbord />
              )}
            </div>
          ) : loading ? (
            <LoadingDashbord />
          ) : (
            <div className="w-full mt-6">
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
      )}
    </>
  );
}
