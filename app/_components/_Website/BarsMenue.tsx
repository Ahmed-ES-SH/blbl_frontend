"use client";
import {
  icons,
  opationsadmin,
  opationsuser,
  opationsvendor,
  opationsguest,
} from "@/app/constant/websitecontent";
import { LayoutDashboard, LogIn, LogOut, LucideMenu } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { instance } from "@/app/Api/axios";
import { useRouter } from "next/navigation";
import Cookie from "cookie-universal";
import { UseVariabels } from "@/app/context/VariabelsContext";

// end import lines

export default function BarsMenue() {
  const { messageunread, setmessageunread } = UseVariabels();
  const [currentuser, setcurrentuser] = useState<any>(null || {});

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await instance
          .get("/user")
          .then((res) => setcurrentuser(res.data));
      } catch (error: any) {
        if (error.response.status == 401) {
          if (cookie.get("token")) {
            cookie.remove("token");
          }
        } else {
          console.error("An unexpected error occurred", error);
        }
      }
    };
    getdata();
  }, []);

  // state for open menue bar
  const [open, setopen] = useState(false);
  // make variable for userouter
  const router = useRouter();
  // make variable for cookie
  const cookie = Cookie();
  const token = cookie.get("token");

  // function handlelogut to delete token from back and front
  const handlelogout = async () => {
    try {
      const formdata = new FormData();
      formdata.append("user_id", currentuser.data.id);
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

  const option =
    currentuser !== null && currentuser?.data?.role == "user"
      ? opationsuser
      : currentuser?.data?.role == "Admin"
      ? opationsadmin
      : currentuser?.data?.role == "guest"
      ? opationsguest
      : opationsvendor;

  return (
    <>
      {token ? (
        currentuser !== null && (
          <div className="bars relative z-[999] ">
            <div className="flex items-start gap-[4px]">
              {messageunread && (
                <span className=" bg-red-500 w-3 h-3 rounded-full"></span>
              )}
              <div
                onClick={() => setopen((prev) => !prev)}
                style={{ direction: "ltr" }}
                className="menue  cursor-pointer text-white"
              >
                <LucideMenu />
              </div>
            </div>
            {open && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "fit-content" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.4 }}
                className="w-[250px] overflow-hidden absolute top-4 left-0 mt-2 rounded-md shadow-md bg-bglight text-[20px] text-amber-600  px-6 py-2 flex flex-col items-center"
              >
                {option.map((line, index) => (
                  <Link
                    href={
                      currentuser !== null && line.text == "الملف  الشخصى"
                        ? `${
                            currentuser.type == "user"
                              ? "userprivatepage"
                              : "vendorprivatepage"
                          }/${currentuser.data ? currentuser.data.id : ""}`
                        : `${line.to}`
                    }
                    key={index}
                    className="flex-two relative cursor-pointer w-[150px] border-b border-b-amber-600 py-2"
                  >
                    {line.icon}
                    <p className="text-secend_color whitespace-nowrap text-[13px]">
                      {line.text}
                    </p>
                    {messageunread && line.text == "صندوق الرسائل " && (
                      <span className=" absolute left-0 bg-red-500 w-3 h-3 rounded-full"></span>
                    )}
                  </Link>
                ))}

                {currentuser &&
                  (currentuser.data.role == "serviceinspector" ||
                    currentuser.data.role == "customerservice") && (
                    <Link
                      className="flex-two relative cursor-pointer w-[150px] border-b border-b-amber-600 py-2"
                      href={
                        currentuser?.data?.role == "serviceinspector"
                          ? "/dashbord/services"
                          : "/dashbord/servicecustomers"
                      }
                    >
                      <LayoutDashboard />
                      <p className="text-secend_color whitespace-nowrap text-[13px]">
                        لوحة التحكم
                      </p>
                    </Link>
                  )}

                <h1 className="text-secend_color text-[14px] text-center mt-4">
                  تابع الخصومات وساعدنا فى التطور باقتراحتك من خلال وسائل
                  التواصل{" "}
                </h1>
                <div className="icons flex items-center flex-row-reverse gap-3 mt-4">
                  {icons.map((path, index) => (
                    <Image
                      key={index}
                      src={path}
                      alt="path"
                      width={500}
                      height={500}
                      className="w-[20px]"
                    />
                  ))}
                </div>
                <div
                  onClick={handlelogout}
                  className="logout cursor-pointer flex items-center gap-6 mt-4 text-[18px] "
                >
                  <p className="text-secend_color">تسجيل الخروج </p>
                  <LogOut />
                </div>
              </motion.div>
            )}
          </div>
        )
      ) : (
        <Link
          href={"/quikaccess"}
          className="sign-btn rounded-md shadow-md px-2 py-1 bg-white flex-between"
        >
          <h1>Sign in </h1>
          <LogIn />
        </Link>
      )}
    </>
  );
}
