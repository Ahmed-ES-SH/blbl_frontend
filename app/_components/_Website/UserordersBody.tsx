"use client";
import { ChevronLeft, ChevronRight, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { allstring } from "@/app/types/dashbordcontenttypes";
import { instance } from "@/app/Api/axios";
import { UseVariabels } from "@/app/context/VariabelsContext";

export default function UserordersBody() {
  const { id, currentuser } = UseVariabels();
  const [ordersbyuser, setordersbyuser] = useState<allstring[] | null>([]);
  const [offersCountMap, setOffersCountMap] = useState<{
    [key: number]: number;
  }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchvendorData = async () => {
      try {
        const res = await instance.get(
          `/orders-vendor/${id}?page=${currentPage}`
        );
        setordersbyuser(res.data.data);
        setCurrentPage(res.data.current_page);
        setLastPage(res.data.last_page);
        setTotal(res.data.total);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchuserData = async () => {
      try {
        const res = await instance.get(
          `/orders/${id}/${currentuser.type}?page=${currentPage}`
        );
        setordersbyuser(res.data.data);
        setCurrentPage(res.data.current_page);
        setLastPage(res.data.last_page);
        setTotal(res.data.total);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      if (currentuser && currentuser.type == "user") {
        fetchuserData();
      } else {
        fetchvendorData();
      }
    }
  }, [id, currentPage, currentuser]);

  useEffect(() => {
    const fetchOffersCounts = async () => {
      if (ordersbyuser) {
        const counts = await Promise.all(
          ordersbyuser.map(async (order) => {
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
  }, [ordersbyuser]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="main-page h-[77vh] overflow-y-auto w-full relative mt-16 lg:px-8">
        <div className="relative w-fit m-auto">
          <h1 className="text-3xl">عدد الطلبات</h1>
        </div>
        <div className="mt-8 grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4 px-2 pb-4 w-full">
          {ordersbyuser && ordersbyuser.length > 0 ? (
            ordersbyuser.map((order: any, index: number) => (
              <Link
                href={`/orders/${order.id}`}
                key={index}
                className="w-full h-fit flex flex-col items-start rounded-t-md border shadow-md"
              >
                <Image
                  src={order?.image ? order?.image : "/images/empty-order.png"}
                  alt="image"
                  width={1024}
                  height={1280}
                  className="w-full h-[200px] rounded-t-md"
                />
                <div className="content w-full px-2 mt-1">
                  <h1 className="text-[18px] text-secend_color">
                    {order?.title}
                  </h1>
                  <p className="text-[14px] text-secend_text">
                    {order?.description}
                  </p>
                  <div className="flex-two w-fit mr-auto py-2 text-[15px] text-secend_text">
                    <p>{offersCountMap[order.id] || 0}</p>
                    <MessageCircleMore width={20} />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h1 className="text-center text-[20px] whitespace-nowrap">
              لا يوجد طلبات خاصة بك حتى الأن
            </h1>
          )}
        </div>
        {ordersbyuser && ordersbyuser.length > 0 && (
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
                  {index + 1}
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
        )}
      </div>
    </>
  );
}
