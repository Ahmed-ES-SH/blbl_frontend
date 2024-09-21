"use client";
import React from "react";
import { instance } from "@/app/Api/axios";
import { LogOut } from "lucide-react";
import Cookie from "cookie-universal";
import { UseVariabels } from "@/app/context/VariabelsContext";

export default function Logoutbtn() {
  const { id, currentuser } = UseVariabels();
  const cookie = Cookie();

  // Function to handle logout
  const handlelogout = async () => {
    try {
      const formdata = new FormData();
      formdata.append("user_id", id);
      formdata.append("user_type", currentuser.type);
      await instance.post("/logout", formdata);
      cookie.remove("token");
      if (typeof window !== "undefined") {
        localStorage.clear();
        // Redirect using window.location if in browser environment
        window.location.href = "/quikaccess";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li onClick={handlelogout} className="p-1 flex-between cursor-pointer">
      <p>Log out</p>
      <LogOut width={14} />
    </li>
  );
}
