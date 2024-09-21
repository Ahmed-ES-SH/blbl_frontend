"use client";
import React, { SelectHTMLAttributes, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { instance } from "@/app/Api/axios";
import LoadingDashbord from "../LoadingDashbord";
import { allstring } from "@/app/types/dashbordcontenttypes";
import Image from "next/image";
export default function ProblemPage({ apiget, apisend, apiupdate }: allstring) {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [data, setdata] = useState<any>(null);
  const [orderstatus, setorderstatus] = useState<any>(true);
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
        const res = await instance.get(`${apiget}/${id}`);
        setdata(res.data);
        if (apiupdate == "/messagecustomer") {
          setnotifaction({ ...notifaction, id: res.data.user_id });
        } else {
          setnotifaction({ ...notifaction, id: res.data.vendor_id });
        }
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
    setorderstatus(e.target.value);
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
      orderstatus === "pending"
        ? `الطلب الخاص بك لا يزال لم يتم مراجعتة `
        : orderstatus === "in_progress"
        ? `الطلب الخاص بك لا يزال فى طور المراجعة `
        : `تم حل المشكلة الخاصة بك من قبل خدمة العملاء !`;
    setnotifaction({ ...notifaction, message: valueofmassegae });
  }, [orderstatus]);

  const handeledait = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    try {
      ///////////////////////////////////////
      //// form for edit orderstatus //////
      ///////////////////////////////////////
      setloading(true);
      const form = new FormData();
      form.append("message_status", orderstatus); // تأكد من إرسال قيمة منطقية صحيحة
      const res = await instance.post(`${apiupdate}/${id}`, form);
      ///////////////////////////////////////
      //// form for send notifaction ////////
      ///////////////////////////////////////
      const formnot = new FormData();
      if (apiupdate == "/messagecustomer") {
        formnot.append(`user_id`, notifaction.id);
      } else {
        formnot.append(`vendor_id`, notifaction.id);
      }

      formnot.append("message", notifaction.message);
      const resnotifaction = await instance.post(`${apisend}`, formnot);

      // go to services page
      router.push("/dashbord/servicecustomers");
    } catch (error: any) {
      setloading(false);
      if (error.response.status == 422) {
        seterorr(
          "تأكد من تحديد حالة الخدمة ليتم تعديلها لا يمكن إرسال قيمة فارغةاو إشعار فارغ ."
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
        data && (
          <div className="w-full h-[82vh] hidden-scrollbar overflow-y-auto mt-4 px-1">
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="dark:text-white"> صاحب الطلب : </label>
              <div className="flex items-center gap-4 w-full">
                <p className="py-3 border-b border-secend_text text-white">
                  {apiupdate == "/messagevendor"
                    ? data?.vendor?.name
                    : data?.user?.name}
                </p>
                <Image
                  src={
                    apiupdate == "/messagevendor"
                      ? data?.vendor?.image
                      : data?.user?.image
                  }
                  alt="image"
                  width={1024}
                  height={1280}
                  className="h-[50px] w-[50px] rounded-full"
                />
              </div>
            </div>
            <input
              readOnly
              className="w-full mt-3 h-[20vh] overflow-y-auto px-2 py-1 border border-secend_text outline-none shadow-md dark:bg-main_dash dark:text-white text-start"
              value={data?.message}
            />
            <select
              onChange={handleselectchangechange}
              className=" outline-none w-full mt-6 m-auto p-2 py-6  rounded-md dark:bg-secend_dash dark:text-white"
            >
              <option>حالة الطلب</option>
              <option value={"pending"}>لم يتم مراجعتة</option>
              <option value={"in_progress"}>فى طور المراجعة</option>
              <option value={"resolved"}>تم حل المشكلة</option>
            </select>
            {typeof orderstatus == "string" && (
              <div className="message-body flex flex-col  dark:text-white px-2 mt-4">
                <h1 className="text-xl dark:text-secend_text my-2">
                  سيتم إرسال الإشعار التالى بشكل تلقائى إلى صاحب الطلب يمكنك
                  التعديل علية عن طريق زر تعديل
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
        )
      )}
    </>
  );
}
