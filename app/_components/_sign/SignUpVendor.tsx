"use client";
import { AtSignIcon, CameraIcon, KeyRound, MapPin, User2 } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Cookie from "cookie-universal";
import { instance } from "@/app/Api/axios";
import Navbar from "../_Website/Navbar";
import LoadingDashbord from "../LoadingDashbord";
import { arabic } from "@/app/content/AR";
import Codephone from "./Codephone";
import dynamic from "next/dynamic";
import Callservicecustomer from "../_Website/Callservicecustomer";
////////////////////
///////////////
///////////////////////////////////////////
/////////////////////////
///////////////////////////////
///////////////////////////////////

const DynamicMapComponent = dynamic(() => import("../Map"), {
  ssr: false,
});

export default function SignUpVendor() {
  // make cookie variable to set token
  const cookie = Cookie();

  const phoneNumberRef = useRef<any>(null);

  //errors messages to arabic
  const errorMessages: any = {
    "The email field is required.": "يجب إدخال البريد الإلكتروني.",
    "The location field is required.": "يجب إدخال الموقع.",
    "The name field is required.": "يجب إدخال الاسم.",
    "The password field is required.": "يجب إدخال كلمة السر.",
    "The phone number field is required.":
      "يجب إدخال رقم الجوال مرفق بكود الدولة.",
    "The name has already been taken.": "الإسم موجود بالفعل",
    "The email has already been taken.": "البريد الإلكترونى موجود بالفعل",
    "The name field must be at least 4 characters.":
      "الإسم يجب أن يكون أقل شئ 4 حروف",
    "The job field is required.": "يجب إدخال الوطيفة الحالية",
    "The gender field is required.": "يجب تحديد النوع",
  };

  const [form, setform] = useState<any>({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    location: "",
    gender: "",
    skills_experiences: "",
    job: "",
  });

  const [phonecode, setphonecode] = useState<any>({
    firstnum: "",
    secendnum: "",
    thirdnum: "",
    forthnum: "",
  });
  const [phonewithcode, setphonewithcode] = useState<any>("");
  const [loading, setloading] = useState(false);
  const [openmap, setopenmap] = useState(false);
  const [activephonenumber, setactivephonenumber] = useState(false);
  const [image, setimage] = useState<any>("");
  const [coderror, setcoderror] = useState("");
  const [codeacitve, setcodeacitve] = useState<any>("");
  const [code, setcode] = useState("");
  const [imagebank, setimagebank] = useState<any>("");
  const [errors, seterrors] = useState<any>({});
  const [errorphonecode, seterrorphonecode] = useState<string>("");
  const openinput = useRef<any>(null);
  const openinputbank = useRef<any>(null);

  const handelimagechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setimage(file);
    }
  };
  const handelimagebankchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setimagebank(file);
    }
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // التحقق من صحة الأرقام إذا كانت الحقل هو رقم الهاتف
    const phoneRegex = /^[0-9]*$/;
    if (name === "phone_number" && !phoneRegex.test(value)) {
      return; // إيقاف التحديث إذا لم يكن القيمة متوافقة مع النمط
    }

    // تحديث الحالة للنموذج
    setform({ ...form, [name]: value });
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      seterrors("");
      setcoderror("");
      setloading(true);
      if (!codeacitve?.code || codeacitve.code.slice(1, 9) === "undefined") {
        setcoderror("يجب ان تحدد كود الدولة الخاصة برقم الهاتف");
        setloading(false);
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        phoneNumberRef.current.focus();
        return; // توقف تنفيذ الدالة إذا كان الشرط غير مستوفى
      }
      if (!form.phone_number || form.phone_number.trim().length === 0) {
        setcoderror("رقم الهاتف لا يمكن أن يكون فارغًا");
        setloading(false);
        phoneNumberRef.current.focus();
        return;
      }
      const formdata = new FormData();
      formdata.append("name", form.name);
      formdata.append("email", form.email);
      formdata.append("password", form.password);
      formdata.append("phone_number", phonewithcode);
      formdata.append("location", JSON.stringify(form.location));
      formdata.append("gender", form.gender);
      formdata.append("skills_experiences", form.skills_experiences);
      formdata.append("job", form.job);
      formdata.append("image", image);
      formdata.append("image_bank", imagebank);
      const res = await instance.post("/vendor/add", formdata);
      setactivephonenumber(true);
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

  const verifyPhone = async () => {
    try {
      setloading(true);

      const formdata = new FormData();
      formdata.append("name", form.name);
      formdata.append("email", form.email);
      formdata.append("password", form.password);
      formdata.append("gender", form.gender);
      formdata.append("skills_experiences", form.skills_experiences);
      formdata.append("job", form.job);
      formdata.append("image", image);
      formdata.append("image_bank", imagebank);
      formdata.append("phone_number", phonewithcode);
      formdata.append("location", JSON.stringify(form.location));
      formdata.append("code", code);
      const res = await instance.post("/verifiyvendorphone", formdata);
      cookie.set("token", res.data.token);
      if (typeof window !== "undefined") {
        window.location.pathname = "/";
      }
    } catch (error: any) {
      setloading(false);
      seterrorphonecode("الرجاء التأكد من الكود مرة أخرى !");
      throw error;
    }
  };

  const setLocation = (address: any) => {
    setform({ ...form, location: address });
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
    setphonewithcode(codeacitve?.code?.slice(1, 9) + form.phone_number);
  }, [codeacitve, form.phone_number]);

  return (
    <div className="main-bg h-fit w-full">
      <Navbar />
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
              {" "}
              {/* تم تقليل عدد الأعمدة إلى 4 */}
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
            <p className="text-xl text-secend_color cursor-pointer">
              {arabic.replaysendcodetext}
            </p>
          </div>
        </div>
      ) : (
        <div className=" w-full  relative mt-16 ">
          <div className="flex-between max-lg:flex-col justify-center items-start max-lg:items-center px-[20px] ">
            <div className="img flex items-center justify-center relative w-[280px] h-[280px] rounded-full bg-secend_color">
              {image === "" ? (
                <Image
                  src={"/images/user-2.png"}
                  alt="user"
                  width={1024}
                  height={1280}
                  priority={true}
                  className="w-[220px]"
                />
              ) : (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="user"
                  width={1024}
                  height={1280}
                  className="rounded-full w-[95%]"
                />
              )}
              <div
                onClick={() => openinput.current.click()}
                className="w-[50px] cursor-pointer h-[50px] absolute left-0 bottom-8 bg-[#eeeae7] rounded-full flex items-center justify-center"
              >
                <CameraIcon />
              </div>
            </div>
            <div className="form max-lg:mt-4 h-[77vh] hidden-scrollbar overflow-y-auto  w-1/2 max-lg:w-full flex flex-col items-center gap-4 ">
              <h1 className="text-4xl text-secend_color">
                {arabic.createaccounttext}
              </h1>
              <form onSubmit={handlesubmit} className="flex flex-col gap-4">
                <div className="flex items-center relative">
                  <input
                    value={form.name || ""}
                    onChange={handleChange}
                    placeholder="إسم المستخدم"
                    type="text"
                    name="name"
                    className={`placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full bg-white border border-gray-200 shadow-md outline-none pr-11`}
                  />
                  <User2 className="text-secend_color absolute mr-2" />
                </div>
                {errors.name && (
                  <span className="text-red-500  text-md">
                    {errors.name[0]}
                  </span>
                )}
                <div className="flex-two">
                  <input
                    ref={phoneNumberRef}
                    value={form.phone_number || ""}
                    className={`h-[50px] rounded-md w-[340px] max-md:w-full text-left bg-white border border-gray-200 shadow-md outline-none px-4 placeholder-shown:px-4`}
                    type="text"
                    name="phone_number"
                    placeholder="رقم الجوال"
                    onChange={handleChange}
                    maxLength={20}
                    minLength={9}
                  />
                  <Codephone setcodeacitve={setcodeacitve} />
                </div>
                {errors.phone_number && (
                  <span className="text-red-500  text-xs">
                    {errors.phone_number[0]}
                  </span>
                )}
                {coderror && (
                  <span className="text-red-500  text-xs">{coderror}</span>
                )}
                <div className="flex items-center justify-between w-1/2">
                  <p>الجنس</p>
                  <div className="flex-two">
                    <label>أنثى</label>
                    <input
                      name="gender"
                      onChange={handleChange}
                      type="checkbox"
                      value={"male"}
                    />
                  </div>
                  <div className="flex-two">
                    <label>ذكر</label>
                    <input
                      name="gender"
                      onChange={handleChange}
                      type="checkbox"
                      value={"female"}
                    />
                  </div>
                </div>
                {errors.gender && (
                  <span className="text-red-500  text-md">
                    {errors.gender[0]}
                  </span>
                )}
                <div className="flex items-center relative">
                  <input
                    value={form.email || ""}
                    onChange={handleChange}
                    placeholder="البريد الالكترونى"
                    type="email"
                    name="email"
                    className={`placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full bg-white border border-gray-200 shadow-md outline-none pr-11`}
                  />
                  <AtSignIcon className="text-secend_color absolute mr-2" />
                </div>
                {errors.email && (
                  <span className="text-red-500  text-xs">
                    {errors.email[0]}
                  </span>
                )}

                <div className="flex items-center relative">
                  <input
                    value={form.password || ""}
                    onChange={handleChange}
                    placeholder="كلمة السر"
                    type="password"
                    name="password"
                    className={`placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full bg-white border border-gray-200 shadow-md outline-none pr-11`}
                  />
                  <KeyRound className="text-secend_color absolute mr-2" />
                </div>
                {errors.password && (
                  <span className="text-red-500  text-xs">
                    {errors.password[0]}
                  </span>
                )}
                <input
                  onChange={handleChange}
                  readOnly
                  value={form.location.address || ""}
                  type="text"
                  className={`h-[50px] text-[13px] rounded-md w-full border-none bg-gray-300 shadow-md outline-none px-4 placeholder-shown:px-4`}
                />
                {errors.location && (
                  <span className="text-red-500  text-xs">
                    {errors.location[0]}
                  </span>
                )}

                <div
                  onClick={() => setopenmap(!openmap)}
                  style={{ direction: "ltr" }}
                  className="flex-two text-secend_color cursor-pointer"
                >
                  <p>تحديد الموقع</p>
                  <MapPin width={14} />
                </div>
                <input
                  onChange={handleChange}
                  name="job"
                  placeholder="المهنة"
                  value={form.jop}
                  type="text"
                  className={` placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full   bg-white border border-gray-200 shadow-md  outline-none px-4 `}
                />
                {errors.job && (
                  <span className="text-red-500  text-md">{errors.job[0]}</span>
                )}
                <input
                  onChange={handleChange}
                  name="skills_experiences"
                  placeholder="الخبرات والمهارات"
                  value={form.skills_experiences}
                  type="text"
                  className={` placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full   bg-white border border-gray-200 shadow-md  outline-none px-4 `}
                />
                {imagebank ? (
                  <Image
                    src={URL.createObjectURL(imagebank)}
                    alt="image-bank"
                    width={1024}
                    height={1280}
                    className="w-[150px] rounded-md shadow-md"
                  />
                ) : (
                  <input
                    onClick={() => openinputbank.current.click()}
                    readOnly
                    value={"صورة لمعلومات التحويل البنكى"}
                    type="text"
                    className={` cursor-pointer text-secend_text placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full   bg-white border border-gray-200 shadow-md  outline-none px-4 `}
                  />
                )}
                <input
                  placeholder="نبذة عنى (إختيارى  )"
                  type="text"
                  className={`  text-secend_text placeholder-shown:pr-11 text-right h-[80px] rounded-md w-full   bg-white border border-gray-200 shadow-md  outline-none px-4 `}
                />
                <input
                  onChange={handelimagebankchange}
                  name="image_bank"
                  ref={openinputbank}
                  hidden
                  type="file"
                />
                <input
                  onChange={handelimagechange}
                  name="image"
                  ref={openinput}
                  hidden
                  type="file"
                />
                <input
                  type="submit"
                  value={arabic.createaccounttext}
                  className=" cursor-pointer w-full  px-4 py-4 my-8 rounded-md text-center text-white bg-secend_color"
                />
              </form>
              <Callservicecustomer />
            </div>
          </div>
        </div>
      )}
      {typeof window !== "undefined" && openmap && (
        <div className="map w-[90%] h-[60vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]">
          <DynamicMapComponent setLocation={setLocation} />
          <div className="w-fit mr-auto">
            <button
              onClick={() => setopenmap(false)}
              className="px-6 py-2 text-white rounded-md text-center shadow-md bg-secend_color"
            >
              تم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
