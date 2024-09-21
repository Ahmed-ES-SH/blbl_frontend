"use client";
import { instance } from "@/app/Api/axios";
import { allstring } from "@/app/types/dashbordcontenttypes";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";

export default function VendorSendBody() {
  const [datavendors, setdatavendors] = useState<allstring[]>([]);
  const [messagevendor, setmessagevendor] = useState<string>("");
  const [error, seterorr] = useState<string>("");
  const [mainerror, setmainerror] = useState<string>("");
  const [done, setdone] = useState<string>("");
  const [vendorshow, setvendorshow] = useState<boolean>(false);

  const [loading, setloading] = useState<boolean>(false);

  const [vendor, setvendor] = useState<allstring>({
    name: "",
    id: "",
  });

  const [currentPageuser, setCurrentPageuser] = useState(1);
  const [currentPagevendor, setCurrentPagevendor] = useState(1);
  const itemsPerPage = 10;
  const totalPagesvendors = Math.ceil(datavendors.length / itemsPerPage);

  const handleClickvendor = (page: any) => {
    setCurrentPagevendor(page);
  };

  const handlePrevvendor = () => {
    if (currentPagevendor > 1) {
      setCurrentPagevendor(currentPagevendor - 1);
    }
  };

  const handleNextvendor = () => {
    if (currentPagevendor < totalPagesvendors) {
      setCurrentPagevendor(currentPagevendor + 1);
    }
  };

  const currentvendorsItems = datavendors.slice(
    (currentPagevendor - 1) * itemsPerPage,
    currentPagevendor * itemsPerPage
  );

  const handlesearch = async (
    endpoint: string,
    namesearch: string,
    setdata: React.Dispatch<React.SetStateAction<allstring[]>>
  ) => {
    try {
      if (namesearch) {
        seterorr("");
        setCurrentPagevendor(1);
        setCurrentPageuser(1);
        setdata([]);
        setloading(true);
        const resusers = await instance.get(`${endpoint}?name=${namesearch}`);
        setdata(resusers.data.data);
        setloading(false);
      } else {
        console.log("Name search is empty, skipping request.");
      }
    } catch (error: any) {
      setloading(false);
      if (error.response.status) {
        seterorr(
          "لا يوجد فنى فى قاعدة البيانات بهذا الإٍسم تحقق من الإسم وأعد المحاولة"
        );
      }
    }
  };

  const handleselectvendor = (name: string, id: string) => {
    setvendor({ id: id, name: name });
    setdatavendors([]);
  };

  const handlesend = async (id: string, message: string) => {
    try {
      seterorr("");
      setmainerror("");
      setloading(true);
      const formdata = new FormData();
      formdata.append("vendor_id", id);
      formdata.append("message", message);
      const res = await instance.post("/notification-vendor/add", formdata);
      setmessagevendor("");
      setvendor({ id: "", name: "" });
      setdone("تم الإسال بنجاح ");
      setloading(false);
    } catch (error: any) {
      setloading(false);
      if (error.response.status == 422) {
        setmainerror(
          "تأكد من تحديد الشخص المرسل الية وألا يكون المحتوى عبارة عن نص فارغ"
        );
      }
      console.log(error);
    }
  };
  return (
    <>
      <div className="body mt-4 w-full dark:text-white">
        <div className=" px-2 py-1 overflow-hidden bg-secend_color dark:bg-main_dash rounded-md mt-4">
          <div
            onClick={() => setvendorshow(!vendorshow)}
            className="input-title dark:text-white cursor-pointer flex items-center justify-between w-full"
          >
            <p className="text-xl">فنى</p>
            <ArrowDown />
          </div>

          {vendorshow && (
            <AnimatePresence>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: vendorshow ? "fit-content" : 5 }}
                transition={{ duration: 0.4 }}
                className="body-vendor dark:text-white"
              >
                <div className="input-body flex flex-col items-start w-full  px-2 mt-4">
                  <label>إبحث عن الفنى بواسطة الإسم : </label>
                  <input
                    name="name"
                    value={vendor.name}
                    placeholder="أدخل إسم الفنى ..."
                    onChange={(e) =>
                      setvendor({ ...vendor, name: e.target.value })
                    }
                    type="text"
                    className="w-full rounded-md bg-slate-300 text-black px-4 placeholder-shown:px-4 outline-none py-2 my-2"
                  />
                  <button
                    onClick={async () =>
                      handlesearch(
                        "/search-vendor",
                        vendor.name,
                        setdatavendors
                      )
                    }
                    className="px-3 py-1 self-end bg-sky-400 rounded-md shadow-md text-white text-center"
                  >
                    بحث
                  </button>
                  <div className="table w-full">
                    {datavendors.length > 0 ? (
                      <div className="parent">
                        <table className="w-full ">
                          <thead className="border-b border-black">
                            <tr>
                              <th className="text-right px-2">id</th>
                              <th className="text-right px-2">الإسم</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentvendorsItems.map((vendor) => (
                              <tr
                                onClick={() =>
                                  handleselectvendor(vendor.name, vendor.id)
                                }
                                className="h-[40px]  border-b border-black hover:bg-sky-500 duration-200 cursor-pointer odd:bg-sky-200 odd:text-black"
                                key={vendor.id}
                              >
                                <td className="px-2">{vendor.id}</td>
                                <td className="px-2">{vendor.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                          <ol className="flex justify-end gap-1 text-xs font-medium">
                            <li>
                              <button
                                onClick={handlePrevvendor}
                                className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
                                  currentPagevendor === 1
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                                }`}
                                disabled={currentPagevendor === 1}
                              >
                                <span className="">
                                  <ArrowLeft width={12} />
                                </span>
                              </button>
                            </li>

                            {Array.from(
                              { length: totalPagesvendors },
                              (_, index) => (
                                <li key={index}>
                                  <button
                                    onClick={() => handleClickvendor(index + 1)}
                                    className={`block size-8 rounded border ${
                                      currentPagevendor === index + 1
                                        ? "border-blue-600 bg-blue-600 "
                                        : "border-black/50 dark:bg-main_dash bg-light_bg "
                                    } dark:text-white text-center leading-8`}
                                  >
                                    {index + 1}
                                  </button>
                                </li>
                              )
                            )}

                            <li>
                              <button
                                onClick={handleNextvendor}
                                className={`inline-flex size-8 items-center justify-center rounded border border-black/50 dark:bg-secend_dash bg-light_bg dark:text-white rtl:rotate-180 ${
                                  currentPagevendor === totalPagesvendors
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                                }`}
                                disabled={
                                  currentPagevendor === totalPagesvendors
                                }
                              >
                                <span className="">
                                  <ArrowRight width={12} />
                                </span>
                              </button>
                            </li>
                          </ol>
                        </div>
                      </div>
                    ) : (
                      loading && (
                        <div className="h-[30px] w-[30px] relative m-auto ">
                          <span className="loader  "></span>
                        </div>
                      )
                    )}
                    {error && (
                      <p className="w-full p-2 my-2 text-white bg-red-300 rounded-md">
                        {error}
                      </p>
                    )}
                  </div>
                </div>
                <div className="message-body flex flex-col  dark:text-white px-2 mt-4">
                  <label> نص الإشعار المرسل: </label>
                  <input
                    disabled={vendor.id == ""}
                    name="message"
                    placeholder="  الإشعار ..."
                    onChange={(e) => setmessagevendor(e.target.value)}
                    type="text"
                    className="  disabled:opacity-40  w-full rounded-md bg-slate-300 text-black px-4 placeholder-shown:px-4 outline-none py-2 my-2"
                  />
                  <button
                    onClick={() => handlesend(vendor.id, messagevendor)}
                    className=" hover:bg-transparent hover:border-sky-400   hover:scale-110 duration-200 border border-transparent   px-3 py-1 my-3 self-end bg-sky-400 rounded-md shadow-md text-white text-center"
                  >
                    إرسال
                  </button>
                  {done && (
                    <p className="w-full p-2 my-2 text-black bg-green-300 rounded-md">
                      {done}
                    </p>
                  )}
                  {mainerror && (
                    <p className="w-full p-2 my-2 text-black bg-red-300 rounded-md">
                      {mainerror}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
}
