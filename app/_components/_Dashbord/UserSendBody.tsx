"use client";
import { instance } from "@/app/Api/axios";
import { allstring } from "@/app/types/dashbordcontenttypes";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";

export default function UserSendBody() {
  const [datausers, setdatausers] = useState<allstring[]>([]);
  const [messageuser, setmessageuser] = useState<string>("");
  const [error, seterorr] = useState<string>("");
  const [mainerror, setmainerror] = useState<string>("");
  const [done, setdone] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);
  const [usershow, setusershow] = useState<boolean>(true);
  const [user, setuser] = useState<allstring>({
    name: "",
    id: "",
  });
  const [currentPageuser, setCurrentPageuser] = useState(1);
  const itemsPerPage = 10;
  const totalPagesusers = Math.ceil(datausers.length / itemsPerPage);
  const handleClickuser = (page: any) => {
    setCurrentPageuser(page);
  };
  const handlePrevuser = () => {
    if (currentPageuser > 1) {
      setCurrentPageuser(currentPageuser - 1);
    }
  };
  const handleNextuser = () => {
    if (currentPageuser < totalPagesusers) {
      setCurrentPageuser(currentPageuser + 1);
    }
  };
  const currentusersItems = datausers.slice(
    (currentPageuser - 1) * itemsPerPage,
    currentPageuser * itemsPerPage
  );
  const handlesearch = async (
    endpoint: string,
    namesearch: string,
    setdata: React.Dispatch<React.SetStateAction<allstring[]>>
  ) => {
    try {
      if (namesearch) {
        seterorr("");
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
      if (error.response.status == 422) {
        seterorr(
          "لا يوجد مستخدم فى قاعدة البيانات بهذا الإٍسم تحقق من الإسم وأعد المحاولة"
        );
      }
    }
  };
  const handleselectuser = (name: string, id: string) => {
    setuser({ id: id, name: name });
    setdatausers([]);
  };
  const handlesend = async (id: string, message: string) => {
    try {
      seterorr("");
      setmainerror("");
      setloading(true);
      const formdata = new FormData();
      formdata.append("user_id", id);
      formdata.append("message", message);
      const res = await instance.post("/notification-user/add", formdata);
      setmessageuser("");
      setuser({ id: "", name: "" });
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
    <div className="body w-full dark:text-white">
      <h1 className="text-3xl ">إلى من سترسل الإشعار ؟ </h1>
      <div className=" px-2 py-1 overflow-hidden bg-secend_color dark:bg-main_dash rounded-md mt-4">
        <div
          onClick={() => setusershow(!usershow)}
          className="input-title dark:text-white cursor-pointer flex items-center justify-between w-full"
        >
          <p className="text-xl">مستخدم</p>
          <ArrowDown />
        </div>

        {usershow && (
          <AnimatePresence>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: usershow ? "fit-content" : 5 }}
              transition={{ duration: 0.4 }}
              className="body-vendor dark:text-white"
            >
              <div className="input-body flex flex-col items-start w-full  px-2 mt-4">
                <label>إبحث عن متسخدم بواسطة الإسم : </label>
                <input
                  name="name"
                  value={user.name}
                  placeholder="أدخل إسم المستخدم ..."
                  onChange={(e) => setuser({ ...user, name: e.target.value })}
                  type="text"
                  className="w-full rounded-md bg-slate-300 text-black px-4 placeholder-shown:px-4 outline-none py-2 my-2"
                />
                <button
                  onClick={async () =>
                    handlesearch("/search-user", user.name, setdatausers)
                  }
                  className="px-3 py-1 self-end bg-sky-400 rounded-md shadow-md text-white text-center"
                >
                  بحث
                </button>
                <div className="table w-full">
                  {datausers.length > 0 ? (
                    <div className="parent">
                      <table className="w-full ">
                        <thead className="border-b border-black">
                          <tr>
                            <th className="text-right px-2">id</th>
                            <th className="text-right px-2">الإسم</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentusersItems.map((user, index) => (
                            <tr
                              onClick={() =>
                                handleselectuser(user.name, user.id)
                              }
                              className="h-[40px]  border-b border-black hover:bg-sky-500 duration-200 cursor-pointer odd:bg-sky-200 odd:text-black"
                              key={index}
                            >
                              <td className="px-2">{user.id}</td>
                              <td className="px-2">{user.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                        <ol className="flex justify-end gap-1 text-xs font-medium">
                          <li>
                            <button
                              onClick={handlePrevuser}
                              className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
                                currentPageuser === 1
                                  ? "cursor-not-allowed opacity-50"
                                  : ""
                              }`}
                              disabled={currentPageuser === 1}
                            >
                              <span className="">
                                <ArrowLeft width={12} />
                              </span>
                            </button>
                          </li>

                          {Array.from(
                            { length: totalPagesusers },
                            (_, index) => (
                              <li key={index}>
                                <button
                                  onClick={() => handleClickuser(index + 1)}
                                  className={`block size-8 rounded border ${
                                    currentPageuser === index + 1
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
                              onClick={handleNextuser}
                              className={`inline-flex size-8 items-center justify-center rounded border border-black/50 dark:bg-secend_dash bg-light_bg dark:text-white rtl:rotate-180 ${
                                currentPageuser === totalPagesusers
                                  ? "cursor-not-allowed opacity-50"
                                  : ""
                              }`}
                              disabled={currentPageuser === totalPagesusers}
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
                  disabled={user.id == ""}
                  name="message"
                  placeholder="  الإشعار ..."
                  onChange={(e) => setmessageuser(e.target.value)}
                  type="text"
                  className="  disabled:opacity-40  w-full rounded-md bg-slate-300 text-black px-4 placeholder-shown:px-4 outline-none py-2 my-2"
                />
                <button
                  onClick={() => handlesend(user.id, messageuser)}
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
  );
}
