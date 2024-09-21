"use client";
import VariabelsProvider from "@/app/context/VariabelsContext";
import React from "react";

export default function ClientLayout({ children }: any) {
  return (
    <>
      <VariabelsProvider>{children}</VariabelsProvider>
    </>
  );
}
