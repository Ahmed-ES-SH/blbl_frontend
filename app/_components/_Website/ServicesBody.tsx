"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { instance } from "@/app/Api/axios";
import LoadingDashbord from "../LoadingDashbord";
import { allstring } from "@/app/types/dashbordcontenttypes";
import TopTenSlider from "./TopTenSlider";
import StartConversationLink from "./StartConversationLink";
import dayjs from "dayjs"; // استيراد مكتبة dayjs
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";

dayjs.locale("ar");
dayjs.extend(relativeTime); // تفعيل ملحق relativeTime

export default function ServicesBody() {
  const [data, setData] = useState<any>(null);
  const [datasearch, setdatasearch] = useState<any>([]);
  const [error, setError] = useState<string>("");
  const [nameSearch, setNameSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);

  const fetchAllservices = async (page: number) => {
    const cacheKey = `all-services-page-${page}`;
    const cacheTimeKey = `${cacheKey}-time`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);
    const now = new Date().getTime();

    if (cachedData && cachedTime) {
      // التحقق من مرور نصف ساعة (1800000 مللي ثانية = 30 دقيقة)
      if (now - parseInt(cachedTime) < 120000) {
        // إذا كانت البيانات موجودة ولم تنقضِ 30 دقيقة، قم باستخدامها
        const data = JSON.parse(cachedData);
        setData(data.data);
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
        return;
      } else {
        // حذف البيانات المخزنة إذا مرت نصف ساعة
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(cacheTimeKey);
      }
    }

    setLoading(true);
    try {
      const res = await instance.get(`/services-published`, {
        params: { page },
      });
      console.log(res);
      setData(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);

      // حفظ البيانات ووقت الحفظ في التخزين المؤقت
      localStorage.setItem(cacheKey, JSON.stringify(res.data));
      localStorage.setItem(cacheTimeKey, now.toString());
    } catch (error) {
      setError("خطأ في جلب البيانات");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchsearchservices = async (page: number) => {
    const cacheKey = `search-${nameSearch}-page-${page}`;
    const cacheTimeKey = `${cacheKey}-time`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);
    const now = new Date().getTime();

    if (cachedData && cachedTime) {
      // التحقق من مرور نصف ساعة (1800000 مللي ثانية = 2 دقيقة)
      if (now - parseInt(cachedTime) < 120000) {
        // إذا كانت البيانات موجودة ولم تنقضِ 2 دقيقة، قم باستخدامها
        const data = JSON.parse(cachedData);
        setdatasearch(data.data);
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
        return;
      } else {
        // حذف البيانات المخزنة إذا مرت نصف ساعة
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(cacheTimeKey);
      }
    }

    setLoading(true);
    setdatasearch([]);
    setCurrentPage(1);
    try {
      const res = await instance.get(`/services-name`, {
        params: { titlesearch: nameSearch, page },
      });
      setdatasearch(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);

      // حفظ البيانات ووقت الحفظ في التخزين المؤقت
      localStorage.setItem(cacheKey, JSON.stringify(res.data));
      localStorage.setItem(cacheTimeKey, now.toString());
    } catch (error) {
      setError("خطأ في جلب البيانات");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // التعامل مع تغيير الصفحة
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const delay_data = setTimeout(() => {
      if (nameSearch.trim() === "") {
        // إذا كان مربع البحث فارغًا، قم بجلب كل الخدمات من جديد
        fetchAllservices(currentPage);
        setdatasearch([]); // مسح نتائج البحث إذا كانت موجودة
      } else {
        // إذا كان هناك نص في مربع البحث، قم بجلب البيانات بناءً على البحث
        fetchsearchservices(currentPage);
      }
    }, 800);

    return () => clearTimeout(delay_data);
  }, [nameSearch, currentPage]);

  const currentdata = datasearch.length > 0 ? datasearch : data;
  return (
    <>
      {data == null ? (
        <LoadingDashbord />
      ) : (
        <div className="main-page relative mt-16">
          <div className="inputsearch flex items-center gap-2 relative w-[50%] max-lg:w-3/4 max-md:w-[97%] m-auto">
            <div className="relative w-full">
              <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNameSearch(e.target.value)
                }
                name="titlesearch"
                value={nameSearch}
                placeholder="إبحث عن خدمتك ..."
                className="w-full bg-bglight rounded-md shadow-md h-[40px] pr-9 px-4 py-2 outline-none placeholder-shown:px-4 placeholder-shown:py-2 placeholder-shown:pr-9 placeholder-shown:text-[18px]"
              />
              <Search className="absolute right-2 top-2 text-secend_text" />
              <SlidersHorizontal className="absolute left-2 top-2 text-secend_text" />
            </div>
          </div>
          <div className="w-[80%] my-8 max-lg:w-[95%] m-auto">
            <h1 className="text-2xl block w-full mb-6 px-4 self-start">
              الأعلى تقييما
            </h1>
            <TopTenSlider />
          </div>
          {loading ? (
            <LoadingDashbord />
          ) : (
            <div className="mt-8 px-4 mb-3 grid gap-x-8 max-md:gap-2 grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
              {currentdata.map((order: any, index: number) => {
                const vendor: allstring = order.vendor;
                const time = order?.created_at;

                return (
                  <div
                    className="px-4 py-2 relative my-2 bg-bglight max-md:my-1 h-fit flex items-start gap-4 border rounded-md shadow-md"
                    key={index}
                  >
                    <Link href={`/vednorpublicpage/${vendor.id}`}>
                      <Image
                        src={vendor.image}
                        alt="image"
                        width={1024}
                        height={1280}
                        className="w-[50px] h-[50px] self-center border-[4px] border-secend_color rounded-full"
                      />
                    </Link>
                    <Link
                      href={`/services/${order.id}`}
                      className="content w-full"
                    >
                      <p className="text-[20px]  max-md:text-[22px] max-sm:text-[18px] whitespace-nowrap">
                        {order.title}
                      </p>
                      <p className="text-secend_text mb-1">{order.location}</p>
                      <p className="text-[12px]">{dayjs(time).fromNow()}</p>
                      <div className="w-fit mr-auto">
                        <StartConversationLink
                          secendparty_id={order.vendor_id}
                          secendparty_type={"vendor"}
                        />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
          <div className="pagenation-group text-[30px] text-secend_color w-fit my-2 px-3 py-1 mr-auto flex items-center justify-between">
            <ChevronRight
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage > 1 ? "cursor-pointer" : "text-gray-400"}
            />
            <div className="numbers bg-secend_color/50 text-[14px] text-black px-2 py-1 rounded-md flex items-center gap-1">
              {[...Array(lastPage)].map((_, index) => {
                const page = index + 1;
                const isCurrentPage = page === currentPage;

                // إذا كان العدد الكلي للصفحات أقل أو يساوي 7، عرض جميع الصفحات
                if (lastPage <= 7) {
                  return (
                    <p
                      key={index}
                      className={
                        isCurrentPage
                          ? "text-white text-[15px] cursor-pointer"
                          : "cursor-pointer text-[15px]"
                      }
                      onClick={() => handlePageChange(page)}
                    >
                      , {page}
                    </p>
                  );
                }

                // إذا كنت في الصفحات الأولى (1-3)، عرض أول ثلاث صفحات
                if (currentPage <= 3 && page <= 3) {
                  return (
                    <p
                      key={index}
                      className={
                        isCurrentPage
                          ? "text-white text-[15px] cursor-pointer"
                          : "cursor-pointer text-[15px]"
                      }
                      onClick={() => handlePageChange(page)}
                    >
                      , {page}
                    </p>
                  );
                }

                // إذا كنت في الصفحات الأخيرة، عرض آخر ثلاث صفحات
                if (currentPage >= lastPage - 2 && page >= lastPage - 2) {
                  return (
                    <p
                      key={index}
                      className={
                        isCurrentPage
                          ? "text-white text-[15px] cursor-pointer"
                          : "cursor-pointer text-[15px]"
                      }
                      onClick={() => handlePageChange(page)}
                    >
                      , {page}
                    </p>
                  );
                }

                // عرض الصفحة الحالية مع الصفحات المجاورة
                if (
                  page === currentPage ||
                  page === currentPage - 1 ||
                  page === currentPage + 1
                ) {
                  return (
                    <p
                      key={index}
                      className={
                        isCurrentPage
                          ? "text-white text-[15px] cursor-pointer"
                          : "cursor-pointer text-[15px]"
                      }
                      onClick={() => handlePageChange(page)}
                    >
                      ,{page}
                    </p>
                  );
                }

                // إضافة النقاط المتتالية "..." عند الحاجة
                if (
                  (page === 2 && currentPage > 3) ||
                  (page === lastPage - 1 && currentPage < lastPage - 2)
                ) {
                  return (
                    <span key={index} className="text-[15px] mx-1">
                      ...
                    </span>
                  );
                }

                // إذا لم تنطبق أي حالة، لا تعرض شيء
                return null;
              })}
            </div>
            <ChevronLeft
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage < lastPage ? "cursor-pointer" : "text-gray-400"
              }
            />
          </div>
        </div>
      )}
    </>
  );
}
