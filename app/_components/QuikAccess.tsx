"use client";
import React, { useEffect, useState } from "react";
import Codephone from "./_sign/Codephone";
import { arabic } from "../content/AR";
import { instance } from "../Api/axios";
import { KeyRound } from "lucide-react";
import Image from "next/image";
import Cookie from "cookie-universal";
import Link from "next/link";
import LoadingDashbord from "./LoadingDashbord";

export default function QuikAccess() {
  const cookie = Cookie();

  const [phone_number, setphone_number] = useState("");
  const [phonecode, setphonecode] = useState<any>({
    firstnum: "",
    secendnum: "",
    thirdnum: "",
    forthnum: "",
  });
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [code, setcode] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [errorphonecode, seterrorphonecode] = useState<string>("");
  const [activephonenumber, setactivephonenumber] = useState(false);
  const [codeacitve, setcodeacitve] = useState<any>("");
  const [phonewithcode, setphonewithcode] = useState<any>("");

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // التأكد من أن المدخل هو رقم واحد فقط
    if (/^\d?$/.test(value)) {
      setphonecode((prev: any) => ({
        ...prev,
        [name]: value,
      }));

      // الانتقال التلقائي إلى الحقل التالي إذا تم إدخال رقم
      if (typeof window !== "undefined") {
        if (value.length === 1) {
          switch (name) {
            case "firstnum":
              document.getElementsByName("secendnum")[0].focus();
              break;
            case "secendnum":
              document.getElementsByName("thirdnum")[0].focus();
              break;
            case "thirdnum":
              document.getElementsByName("forthnum")[0].focus();
              break;
            default:
              break;
          }
        }
      }
    }
  };

  const handlephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // التحقق من صحة الأرقام فقط
    const phoneRegex = /^[0-9]*$/;
    if (phoneRegex.test(value)) {
      setphone_number(value); // تحديث حالة رقم الهاتف
    }
  };

  const verifyPhone = async () => {
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("code", code);
      formdata.append("phone_number", phonewithcode);

      const res = await instance.post("/verifyCodeAndCreateUser", formdata);
      cookie.set("token", res.data.token);
      if (typeof window !== "undefined") {
        window.location.pathname = "/";
      }
    } catch (error: any) {
      setloading(false);
      seterrorphonecode("الرجاء التأكد من الكود مرة أخرى !");
    }
  };

  const handlesubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("phone_number", phonewithcode);
      const res = await instance.post("/quickaccesswithphone", formdata);
      setactivephonenumber(true);
      seterror("");
      setloading(false);
    } catch (error: any) {
      setloading(false);
      if (error.response.status && error.response.status == 401) {
        seterror("رقم الهاتف غير صالح.");
      }
      console.log(error);
    }
  };

  const handleresendcode = async () => {
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("code", code);
      formdata.append("phone_number", phonewithcode);
      const res = await instance.post("/resendphonecode", formdata);
      setIsResendDisabled(true);
      setSecondsLeft(10);
      setloading(false);
    } catch (error: any) {
      setloading(false);
      throw error;
    }
  };

  useEffect(() => {
    // تجميع الأرقام لتكوين الكود النهائي
    if (
      phonecode.firstnum ||
      phonecode.secendnum ||
      phonecode.thirdnum ||
      phonecode.forthnum
    ) {
      const newCode = `${phonecode.firstnum}${phonecode.secendnum}${phonecode.thirdnum}${phonecode.forthnum}`;
      setcode(newCode);
    }
  }, [phonecode]);

  useEffect(() => {
    setphonewithcode(codeacitve?.code?.slice(1, 9) + phone_number);
  }, [codeacitve, phone_number]);

  useEffect(() => {
    let timer: any;
    if (isResendDisabled) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsResendDisabled(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResendDisabled]);

  return (
    <>
      {loading ? (
        <LoadingDashbord />
      ) : activephonenumber ? (
        <div
          style={{ direction: "ltr" }}
          className="px-[15px] mt-4 flex-between max-lg:flex-col"
        >
          <Image
            src={"/logonobg.png"}
            alt="logo"
            width={1024}
            height={1280}
            className="w-[800px] max-lg:w-[350px]"
          />
          <div className="w-full flex flex-col items-center justify-center gap-6">
            <h1 className="text-4xl text-secend_color">
              {arabic.loginsuretext}
            </h1>
            <p className="text-xl max-sm:text-[18px] whitespace-nowrap">
              {arabic.hiddenphonechecktext}
              <span
                style={{ direction: "ltr" }}
                className="text-secend_color px-3"
              >
                {phonewithcode}
              </span>
            </p>
            <h1 className="text-2xl text-secend_color">
              {arabic.writephonecodetext}
            </h1>
            <div className="py-8 grid grid-cols-4 gap-4">
              <input
                onChange={handlechange}
                name="firstnum"
                value={phonecode.firstnum}
                type="text"
                maxLength={1}
                className="w-[60px] h-[60px] rounded-md bg-bglight border border-gray-400 shadow-md outline-none text-center text-3xl text-secend_text"
              />
              <input
                onChange={handlechange}
                name="secendnum"
                value={phonecode.secendnum}
                type="text"
                maxLength={1}
                className="w-[60px] h-[60px] rounded-md bg-bglight border border-gray-400 shadow-md outline-none text-center text-3xl text-secend_text"
              />
              <input
                onChange={handlechange}
                name="thirdnum"
                value={phonecode.thirdnum}
                type="text"
                maxLength={1}
                className="w-[60px] h-[60px] rounded-md bg-bglight border border-gray-400 shadow-md outline-none text-center text-3xl text-secend_text"
              />
              <input
                onChange={handlechange}
                name="forthnum"
                value={phonecode.forthnum}
                type="text"
                maxLength={1}
                className="w-[60px] h-[60px] rounded-md bg-bglight border border-gray-400 shadow-md outline-none text-center text-3xl text-secend_text"
              />
            </div>
            {errorphonecode && (
              <p className="text-[18px] my-2 text-red-500">{errorphonecode}</p>
            )}
            <button
              onClick={() => verifyPhone()}
              className="cursor-pointer w-1/2 max-md:w-3/4 max-sm:w-full px-4 py-4 my-8 rounded-md text-center text-white bg-secend_color"
            >
              تأكيد رقم الهاتف
            </button>
            {isResendDisabled ? (
              <p className="text-xl text-secend_color">
                يمكنك إعادة إرسال الكود بعد {secondsLeft} ثانية
              </p>
            ) : (
              <button
                onClick={handleresendcode}
                className="text-xl text-secend_color cursor-pointer"
              >
                {arabic.replaysendcodetext}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className=" w-[90%] h-[90vh] max-md:w-[98%] m-auto relative ">
          <div className=" w-full  flex-between max-lg:flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={"/logonobg.png"}
              alt="logo"
              width={1024}
              height={1280}
              className="w-[800px] max-lg:w-[350px]"
            />
            <div className="text-center flex flex-col items-center gap-6">
              <h1 className="text-4xl text-secend_color">
                {arabic.welcometext}
              </h1>
              <p className="w-3/4 max-md:w-full py-2 text-2xl">
                {arabic.phonelogintext}
              </p>
              <form
                className="max-md:w-[90%] max-sm:w-[95%]"
                onSubmit={handlesubmit}
              >
                <div className="flex-two">
                  <input
                    name="phone_number"
                    className="h-[50px] text-left w-full bg-transparent border border-gray-200 shadow-md rounded-sm outline-none px-4 placeholder-shown:px-4"
                    type="tel"
                    placeholder="رقم الجوال"
                    value={phone_number}
                    onChange={handlephoneChange}
                  />
                  <Codephone setcodeacitve={setcodeacitve} />
                </div>

                <button className=" w-full px-4 py-4 mt-8 rounded-md text-center text-white bg-secend_color">
                  {arabic.logintext}
                </button>
                {error && (
                  <p className="w-full px-2 py-1 mt-3 text-red-400 text-[16px]">
                    {error}
                  </p>
                )}
              </form>
              <Link className="pt-4" href={"/signinwithmobail"}>
                <span className="cursor-pointer text-2xl text-secend_color">
                  لديك حساب بالفعل !
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
