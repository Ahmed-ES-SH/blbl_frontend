"use client";
import { Camera, Search, X, XCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UseVariabels } from "@/app/context/VariabelsContext";
import Image from "next/image";
import { instance } from "@/app/Api/axios";
import { allstring } from "@/app/types/dashbordcontenttypes";
import LoadingDashbord from "../LoadingDashbord";
export default function HoverInput({ setstate }: any) {
  const errorMessages: any = {
    "The image field is required.": "من فضلك أدخل صورة خاصة بالطلب",
    "The title field is required.": "من فضلك أدخل النص الخاص بالطلب ",
    "The servicetype id field is required.": "من فضلك حدد القسم الخاص بالطلب",
    "The service descripe field must be at least 15 characters.":
      "إكتب طلبك بحيث لا يقل عن 15 حرف",
  };

  const { id, currentuser } = UseVariabels();
  const [servicestypes, setservicestypes] = useState([]);
  const [errors, seterrors] = useState<allstring | null>(null);
  const [order, setorder] = useState("");
  const [servicetypeid, setservicetypeid] = useState("");
  const [servicetype, setservicetype] = useState("");
  const [done, setdone] = useState("");
  const [loading, setloading] = useState(false);

  const [image, setimage] = useState<any>("");
  const openinput = useRef<any>(null);

  const handleselectchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setservicetypeid(selectedId);

    const selectedService: any = servicestypes.find(
      (type: allstring) => type.id == selectedId
    );

    if (selectedService) {
      setservicetype(selectedService.title);
    }
  };

  const handleimagechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setimage(files[0]);
    }
  };

  const handleaddorder = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      seterrors(null);
      setloading(true);
      const title = order.split(" ").slice(0, 8).join(" ");
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("Service_descripe", order);
      formdata.append("servicetype_id", servicetypeid);
      formdata.append("service_type", servicetype);
      formdata.append("sender_id", id);
      formdata.append("sender_type", currentuser.type);
      if (image) {
        formdata.append("image", image);
      }
      const res = await instance.post("/orders/add", formdata);
      setorder("");
      setimage("");
      setservicetypeid("");
      setdone("تم نشر طلبك بنجاح ");
      setloading(false);
    } catch (error: any) {
      setloading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        const translatedErrors = Object.keys(error.response.data.errors).reduce(
          (acc: any, key) => {
            acc[key] = error.response.data.errors[key].map(
              (message: string) => errorMessages[message] || message
            );
            return acc;
          },
          {}
        );
        seterrors(translatedErrors);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await instance.get("/servicestypes");
        setservicestypes(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);

  console.log(errors);

  return (
    <>
      {loading ? (
        <LoadingDashbord />
      ) : (
        <>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "fit-content" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-1/2 max-lg:w-3/4 max-md:w-full my-3 px-4  m-auto  relative"
          >
            <form
              onSubmit={handleaddorder}
              className="w-full mt-[25px] bg-bglight border px-4 py-2 z-[9999] shadow-md rounded-md"
            >
              <select
                className="w-[180px] rounded-md bg-secend_color shadow-md py-1 px-2 outline-none"
                onChange={handleselectchange}
                name="servicetype_id"
                value={servicetypeid}
              >
                <option value="" disabled>
                  إختر القسم الخاص بطليك
                </option>
                {servicestypes &&
                  servicestypes.map((type: allstring, index: number) => (
                    <option
                      className=" cursor-pointer"
                      value={type.id}
                      key={index}
                    >
                      {type.title}
                    </option>
                  ))}
              </select>
              <textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setorder(e.target.value)
                }
                style={{ overflowWrap: "anywhere" }}
                placeholder="  اكتب تفاصيل طلبك هنا  وفورا بتجيك عروض المساعدة 💥"
                className="w-full  flex items-center justify-center relative  p-4 h-[28vh] max-h-fit bg-transparent outline-none border-none  "
              />
              <input
                ref={openinput}
                type="file"
                hidden
                name="image"
                onChange={handleimagechange}
              />
              {image ? (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="image"
                  width={1024}
                  height={1280}
                  className="w-[200px] max-md:w-[150px] rounded-md shadow-md"
                />
              ) : (
                <div
                  onClick={() => openinput.current.click()}
                  className="text-gray-500 cursor-pointer"
                >
                  <Camera />
                </div>
              )}
              <div
                style={{ direction: "ltr" }}
                className="w-full px-3 py-3 mt-6 border-t border-black"
              >
                <input
                  className="px-4 py-2 hover:bg-transparent hover:border-secend_color border border-transparent duration-150 hover:text-secend_color hover:scale-110 cursor-pointer w-fit  bg-main_color text-white rounded-md"
                  type="submit"
                  value={"انشر"}
                />
              </div>
            </form>
            <div className="flex-two  absolute top-6 left-8">
              <X
                onClick={() => setstate("")}
                className="  text-gray-400 cursor-pointer"
              />
            </div>
            {errors && (
              <div className=" mt-3 px-2 py-1  bg-red-300 rounded-md shadow-md">
                {errors.image && (
                  <p className="text-[17px] my-1">{errors.image[0]}</p>
                )}
                {errors.title && (
                  <p className="text-[17px] my-1">{errors.title[0]}</p>
                )}
                {errors.servicetype_id && (
                  <p className="text-[17px] my-1">{errors.servicetype_id[0]}</p>
                )}
                {errors.Service_descripe && (
                  <p className="text-[17px] my-1">
                    {errors.Service_descripe[0]}
                  </p>
                )}
              </div>
            )}
          </motion.div>
          {done && (
            <div className="flex items-center w-fit m-auto gap-2">
              <p className="my-4   text-[18px] px-2 py-1 rounded-md bg-green-300   ">
                {done}
              </p>
              <XCircle
                onClick={() => setdone("")}
                className=" hover:scale-120 duration-150 cursor-pointer"
                width={18}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
