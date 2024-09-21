"use client";
import { instance } from "@/app/Api/axios";
import { arabic } from "@/app/content/AR";
import { UseVariabels } from "@/app/context/VariabelsContext";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingDashbord from "../LoadingDashbord";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/ar"; // استيراد الترجمة العربية
import relativeTime from "dayjs/plugin/relativeTime"; // استيراد ملحق relativeTime
import StartConversationLink from "./StartConversationLink";

dayjs.extend(relativeTime);
dayjs.locale("ar");

export default function OrderBody({ order_id }: any) {
  const { currentuser, id } = UseVariabels();
  const [data, setdata] = useState<any>(null);
  const [offers, setoffers] = useState<any>([]);
  const [location, setlocation] = useState<any>({});
  const [offer, setoffer] = useState("");
  useEffect(() => {
    const getdata = async (api: string, set: React.Dispatch<any>) => {
      try {
        const res = await instance.get(api);
        set(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getdata(`/order/${order_id}`, setdata);
    getdata(`/order-offers/${order_id}`, setoffers);
  }, [order_id]);

  const addoffer = async () => {
    try {
      const formdata = new FormData();
      formdata.append("offer", offer);
      formdata.append("sender_id", id);
      formdata.append("sender_type", currentuser.type);
      formdata.append("order_id", order_id);
      const res = await instance.post("/orderoffer-add", formdata);
      setoffers((prev: any) => [
        ...prev,
        {
          ...res.data.data,
          sender: {
            id: currentuser?.data?.id,
            name: currentuser?.data?.name,
            image: currentuser?.data?.image || "/images/userbg.png",
            rating: currentuser?.data?.rating,
            account_type: currentuser?.data?.account_type,
          },
          sender_type: currentuser.type,
        },
      ]);
      setoffer("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setlocation(JSON.parse(data.sender.location));
    }
  }, [data]);

  const ordertime = data && data.created_at;
  const timeAgo = dayjs(ordertime).fromNow();

  return (
    <>
      {data !== null ? (
        <div className="main-page  w-[85%] max-md:w-[98%] m-auto px-4 py-2 bg-bglight rounded-md shadow-md h-fit mt-6">
          <div className="order flex items-center justify-evenly max-lg:flex-col">
            <div className="w-1/2 max-lg:w-full">
              <h1 className="text-3xl max-md:whitespace-normal whitespace-nowrap text-main_color my-4 w-3/4 max-md:w-full">
                {data?.title}
              </h1>
              <Image
                src={data?.image ? data?.image : "/images/empty-order.png"}
                alt="service"
                width={1024}
                height={1280}
                className="w-[500px] max-lg:m-auto h-[300px] rounded-md"
              />
              <div className="flex-between w-[98%] m-auto  mt-2">
                <div className="flex-two text-amber-600">
                  <MapPinIcon />
                  <p className="text-black">{location && location?.address}</p>
                </div>
                <p className="text-[15px] ml-9">{timeAgo}</p>
              </div>
            </div>
            <div className="flex flex-col items-center w-1/2 max-lg:w-full">
              <h1 className="my-1">وصف الطلب</h1>
              <div className=" w-[400px] h-[200px] max-md:w-full  max-h-fit overflow-y-auto shadow-md border rounded-md px-2 py-1">
                {data?.Service_descripe}
              </div>
            </div>
          </div>
          <h1 className="text-2xl my-3">العروض المقدمة </h1>
          <div className="offers mt-4  py-2 grid gap-4 justify-items-center grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 ">
            {offers && offers.length > 0 ? (
              offers.map((offer: any, index: number) => {
                const offertime = offer?.created_at;
                const timeago = dayjs(offertime).fromNow();
                return (
                  <div
                    className="px-4 py-2 my-2 relative w-full max-md:w-[98%] bg-bglight max-md:my-1 h-fit flex items-start flex-col gap-2 border rounded-md shadow-xl"
                    key={index}
                  >
                    <Link
                      href={`/${
                        offer?.sender_type == "user"
                          ? "userpublicpage"
                          : "vendorpublicpage"
                      }/${offer?.sender?.id}`}
                      className="flex items-start gap-2"
                    >
                      <Image
                        src={offer?.sender?.image || "/images/userbg.png"}
                        alt="image"
                        width={1024}
                        height={1280}
                        className="w-[50px] h-[50px] "
                      />
                      <div className="name text-sky-500 whitespace-nowrap">
                        {offer?.sender?.name}
                      </div>
                    </Link>
                    <div className="content">
                      <div
                        style={{ overflowWrap: "anywhere" }}
                        className=" text-[12px]"
                      >
                        {offer.offer}
                      </div>
                      <div className="text-[10px] text-secend_text">
                        الاعجاب . الرد . {timeago}
                      </div>
                    </div>
                    <div className="chat absolute top-1 left-3">
                      <StartConversationLink
                        secendparty_id={offer?.sender?.id}
                        secendparty_type={offer?.sender?.account_type}
                      />
                    </div>
                    <div className="reating flex-two absolute bottom-1 left-2">
                      <Image
                        src={"/images/star.png"}
                        alt="chat"
                        width={1024}
                        height={1280}
                        className="w-[15px]"
                      />
                      <p>{offer?.sender?.rating}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-[40vh] flex items-center justify-center">
                لم يتم إضافة اى عروض حتى الأن !{" "}
              </div>
            )}
          </div>
          {currentuser && currentuser?.data?.is_guest ? (
            <h1>ستحتاج إلى حساب فعلى للتمكن من إرسال العروض !</h1>
          ) : (
            <div className=" w-[300px] max-md:w-[98%] shadow-md rounded-md h-fit">
              <div className="relative">
                <textarea
                  name="offer"
                  value={offer}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setoffer(e.target.value)
                  }
                  className="w-full p-3 pr-14 h-[65px] text-secend_text rounded-t-md bg-bglight border shadow-md whitespace-wrap  py-1 placeholder-shown:pr-14 outline-none placeholder-shown:py-1 "
                  placeholder="أضف عرضك "
                />
                <Image
                  src={
                    currentuser?.data?.image
                      ? currentuser?.data?.image
                      : "/images/userbg.png"
                  }
                  alt="image"
                  width={1024}
                  height={1280}
                  className="w-[50px] absolute top-2 right-1 "
                />
              </div>
              <div className="bg-[#ddd]/70 h-[50px] rounded-b-md flex items-end px-2">
                <input
                  onClick={addoffer}
                  type="submit"
                  value="نشر"
                  className="px-4 py-1 bg-secend_color cursor-pointer text-white w-fit mr-auto my-2 "
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <LoadingDashbord />
      )}
    </>
  );
}
