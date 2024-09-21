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
import { instance } from "@/app/Api/axios";
import { UseVariabels } from "@/app/context/VariabelsContext";
import Pusher from "pusher-js";
import Link from "next/link";
import ChatBody from "@/app/_components/_Website/RenderMessages";
import LoadingDashbord from "@/app/_components/LoadingDashbord";
import MapWithRouting from "@/app/_components/_Website/DistanceDifference";

export default function DynamicCustomerConversation({ conversation_id }: any) {
  const { id, currentuser, startRecording, stopRecording, isRecording } =
    UseVariabels();

  const [data, setData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [firstParty, setFirstParty] = useState<any>(null);
  const [openMap, setOpenMap] = useState<boolean>(false);
  const [location1, setLocation1] = useState<any>({});
  const [location2, setLocation2] = useState<any>({});
  const [secondParty, setSecondParty] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch conversation and user data
  useEffect(() => {
    const fetchConversationData = async () => {
      try {
        const res = await instance.get(
          `/conversation-details-customer/${conversation_id}`
        );
        const fetchedData = res.data.data;
        setData(fetchedData);

        const first = res.data.data.agent;
        const second = res.data.data.second_party;
        const isCurrentUserAgent =
          fetchedData.agent.role === "customerservice" ||
          fetchedData.agent.role === "Admin"; // أو التحقق من نوع الوكيل بطريقة أخرى
        const isCurrentUserVendor = fetchedData.agent.role === "vendor"; // التحقق إذا كان المستخدم الحالي هو التاجر

        const isCurrentUser = fetchedData.agent.id === id; // التحقق من أن المستخدم الحالي هو الوكيل أو التاجر بناءً على الـ id

        // إذا كان المستخدم الحالي هو الوكيل (agent)، يكون الطرف الثاني هو التاجر والعكس صحيح
        setFirstParty(
          isCurrentUser ? fetchedData.agent : fetchedData.second_party
        );
        setSecondParty(
          isCurrentUser ? fetchedData.second_party : fetchedData.agent
        );

        // Parse location if needed
        if (typeof first.location === "string") {
          setLocation1(JSON.parse(first.location));
        } else {
          setLocation1(first.location);
        }
        if (typeof second.location === "string") {
          setLocation2(JSON.parse(second.location));
        } else {
          setLocation2(second.location);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversationData();
  }, [conversation_id, id]);

  // Fetch messages and mark them as read
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await instance.get(
          `/customer-conversations/${conversation_id}/messages`
        );
        setMessages(res.data.data);

        await instance.post(
          `/custmoer-conversations/${conversation_id}/mark-as-read`
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [conversation_id]);

  // Pusher setup
  useEffect(() => {
    const pusher = new Pusher("fbcee0a3b98076641f54", { cluster: "ap1" });
    const channel = pusher.subscribe("chat");
    channel.bind("MessageSent", (datachat: any) => {
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some(
          (message) => message.id === datachat.message.id
        );

        if (!messageExists) {
          return [...prevMessages, datachat.message];
        }
        return prevMessages;
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);
  console.log(conversation_id);
  const handleSend = async () => {
    try {
      const formData = new FormData();
      formData.append("customerserviceconversation_id", conversation_id);
      formData.append("message", message);
      formData.append("sender_id", id);
      formData.append("sender_type", currentuser.type);
      if (image) {
        formData.append("image", image);
      }
      await instance.post("/customer-messages-send", formData);
      setMessage("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAudioSend = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("customerserviceconversation_id", conversation_id);
      formData.append("audio", audioBlob, "audio-message.webm");
      formData.append("sender_id", id);
      formData.append("sender_type", currentuser.type);
      await instance.post("/customer-messages-send", formData);
    } catch (error) {
      console.log("Error sending audio:", error);
    }
  };

  const stopRecordingAndSendAudio = async () => {
    try {
      const audioBlob = await stopRecording();
      if (audioBlob) {
        handleAudioSend(audioBlob);
      } else {
        console.log("No audio blob returned");
      }
    } catch (error) {
      console.log("Error in stopRecording:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="main-bg w-full h-full">
      {data ? (
        <div className="Conversation-section rounded-t-md w-full bg-white dark:bg-main_dash">
          <div className="firstpart bg-disable_color flex-between px-2 py-1 rounded-t-md">
            <Link
              href={`/${data?.second_party_type}publicpage/${secondParty?.id}`}
              className="info flex-two"
            >
              <ChevronRight />
              <Image
                src={secondParty?.image || "/images/userbg.png"}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full border-[4px] border-secend_color"
              />
              <div className="max-sm:text-[13px]">
                <p className="text-[18px] max-sm:text-[13px]">
                  {secondParty?.name}
                </p>
                <p className="text-[12px] max-sm:text-[10px] text-secend_text">
                  {secondParty?.is_available ? "متاح الآن" : "غير متاح"}
                </p>
              </div>
            </Link>
            <div className="icons flex-two flex-row-reverse text-white text-[12px]">
              <Video />
              <Phone />
              <MapPinIcon
                className="cursor-pointer"
                onClick={() => setOpenMap((prev) => !prev)}
              />
            </div>
          </div>
          <ChatBody messages={messages} />
          <div className="input-text bg-[#ddd]/80 w-full relative flex-between">
            <input
              autoComplete="off"
              type="text"
              name="message"
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
              placeholder="اكتب هنا"
              className="w-full bg-[#ddd] outline-none shadow-md px-4 pr-9 py-2"
            />
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="icons-2  absolute top-2 left-3 flex-two flex-row-reverse">
              <label htmlFor="imageUpload">
                <Camera className="cursor-pointer text-gray-400" />
              </label>
              <Mic
                className={`cursor-pointer text-gray-400 ${
                  isRecording ? "text-red-500" : ""
                }`}
                onClick={
                  isRecording ? stopRecordingAndSendAudio : startRecording
                }
              />

              {isRecording && (
                <div className="absolute -top-[60px] left-[20px] w-[50px] h-[45px] bg-secend_color flex items-center justify-center rounded-md shadow-md">
                  <div className="w-[15px] h-[15px] rounded-full bg-red-500 animate-ping"></div>
                  <div className="absolute -bottom-[10px] left-[15px] w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-secend_color"></div>
                </div>
              )}
            </div>
            {imagePreview && (
              <div className="image-preview absolute max-md:-top-[65px] -top-[96px] left-0 w-full px-2 py-1 bg-[#a0aecc] m-auto flex items-center gap-2 mt-2">
                <Image
                  width={80}
                  height={80}
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 max-md:w-12 max-md:h-12 object-cover rounded-md"
                />
                <div>
                  <p className="text-sm">{image?.name}</p>
                </div>
                <button
                  className="bg-red-500 text-white rounded-md px-2 py-1"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                >
                  حذف
                </button>
              </div>
            )}
            <SendHorizonal
              onClick={handleSend}
              className="cursor-pointer text-sky-400 absolute top-2 right-2"
            />
          </div>
          {currentuser && openMap && (
            <div className="w-full  absolute p-2 z-[99999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-md outline-none">
              <MapWithRouting location1={location1} location2={location2} />
              <button
                onClick={() => setOpenMap((prev) => !prev)}
                className="px-4 py-2 rounded-md shadow-md text-white bg-secend_color text-center"
              >
                إغلاق
              </button>
            </div>
          )}
          {imagePreview && (
            <div className="image-preview absolute max-md:-top-[65px] -top-[95px] left-0 w-full px-2 py-1 bg-[#a0aecc] m-auto flex items-center gap-2 mt-2">
              <Image
                width={80}
                height={80}
                src={imagePreview}
                alt="Uploaded preview"
                className="rounded-md shadow-md"
              />
              <CheckCircle
                onClick={() => setImagePreview(null)}
                className="text-secend_color cursor-pointer"
              />
            </div>
          )}
        </div>
      ) : (
        <LoadingDashbord />
      )}
    </div>
  );
}
