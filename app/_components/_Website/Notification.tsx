"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { instance } from "@/app/Api/axios";
import { UseVariabels } from "@/app/context/VariabelsContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import Link from "next/link";
import {
  ShoppingBasketIcon,
  ShoppingCart,
  ShoppingCartIcon,
} from "lucide-react";

// إعداد dayjs لاستخدام اللغة العربية
dayjs.locale("ar");
dayjs.extend(relativeTime);

export default function Notifications() {
  const { id, currentuser, maincard } = UseVariabels();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>([]);

  const getData = async () => {
    try {
      const res = await instance.get(
        `/notifications-${
          currentuser && currentuser.type === "user" ? "user" : "vendor"
        }/${id}`
      );
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // استخدام useEffect لتحديث البيانات كل 4 دقائق
  useEffect(() => {
    if (id) {
      getData();
      const interval = setInterval(getData, 120000); // 240000 ملي ثانية = 4 دقائق
      return () => clearInterval(interval); // تنظيف الـ interval عند إلغاء التثبيت
    }
  }, [id, currentuser]);

  // تحقق إذا كانت هناك إشعارات غير مقروءة
  const hasUnreadNotifications = data.some(
    (notification: any) => !notification.read
  );

  // تحديث حالة الإشعارات إلى مقروءة عند فتح جزء الإشعارات
  const markAsRead = async () => {
    if (hasUnreadNotifications) {
      try {
        await instance.post(
          `/notifications-${
            currentuser && currentuser.type === "user" ? "user" : "vendor"
          }-read/${id}`
        );
        setData((prevData: any) =>
          prevData.map((notification: any) => ({
            ...notification,
            read: true,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
    if (!open) {
      markAsRead(); // علامة مقروءة عند فتح الإشعارات
    }
  };

  return (
    <>
      {currentuser && !currentuser?.data?.is_guest && (
        <div className="bell flex items-center gap-2 z-[999] relative">
          <div onClick={handleOpen} className="bell cursor-pointer relative">
            <Image
              alt="bell"
              src="/images/bell.png"
              height={1280}
              width={1024}
              className="w-[32px]"
            />
            {hasUnreadNotifications && (
              <span className="absolute top-0 right-0 w-[15px] h-[15px] rounded-full bg-red-500" />
            )}
          </div>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "fit-content" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4 }}
              className="w-[230px] max-h-[40vh] overflow-y-auto absolute top-8 overflow-hidden mt-2 rounded-md shadow-md bg-bglight text-[20px] text-amber-600  px-6 py-2 flex flex-col items-center"
            >
              {data && data.length > 0 ? (
                data.map((line: any, index: number) => {
                  const timeAgo = dayjs(line.created_at).fromNow();
                  return (
                    <div
                      key={index}
                      className={`cursor-pointer w-[150px] border-b border-b-amber-600 py-2 ${
                        line.read ? "opacity-50" : ""
                      }`}
                    >
                      <p className="text-secend_color text-[15px]">
                        {line.message}
                      </p>
                      <p className="text-secend_color text-[10px]">{timeAgo}</p>
                    </div>
                  );
                })
              ) : (
                <div className="w-full h-[30vh] flex items-center justify-center">
                  <h1 className="text-center   whitespace-nowrap text-[14px] ">
                    لا يوجد إشعارات حتى الأن !{" "}
                  </h1>
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}
