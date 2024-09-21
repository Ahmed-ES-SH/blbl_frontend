/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { instance } from "../../Api/axios";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  MessageCircleCode,
} from "lucide-react";
import {
  mapeletype,
  pagenationtableprops,
} from "@/app/types/dashbordcontenttypes";
import LoadingDashbord from "../LoadingDashbord";
import { usePathname, useRouter } from "next/navigation";
import { UseVariabels } from "@/app/context/VariabelsContext";
import DeleteBtn from "./DeleteBtn";

///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////

const PaginatedTable: React.FC<pagenationtableprops> = ({
  headers,
  api,
  apidelete,
  keys,
}) => {
  const { id, currentuser } = UseVariabels();
  const [data, setdata] = useState<any>(null);
  const [refresh, setrefresh] = useState(false);
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);

  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const getdata = async (page: any) => {
      try {
        setloading(true);
        const res = await instance.get(api, { params: { page: page } });
        setdata(res.data.data);
        setCurrentPage(res.data.current_page);
        setLastPage(res.data.last_page);
        setloading(false);
      } catch (err) {
        setloading(false);
        console.log(err);
      }
    };
    getdata(currentPage);
  }, [currentPage]);

  async function hadledelete(apidelete: string, id: number) {
    try {
      const res = await instance.delete(`${apidelete}/${id}`);
      setdata((prevData: { [key: string]: any }) =>
        prevData.filter((item: any) => item.id !== id)
      );
      setrefresh((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  const handleStartConversationuser = async (
    secend_party_id: any,
    conversation_type: any
  ) => {
    setloading(true);
    try {
      // تحقق من وجود المحادثة أو أنشئ محادثة جديدة
      const formdata = new FormData();
      formdata.append("agent_id", id);
      formdata.append("secend_party_id", secend_party_id);
      formdata.append("conversation_type", conversation_type);
      const res = await instance.post("/customerconversations/make", formdata);
      const conversationId = res.data.data.id;
      router.push(`/dashbord/customerconversations/${conversationId}`);
    } catch (error) {
      console.error("Error creating conversation:", error);
    } finally {
      setloading(false);
    }
  };
  const handleStartConversationvendor = async (vendor_id: any) => {
    setloading(true);
    try {
      // تحقق من وجود المحادثة أو أنشئ محادثة جديدة
      const formdata = new FormData();
      formdata.append("agent_id", id);
      formdata.append("vendor_id", vendor_id);
      const res = await instance.post("/conversations-vendor", formdata);
      const conversationId = res.data.data.id;
      router.push(`/conversations/${conversationId}`);
    } catch (error) {
      console.error("Error creating conversation:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingDashbord />
      ) : (
        <div className="rounded-sm  border hidden-scrollbar h-[500px] overflow-y-auto border-gray-200/30 text-black mt-2">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-300/20   dark:bg-secend_dash ">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  {headers.map((head: string, index: number) => (
                    <th
                      key={index}
                      className="whitespace-nowrap text-right px-4 py-2 font-medium text-gray-900 dark:text-secend_text  "
                    >
                      {head}
                    </th>
                  ))}
                  {api !== "" && pathname != "/dashbord" && (
                    <th className="whitespace-nowrap text-right dark:text-secend_text px-4 py-2 font-medium ">
                      إجراء
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="dark:odd:divide-y dark:divide-gray-400/50 dark:bg-secend_dash divide-y divide-gray-200">
                {data == null ? (
                  <tr>
                    <td colSpan={12} className="bg-main_dash">
                      <LoadingDashbord />
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item: mapeletype, index: number) => (
                    <tr className=" odd:bg-sky-500/30" key={index}>
                      {keys.map((key: string, index: number) => (
                        <td
                          className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-secend_text"
                          key={index}
                        >
                          {key == "image" ? (
                            <Image
                              src={item[key] || "/images/userbg.png"}
                              alt="logo"
                              width={1024}
                              height={1280}
                              className="w-[60px] h-[60px] rounded-full"
                            />
                          ) : key == "images" ? (
                            <div className="flex items-center gap-2 max-w-[200px] overflow-hidden">
                              {item[key].map((src: string, index: number) => (
                                <img
                                  key={index}
                                  src={src}
                                  alt="alt"
                                  className="w-[50px] h-[40px] rounded-sm"
                                />
                              ))}
                            </div>
                          ) : key == "vendor" ? (
                            <Image
                              src={
                                item["vendor"]?.image || "/images/userbg.png"
                              }
                              width={1024}
                              height={1280}
                              alt="logo"
                              className="w-[60px] h-[60px] rounded-full"
                            />
                          ) : key == "vendor.name" ? (
                            item["vendor"]?.name
                          ) : key == "message" ? (
                            <p className="max-w-[100px] overflow-hidden">
                              {item["message"]}
                            </p>
                          ) : key == "message_status" ? (
                            <p
                              className={`px-3  py-2 w-fit rounded-md  dark:text-white text-center ${
                                item["message_status"] == "resolved"
                                  ? "bg-green-400/60"
                                  : item["message_status"] == "pending"
                                  ? "bg-red-400/60"
                                  : "bg-yellow-400/60"
                              }`}
                            >
                              {item["message_status"] == "resolved"
                                ? "تمة المراجعة"
                                : item["message_status"] == "pending"
                                ? "فى إنتظار المراجعة"
                                : "فى طور المراجعة"}
                            </p>
                          ) : key == "user.image" ? (
                            <Image
                              src={item["user"]?.image || "/images/userbg.png"}
                              width={1024}
                              height={1280}
                              alt="logo"
                              className="w-[60px] h-[60px] rounded-full"
                            />
                          ) : key == "user.id" ? (
                            item["user"]?.id
                          ) : key == "user.name" ? (
                            item["user"]?.name
                          ) : item["created_at"] && key == "created_at" ? (
                            item[key].split("T")[0] +
                            " " +
                            item[key].split("T")[1].split(".")[0]
                          ) : item["updated_at"] && key == "updated_at" ? (
                            item[key].split("T")[0] +
                            " " +
                            item[key].split("T")[1].split(".")[0]
                          ) : key == "status" ? (
                            <p
                              className={`px-3  py-2 w-fit rounded-md  dark:text-white text-center ${
                                item["status"] != "pending"
                                  ? "bg-green-400/60"
                                  : "bg-red-400/60"
                              }`}
                            >
                              {item["status"] != "pending"
                                ? "منشورة"
                                : "فى إنتظار الموافقة"}
                            </p>
                          ) : key == "bill_status" ? (
                            <p
                              className={`px-3  py-2 w-fit rounded-md  dark:text-white text-center ${
                                item["bill_status"] != false
                                  ? "bg-green-400/60"
                                  : "bg-red-400/60"
                              }`}
                            >
                              {item["bill_status"] == true
                                ? "نم الدفع"
                                : "فشل الدفع"}
                            </p>
                          ) : key == "order" ? (
                            <div className="flex items-center gap-2 ">
                              <p>({item[key].length})</p>
                              {item[key].map(
                                (
                                  order: { [key: string]: string },
                                  index: number
                                ) => {
                                  return (
                                    <div key={index} className="">
                                      {order.images && (
                                        <Image
                                          key={index}
                                          src={order.images[0] || ""}
                                          alt="alt"
                                          width={1024}
                                          height={1280}
                                          className="w-[20px] h-[20px] rounded-full"
                                        />
                                      )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          ) : key == "order_status" ? (
                            item[key] == true ? (
                              <p
                                className={`px-1  py-2 rounded-md dark:text-white text-center bg-green-400`}
                              >
                                تم التحويل
                              </p>
                            ) : (
                              <p
                                className={`px-1  py-2 rounded-md dark:text-white text-center bg-red-400`}
                              >
                                فى انتظار المراجعة
                              </p>
                            )
                          ) : key == "balance" ? (
                            <p>${item["vendor"]?.balance}</p>
                          ) : (
                            item[key]
                          )}
                        </td>
                      ))}
                      {api !== "" && pathname != "/dashbord" && (
                        <td>
                          <div className="flex items-center gap-3">
                            <Link
                              className="text-sky-500"
                              href={`/dashbord${api}/${item["id"]}`}
                            >
                              <Edit />
                            </Link>

                            {/* زر الحذف */}
                            <DeleteBtn
                              api={api}
                              hadledelete={hadledelete}
                              apidelete={apidelete}
                              item={item}
                            />

                            {/* زر الرسالة */}
                            {(api === "/messagescustomer" ||
                              api === "/messagesvendor") && (
                              <button
                                onClick={() => {
                                  // التحقق من نوع الحساب
                                  if (api === "/messagescustomer") {
                                    // إذا كان نوع الحساب مستخدم
                                    handleStartConversationuser(
                                      item["user"]?.id,
                                      item["user"]?.account_type
                                    ); // استدعاء دالة بدء محادثة المستخدم
                                  } else if (api === "/messagesvendor") {
                                    // إذا كان نوع الحساب تاجر
                                    handleStartConversationuser(
                                      item["vendor"]?.id,
                                      item["vendor"]?.account_type
                                    ); // استدعاء دالة بدء محادثة التاجر
                                  }
                                }}
                                className="text-green-500"
                              >
                                <MessageCircleCode />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="bg-main_dash">
                      <div className="h-[60vh] flex items-center  justify-center">
                        <div className="w-fit m-auto flex flex-col items-center justify-center">
                          <Image
                            src={"/images/empty.svg" || ""}
                            alt="image"
                            width={1024}
                            height={1280}
                            className="w-[250px] max-md:w-[150px]"
                          />
                          <p className="text-white text-[22px] mt-3">
                            لم يتم إضافة بيانات الى الجدول حتى الوقت الحالى
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

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
      )}
    </>
  );
};

export default PaginatedTable;
