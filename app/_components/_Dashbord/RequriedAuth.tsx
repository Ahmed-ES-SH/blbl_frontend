"use client";
import { instance } from "@/app/Api/axios";
import React, { useEffect, useState } from "react";
import ForbiddenPage from "../_Website/ForbddenPage";
import Loading3S from "../Loading3S";

export default function RequiredAuth({ children }: any) {
  const [currentuser, setcurrentuser] = useState<any>(null);
  const [loadingstate, setloadingstate] = useState(true); // لإظهار التحميل أثناء جلب البيانات

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await instance.get("/user");
        setcurrentuser(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setloadingstate(false);
      }
    };
    getdata();
  }, []);

  // عرض "جارٍ التحميل" أثناء جلب البيانات
  if (loadingstate) {
    return <Loading3S />;
  }

  // التحقق إذا كان المستخدم ليس admin، يتم إعادة التوجيه لصفحة 403
  if (!currentuser || !currentuser.data) {
    return <ForbiddenPage />;
  }

  const userRole = currentuser.data.role;
  if (
    userRole !== "Admin" &&
    userRole !== "serviceinspector" &&
    userRole !== "customerservice"
  ) {
    return <ForbiddenPage />;
  }

  // إذا كان المستخدم يملك صلاحيات، عرض المحتويات (الأطفال)
  return <>{children}</>;
}
