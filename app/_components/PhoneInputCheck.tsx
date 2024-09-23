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
export default function PhoneInputCheck() {
  const cookie = Cookie();

  const [form, setform] = useState({
    phone_number: "",
    password: "",
  });

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [codeacitve, setcodeacitve] = useState<any>("");
  const [phonewithcode, setphonewithcode] = useState<any>("");
  const handlephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // تحقق من أن الرقم المدخل يحتوي فقط على أرقام
    const phoneRegex = /^[0-9]*$/;

    if (phoneRegex.test(value)) {
      setform({ ...form, phone_number: value });
    }
  };

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("phone_number", phonewithcode);
      formdata.append("password", form.password);
      const res = await instance.post("/loginwithphone", formdata);
      cookie.set("token", res.data.token);
      seterror("");
      location.pathname = "/";
      setloading(false);
    } catch (error: any) {
      setloading(false);
      if (error.response.status && error.response.status == 401) {
        seterror("رقم الهاتف أو كلمة السر غير صحيحة .");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    setphonewithcode(codeacitve?.code?.slice(1, 9) + form.phone_number);
  }, [codeacitve, form.phone_number]);

  return (
    <>
      {loading ? (
        <LoadingDashbord />
      ) : (
        <>
          <div className=" w-[90%] h-[90vh] relative max-md:w-[98%] m-auto">
            <div className=" w-full flex-between max-lg:flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
                      className={`h-[50px] text-left w-full bg-transparent border border-gray-200 shadow-md rounded-sm outline-none px-4 placeholder-shown:px-4`}
                      type="tel"
                      placeholder="رقم الجوال"
                      value={form.phone_number}
                      onChange={handlephoneChange}
                    />
                    <Codephone setcodeacitve={setcodeacitve} />
                  </div>
                  <div className="flex items-center relative my-2">
                    <input
                      value={form.password}
                      onChange={handlechange}
                      placeholder="كلمة السر"
                      type="password"
                      name="password"
                      className={`placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full bg-transparent border border-gray-200 shadow-md outline-none pr-11`}
                    />
                    <KeyRound className="text-secend_color absolute mr-2" />
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
                <Link className="text-secend_color my-2" href={"/membership"}>
                  {arabic.createaccounttext}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
