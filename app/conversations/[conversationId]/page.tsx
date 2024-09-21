import dynamic from "next/dynamic";
import React from "react";

const DynamicConversation = dynamic(
  () => import("@/app/_components/_Website/DynamicConversation"),
  {
    ssr: false,
  }
);

export default function page({ params }: any) {
  const conversation_id = params.conversationId;
  return (
    <>
      <DynamicConversation conversation_id={conversation_id} />
    </>
  );
}
