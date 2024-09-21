"use client";
import React from "react";
import VariabelsProvider from "../context/VariabelsContext";

export default function ClientComponent({ children }: any) {
  return (
    <>
      <VariabelsProvider>{children}</VariabelsProvider>
    </>
  );
}
