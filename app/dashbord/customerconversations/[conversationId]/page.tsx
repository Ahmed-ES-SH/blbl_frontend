import dynamic from "next/dynamic";
import React from "react";

const DynamicCustomerConversations = dynamic(
  () => import("@/app/_components/_Dashbord/DynamicCustomerConversaion"),
  {
    ssr: false,
  }
);

export default function page({ params }: any) {
  const conversation_id = params.conversationId;
  return (
    <>
      <DynamicCustomerConversations conversation_id={conversation_id} />
    </>
  );
}
