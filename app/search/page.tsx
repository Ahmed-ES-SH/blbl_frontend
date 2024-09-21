"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../_components/_Website/Navbar";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircleMore,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { instance } from "../Api/axios";
import { allstring } from "../types/dashbordcontenttypes";
import LoadingDashbord from "../_components/LoadingDashbord";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";

// إعداد dayjs لاستخدام اللغة العربية
dayjs.locale("ar");
dayjs.extend(relativeTime);

export default function SearchPage() {
  const [data, setData] = useState<allstring[]>([]);
  const [datasearch, setdatasearch] = useState<allstring[]>([]);
  const [error, setError] = useState<string>("");
  const [nameSearch, setNameSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [offersCountMap, setOffersCountMap] = useState<{
    [key: number]: number;
  }>({});

  // دالة لجلب البيانات العامة
  const fetchAllOrders = async (page: number) => {
    setLoading(true);
    try {
      const res = await instance.get(`/orders`, { params: { page: page } });
      setData(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);
      setLoading(false);
    } catch (error: any) {
      setError("خطأ في جلب البيانات");
      setLoading(false);
    }
  };

  // دالة لجلب البيانات بناءً على البحث
  const fetchOrders = async (page: number) => {
    setLoading(true);
    try {
      const res = await instance.get(`/orders-name`, {
        params: { titlesearch: nameSearch, page: page },
      });
      setdatasearch(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);
      setLoading(false);
    } catch (error: any) {
      setError("خطأ في جلب البيانات");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOffersCounts = async () => {
      if (data) {
        const counts = await Promise.all(
          data.map(async (order) => {
            try {
              const res = await instance.get(`/offers-count/${order.id}`);
              return { orderId: order.id, count: res.data.data };
            } catch (error) {
              console.log(error);
              return { orderId: order.id, count: 0 };
            }
          })
        );
        const countsMap = counts.reduce((acc: any, cur: any) => {
          acc[cur.orderId] = cur.count;
          return acc;
        }, {} as { [key: number]: number });
        setOffersCountMap(countsMap);
      }
    };

    fetchOffersCounts();
  }, [data]);

  useEffect(() => {
    if (nameSearch) {
      fetchOrders(currentPage);
    } else {
      fetchAllOrders(currentPage);
    }
  }, [currentPage, nameSearch]);

  // التعامل مع تغيير الصفحة
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  const currentdata = nameSearch ? datasearch : data;

  return (
    <>
      <div className="w-full overflow-hidden main-bg">
        <Navbar />
        <div className="main-page relative mt-16">
          <div className="flex items-center gap-2">
            <div className="inputsearch flex items-center gap-2 relative w-[40%] max-md:w-3/4 max-sm:w-[97%] m-auto">
              <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNameSearch(e.target.value)
                }
                name="titlesearch"
                placeholder="إكتب كلمات مفتاحية..."
                className="w-full bg-bglight rounded-md shadow-md h-[40px] pr-9 px-4 py-2 outline-none placeholder-shown:px-4 placeholder-shown:py-2 placeholder-shown:pr-9 placeholder-shown:text-[18px]"
              />
              <Search className="absolute right-2 top-2 text-secend_text" />
              <button
                onClick={() => {
                  setCurrentPage(1); // العودة إلى الصفحة الأولى عند البحث
                  fetchOrders(1);
                }}
                className={`py-2 px-6 ${
                  nameSearch ? "visible" : "invisible"
                } text-white bg-secend_color rounded-md shadow-md`}
              >
                بحث
              </button>
            </div>
          </div>

          {loading ? (
            <div className="w-full flex items-center justify-center">
              <LoadingDashbord />
            </div>
          ) : currentdata.length > 0 ? (
            <div className="w-full  mt-8 px-4 mb-3 grid gap-x-8 max-md:gap-2 grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
              {currentdata.map((order: any, index: number) => {
                const timeAgo = dayjs(order.created_at).fromNow(); // حساب الوقت منذ إنشاء الطلب

                return (
                  <Link
                    href={`/orders/${order?.id}`}
                    className="px-4 py-2 relative my-2 bg-bglight max-md:my-1 h-fit flex items-start gap-4 border rounded-md shadow-md overflow-hidden"
                    key={index}
                  >
                    <Link
                      href={`/${
                        order?.sender_type == "user"
                          ? "userpublicpage"
                          : "vendorpublicpage"
                      }/${order?.sender?.id}`}
                    >
                      <Image
                        src={order?.sender?.image || "/images/userbg.png"}
                        alt="image"
                        width={1024}
                        height={1280}
                        className="w-[50px] h-[50px] self-center border-[4px] border-secend_color rounded-full"
                      />
                    </Link>
                    <div className="content">
                      <p className="text-[20px] max-md:text-[22px] max-sm:text-[18px] whitespace-nowrap w-[150px] overflow-hidden text-ellipsis">
                        {order?.title}
                      </p>
                      <p className="text-secend_text mb-1">{order?.location}</p>
                      <p className="text-[12px]"> {timeAgo}</p>
                    </div>
                    <div className="offers text-secend_text flex-two absolute bottom-2 left-4">
                      <p>{offersCountMap[order?.id] || 0}</p>
                      <MessageCircleMore />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="w-full mt-8 h-[50vh] gap-3 flex flex-col items-center justify-center">
              <h1>لا يوجد طلبات تلائم ما تبحث عنة حتى الأن</h1>
              <Image
                src={"/images/empty.svg"}
                alt="image"
                width={1024}
                height={1280}
                className="w-[300px]"
              />
            </div>
          )}

          <div className="pagenation-group text-[30px] text-secend_color w-fit my-2 px-3 py-1 mr-auto flex items-center justify-between">
            <ChevronRight
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage > 1 ? "cursor-pointer" : "text-gray-400"}
            />
            <div className="numbers bg-secend_color/50 text-[14px] text-black px-2 py-1 rounded-md flex items-center gap-1">
              {[...Array(lastPage)].map((_, index) => (
                <p
                  key={index}
                  className={
                    index + 1 === currentPage
                      ? "text-white text-[15px] cursor-pointer"
                      : "cursor-pointer text-[15px]"
                  }
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1},
                </p>
              ))}
            </div>
            <ChevronLeft
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage < lastPage ? "cursor-pointer" : "text-gray-400"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
