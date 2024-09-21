"use client";
import React, { SelectHTMLAttributes, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { instance } from "@/app/Api/axios";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import LoadingDashbord from "../LoadingDashbord";
import { allstring } from "@/app/types/dashbordcontenttypes";

type Props = {
  params: { id: string };
};

export default function OrderMoney() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const headers = [
    "id",
    "إسم الناجر ",
    "الصورة",
    "قيمة الطلب",
    "الرصيد الحالى",
  ];

  const [data, setdata] = useState<any>(null);
  const [servicestatus, setservicestatus] = useState<any>(true);
  const [error, seterorr] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);
  const [edit, setedit] = useState<boolean>(false);
  const [notifaction, setnotifaction] = useState<allstring>({
    message: "",
    id: "",
  });

  ////////////////////////////////
  //// get the service data /////
  ///////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/ordersmoney/${id}`);
        console.log(res);
        setdata(res.data.data);
        setnotifaction({ ...notifaction, id: res.data.data.vendor_id });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  ///////////////////////////////////////
  //// handle change for selectvalue ////
  ///////////////////////////////////////

  const handleselectchangechange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    seterorr("");
    setservicestatus(e.target.value);
  };

  ///////////////////////////////////////
  //// loading condiation /////
  ///////////////////////////////////////

  useEffect(() => {
    const valueofloading = data == null ? true : false;
    setloading(valueofloading);
  }, [data]);

  ///////////////////////////////////////
  //// make a automatic notifaction /////
  ///////////////////////////////////////

  useEffect(() => {
    const valueofmassegae =
      servicestatus === "1"
        ? `!   تم تحويل المبلغ التالى  $${
            data && data?.amount
          } إلى حسابك رصيدك الحالى $${
            data && data?.vendor?.balance - data?.amount
          }`
        : `عذرا!!! لم يتم قبول 'طلبك بتحويل مبلغ ${data && data?.amount}' `;
    setnotifaction({ ...notifaction, message: valueofmassegae });
  }, [servicestatus]);

  const handeledait = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    try {
      ///////////////////////////////////////
      //// form for edit servicestatus //////
      ///////////////////////////////////////
      setloading(true);
      const form = new FormData();
      form.append("order_status", servicestatus); // تأكد من إرسال قيمة منطقية صحيحة
      form.append("vendor_id", data?.vendor_id); // تأكد من إرسال قيمة منطقية صحيحة
      const updateed_balance = data?.vendor.balance - data?.amount;
      form.append("updated_balance", updateed_balance.toString()); // تأكد من إرسال قيمة منطقية صحيحة
      const res = await instance.post(`/ordersmoney/${id}`, form);
      ///////////////////////////////////////
      //// form for send notifaction ////////
      ///////////////////////////////////////
      const formnot = new FormData();
      formnot.append("vendor_id", notifaction.id);
      formnot.append("message", notifaction.message);
      const resnotifaction = await instance.post(
        `/notification-vendor/add`,
        formnot
      );

      // go to services page
      router.push("/dashbord/ordersmoney");
    } catch (error: any) {
      setloading(false);
      if (error.response.status == 422) {
        seterorr(
          "تأكد من تحديد حالة الطلب ليتم تعديلة لا يمكن إرسال قيمة فارغةاو إشعار فارغ ."
        );
      }
      console.log(error);
    }
  };
  console.log(data);
  return (
    <>
      {loading ? (
        <LoadingDashbord />
      ) : (
        <div className="w-full h-full mt-4 px-1">
          <div className="rounded-sm border h-fit overflow-y-auto border-gray-200/30 text-black mt-2">
            <table className="min-w-full divide-y-2 dark:divide-gray-300/20 divide-black/60  dark:bg-secend_dash bg-light_bg text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  {headers.map((head, index) => (
                    <th
                      className="whitespace-nowrap dark:text-secend_text px-4 py-2 font-medium text-right "
                      key={index}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="dark:odd:divide-y dark:divide-gray-400/50 dark:bg-secend_dash bg-light_bg">
                <tr className="text-right odd:bg-purple-700/30">
                  <td className="whitespace-nowrap   px-4 py-2 font-medium dark:text-secend_text">
                    {data?.id}
                  </td>
                  <td className="whitespace-nowrap   px-4 py-2 font-medium dark:text-secend_text">
                    {data?.vendor?.name}
                  </td>
                  <td className="whitespace-nowrap   px-4 py-2 font-medium dark:text-secend_text">
                    <div className="flex items-center gap-2">
                      {data && (
                        <Image
                          width={1024}
                          height={1280}
                          src={data?.vendor?.image}
                          alt="image"
                          className="w-[60px] rounded-md shadow-md"
                        />
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap   px-4 py-2 font-medium dark:text-secend_text">
                    ${data?.amount}
                  </td>
                  <td className="whitespace-nowrap   px-4 py-2 font-medium dark:text-secend_text">
                    <p>${data?.vendor?.balance}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <select
            onChange={handleselectchangechange}
            className=" outline-none w-full mt-6 m-auto p-2 py-6  rounded-md dark:bg-secend_dash dark:text-white"
          >
            <option>حالة الطلب</option>
            <option value={"1"}>تم التحويل </option>
            <option value={"0"}>غير مسموح</option>
          </select>
          {typeof servicestatus == "string" && (
            <div className="message-body flex flex-col  dark:text-white px-2 mt-4">
              <h1 className="text-xl dark:text-secend_text my-2">
                سيتم إرسال الإشعار التالى بشكل تلقائى إلى التاجر يمكنك التعديل
                علية عن طريق زر تعديل
              </h1>
              <label> نص الإشعار المرسل: </label>
              <input
                disabled={edit == false}
                value={notifaction.message}
                name="message"
                placeholder="  الإشعار ..."
                onChange={(e) =>
                  setnotifaction({ ...notifaction, message: e.target.value })
                }
                type="text"
                className="  disabled:opacity-40  w-full rounded-md bg-slate-300 text-black px-4 placeholder-shown:px-4 outline-none py-2 my-2"
              />
              <button
                onClick={() => setedit(true)}
                className=" hover:bg-transparent hover:border-sky-400   hover:scale-110 duration-200 border border-transparent   px-3 py-1 my-3 self-end bg-sky-400 rounded-md shadow-md text-white text-center"
              >
                تعديل
              </button>
            </div>
          )}
          {error && (
            <p className="w-full p-2 mt-3  bg-red-300 rounded-md">{error}</p>
          )}
          <button
            onClick={handeledait}
            className="p-4 px-12 my-4 mx-2 hover:scale-105 hover:bg-transparent border border-transparent cursor-pointer duration-300 hover:border-sky-400 rounded-md block bg-sky-400 dark:text-white w-fit lg:ml-auto"
          >
            تم
          </button>
        </div>
      )}
    </>
  );
}
