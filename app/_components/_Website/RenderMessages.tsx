"use client";
import { UseVariabels } from "@/app/context/VariabelsContext";
import { CheckCircle } from "lucide-react";
import React from "react";
import Image from "next/image";
export default function ChatBody({ messages }: { messages: any }) {
  const { id, currentuser } = UseVariabels();

  const formatDate = (date: any) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  const formatDateDay = (date: any) => new Date(date).toLocaleDateString();

  const MessageFromUser = ({
    message,
    audio,
    image,
    time,
  }: {
    message: any;
    audio: any;
    image: any;
    time: any;
  }) => (
    <div className="flex flex-col items-start mb-2">
      {message && (
        <p className="text-white w-fit ml-auto p-2 bg-secend_color rounded-md">
          {message}
        </p>
      )}
      {image && (
        <Image
          src={`${image}`}
          alt="Message image"
          width={1024}
          height={1280}
          className="my-2 w-[220px] max-sm:w-[100px] h-auto rounded-lg shadow-md"
        />
      )}
      {audio && (
        <audio
          controls
          className="w-1/2 my-2 max-md:w-full max-w-md bg-main_color rounded-lg shadow-md"
        >
          <source src={audio} type="audio/webm" />
          Your browser does not support the audio element.
        </audio>
      )}
      <p className="flex items-center rounded-md mt-1 text-[12px] bg-secend_text/50">
        {time} <CheckCircle width={12} />
      </p>
    </div>
  );

  const MessageFromVendor = ({
    message,
    audio,
    image,
    time,
  }: {
    message: any;
    audio: any;
    image: any;
    time: any;
  }) => (
    <div className="flex flex-col items-end mb-2">
      {message && (
        <p className="w-fit p-2 bg-main_color border shadow-md rounded-md">
          {message}
        </p>
      )}
      {image && (
        <Image
          src={`${image}`}
          alt="Message image"
          width={1024}
          height={1280}
          className="my-2 w-[220px] max-sm:w-[100px] h-auto rounded-lg shadow-md"
        />
      )}
      {audio && (
        <audio
          controls
          className="my-2 w-1/2 max-md:w-full max-w-md bg-gray-200 rounded-lg shadow-md"
        >
          <source src={audio} type="audio/webm" />
          Your browser does not support the audio element.
        </audio>
      )}
      <p className="flex items-center rounded-md mt-1 text-[12px] bg-secend_text/50">
        {time} <CheckCircle width={12} />
      </p>
    </div>
  );

  const renderMessages = () => {
    return (
      messages &&
      messages.map((msg: any, index: any) => {
        const isUser =
          (id && msg.sender_id == id) ||
          msg.sender_type == currentuser?.data?.role; // تحقق من حالة المرسل

        const time = formatDate(msg.created_at);
        const audioUrl = msg.audio
          ? `https://alrajhost.com/storage/app/public/${msg.audio}`
          : null;
        const imageUrl = msg.image
          ? `https://alrajhost.com/storage/app/public/${msg.image}`
          : null;

        return (
          <React.Fragment key={index}>
            {isUser ? (
              <MessageFromUser
                message={msg.message}
                audio={audioUrl}
                image={imageUrl}
                time={time}
              />
            ) : (
              <MessageFromVendor
                message={msg.message}
                audio={audioUrl}
                image={imageUrl}
                time={time}
              />
            )}
          </React.Fragment>
        );
      })
    );
  };

  return (
    <div className="body dark:bg-main_dash px-6 py-2 mt-3 h-[66vh] overflow-y-auto hidden-scrollbar">
      {renderMessages()}
    </div>
  );
}
