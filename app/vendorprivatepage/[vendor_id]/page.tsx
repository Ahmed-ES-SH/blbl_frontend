"use client";
import React, { useEffect, useRef, useState } from "react";
import { arabic } from "@/app/content/AR";
import Image from "next/image";
import {
  Phone,
  User2,
  MapPin,
  AtSign,
  ShoppingCart,
  CameraIcon,
} from "lucide-react";
import Link from "next/link";
import { allstring } from "@/app/types/dashbordcontenttypes";
import Navbar from "@/app/_components/_Website/Navbar";
import Stars from "@/app/_components/Stars";
import { instance } from "@/app/Api/axios";
import MapComponent from "@/app/_components/Map";
import LoadingDashbord from "@/app/_components/LoadingDashbord";
import Loading from "@/app/loading";
import Callservicecustomer from "@/app/_components/_Website/Callservicecustomer";
import { UseVariabels } from "@/app/context/VariabelsContext";
import ForbiddenPage from "@/app/_components/_Website/ForbddenPage";

export default function VendorPrivatePage({ params }: any) {
  const { currentuser } = UseVariabels();
  const id = params.vendor_id;
  const openinputbank = useRef<any>(null);
  const openinput = useRef<any>(null);

  const [data, setdata] = useState<any>(null);
  const [vendorservices, setvendorservices] = useState<allstring[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [location, setlocation] = useState<allstring>({});
  const [openmap, setopenmap] = useState(false);
  const [errors, seterrors] = useState<string>("");
  const [done, setdone] = useState<string>("");
  const [image, setimage] = useState<any>("");
  const [image_bank, setimage_bank] = useState<any>("");
  const [imagebank, setimagebank] = useState<any>("");
  const [form, setform] = useState({
    name: "",
    phone_number: "",
    image: "",
    email: "",
    skills_experiences: "",
    About: "",
    gender: "",
    image_bank: "",
  });

  useEffect(() => {
    const getdata = async (api: string, set: React.Dispatch<any>) => {
      try {
        const res = await instance.get(api).then((res) => set(res.data.data));
      } catch (error) {
        console.log(error);
      }
    };

    getdata(`vendors/${id}`, setdata);
    getdata(`servicesvendor/${id}`, setvendorservices);
  }, []);

  useEffect(() => {
    if (data) {
      setform({
        name: data.name,
        phone_number: data.phone_number,
        image: data.image,
        image_bank: data.image_bank,
        email: data.email,
        skills_experiences: data.skills_experiences,
        About: data.About,
        gender: data.gender,
      });

      if (typeof data.location == "string") {
        setlocation(JSON.parse(data.location));
      } else {
        setlocation(data.location);
      }
    }
  }, [data]);

  //handlechange for form

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // check value for phone_number inputt
    if (name === "phone_number") {
      // تحقق من أن الرقم المدخل يحتوي فقط على أرقام
      const phoneRegex = /^[0-9]*$/;
      if (phoneRegex.test(value)) {
        setform((prevForm) => ({
          ...prevForm,
          [name]: value,
        }));
      }
    } else {
      // تحديث الحقول الأخرى
      setform((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleimagechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setimage(files[0]);
    }
  };
  const handleimagebank = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setimagebank(files[0]);
    }
  };

  // handle edit for user data
  const handlesubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("name", form.name);
      formdata.append("phone_number", form.phone_number);
      formdata.append("location", JSON.stringify(location));
      if (form.email !== data.email) {
        formdata.append("email", form.email);
      }
      formdata.append("About", form.About);
      formdata.append("skills_experiences", form.skills_experiences);

      if (image) {
        formdata.append("image", image);
      }
      if (imagebank) {
        formdata.append("image_bank", imagebank);
      }
      const res = await instance.post(`/vendors/${id}`, formdata);
      console.log(res);
      const newdata = res.data.data;
      setform({
        name: newdata.name || "",
        phone_number: newdata.phone_number,
        image: newdata.image,
        email: newdata.email,
        skills_experiences: newdata.skills_experiences,
        About: newdata.About,
        gender: newdata.gender,
        image_bank: newdata.image_bank,
      });
      setimage(null);
      setimagebank(null);
      setdone("تم تحديث البيانات بنجاح");
      setloading(false);
    } catch (error: any) {
      setloading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        seterrors(error.response.data.errors);
      } else {
        console.error("An unknown error occurred:", error);
      }
      console.log(error);
    }
  };

  const setLocation = (address: any) => {
    setlocation(address);
  };

  if (!currentuser && currentuser?.data?.id != id) {
    return <ForbiddenPage />;
  }

  return (
    <>
      {data == null ? (
        <Loading />
      ) : (
        <div className="main-bg relative">
          <Navbar />
          <h1 className="w-fit m-auto text-3xl text-secend_color mt-8 ">
            {arabic.personaldetails}
          </h1>
          {loading ? (
            <LoadingDashbord />
          ) : (
            <div className="parent">
              <div className="flex items-start max-md:items-center max-lg:flex-col gap-6 mt-2">
                <div className="right m-auto max-lg:w-[90%] flex flex-col items-center border-l-2 max-lg:border-transparent border-secend_color px-2">
                  <div className="flex relative items-center justify-center  ">
                    {image ? (
                      <Image
                        src={URL.createObjectURL(image)}
                        alt="user"
                        width={1024}
                        height={1280}
                        className="w-[220px] h-[220px]  rounded-full border-[6px] border-secend_color"
                      />
                    ) : (
                      <Image
                        src={form.image ? form.image : "/images/userbg.png"}
                        alt="user"
                        width={1024}
                        height={1280}
                        className="w-[220px] h-[220px] rounded-full border-[6px] border-secend_color"
                      />
                    )}
                    <div
                      onClick={() => openinput.current.click()}
                      className="w-[50px] cursor-pointer h-[50px] absolute left-0 bottom-8 bg-[#eeeae7] rounded-full flex items-center justify-center"
                    >
                      <CameraIcon />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center ">
                    <Stars
                      goldStars={Number(Math.ceil(data.rating))}
                      grayStars={5 - Number(Math.ceil(data.rating))}
                    />
                  </div>
                  <div className="form mt-4 max-lg:mt-4 h-fit hidden-scrollbar overflow-y-auto  w-full  flex flex-col items-center gap-4 ">
                    <form
                      onSubmit={handlesubmit}
                      className="flex flex-col gap-4 w-full"
                    >
                      <div className="flex items-center relative">
                        <input
                          onChange={handleChange}
                          placeholder=" إسم المستخدم"
                          name="name"
                          value={form.name}
                          type="text"
                          className={` placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full   bg-white border border-gray-200 shadow-md  outline-none px-11 `}
                        />
                        <User2 className="text-secend_color absolute mr-2" />
                      </div>
                      <div className="flex items-center relative w-full">
                        <input
                          className={`h-[50px] rounded-md w-full text-left  bg-white border border-gray-200 shadow-md  outline-none px-4 placeholder-shown:px-4`}
                          type="text"
                          placeholder="رقم الجوال"
                          name="phone_number"
                          value={`${form.phone_number}+`}
                          onChange={handleChange}
                          maxLength={15}
                        />
                        <Phone className="text-secend_color absolute mr-2" />
                      </div>
                      <div className="flex items-center justify-between w-1/2">
                        <p>الجنس</p>
                        <div className="flex-two">
                          <label>أنثى</label>
                          <input
                            onChange={handleChange}
                            value="male"
                            type="checkbox"
                            name="gender"
                            checked={form.gender === "male"}
                          />
                        </div>
                        <div className="flex-two">
                          <label>ذكر</label>
                          <input
                            onChange={handleChange}
                            value="female"
                            type="checkbox"
                            name="gender"
                            checked={form.gender === "female"}
                          />
                        </div>
                      </div>
                      <div className="flex items-center relative">
                        <input
                          onChange={handleChange}
                          placeholder="البريد الإلكترونى"
                          type="email"
                          name="email"
                          value={form.email}
                          className={` placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full   bg-white border border-gray-200 shadow-md  outline-none px-11 `}
                        />
                        <AtSign className="text-secend_color absolute mr-2" />
                      </div>
                      <input
                        onChange={handleChange}
                        readOnly
                        value={location.address}
                        name="location"
                        type="text"
                        className={`h-[50px] text-[13px] rounded-md w-full  border-none  bg-gray-300   shadow-md  outline-none px-4 placeholder-shown:px-4`}
                      />
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
                        name="skills_experiences"
                        value={form.skills_experiences}
                        placeholder="الخبرات والمهارات"
                        type="text"
                        className={` placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full   bg-white border border-gray-200 shadow-md  outline-none px-4 `}
                      />
                      {image_bank ? (
                        <Image
                          src={URL.createObjectURL(image_bank)}
                          alt="user"
                          width={1024}
                          height={1280}
                          className="w-[220px] h-[220px]  rounded-full border-[6px] border-secend_color"
                        />
                      ) : data.image_bank ? (
                        <Image
                          src={data?.image_bank}
                          alt="user"
                          width={1024}
                          height={1280}
                          className="w-[220px] h-[220px]  rounded-md shadow-md border-[6px] border-secend_color"
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
                        onChange={handleChange}
                        placeholder="نبذة عنى (إختيارى  )"
                        name="About"
                        value={form.About}
                        type="text"
                        className={`  text-secend_text placeholder-shown:pr-11 text-right h-[80px] rounded-md w-full   bg-white border border-gray-200 shadow-md  outline-none px-4 `}
                      />
                      <input
                        name="image_bank"
                        ref={openinputbank}
                        hidden
                        type="file"
                        onChange={handleimagebank}
                      />
                      <input
                        onChange={handleimagechange}
                        name="image"
                        ref={openinput}
                        hidden
                        type="file"
                      />
                      <input
                        type="submit"
                        value={arabic.savechaanggestext}
                        className=" cursor-pointer w-full  px-4 py-4 my-8 rounded-md text-center text-white bg-secend_color"
                      />
                    </form>
                    {done && (
                      <p className="my-4  text-[18px] px-2 py-1 rounded-md bg-green-300   ">
                        {done}
                      </p>
                    )}
                  </div>
                </div>
                <div className="left w-full">
                  <h1 className="w-fit m-auto text-2xl  my-8 ">
                    {arabic.servicesavailabletext}
                  </h1>
                  <div>
                    {vendorservices.length > 0 ? (
                      <div className="grid grid-cols-4  max-md:grid-cols-3 max-sm:grid-cols-2 gap-4 px-2 pb-4  w-full">
                        {vendorservices.map(
                          (service: allstring, index: number) => (
                            <Link
                              href={`/services/${service.id}/${service.id}`}
                              key={index}
                              className="w-fit h-fit flex flex-col items-start rounded-t-md  border shadow-md"
                            >
                              <Image
                                src={service.image}
                                alt="image"
                                width={1024}
                                height={1280}
                                className="w-full h-[200px] rounded-t-md"
                              />
                              <div className="content px-2 mt-1">
                                <h1 className="text-[18px] text-secend_color">
                                  {service.title}
                                </h1>
                                <p className="text-[14px] text-secend_text">
                                  {service.description}
                                </p>
                                <div className="flex-two w-fit self-end py-2 text-[15px] text-secend_text">
                                  <p>{service.coast}</p>
                                  <ShoppingCart width={16} />
                                </div>
                              </div>
                            </Link>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-[50vh] gap-3 flex flex-col items-center justify-center">
                        <h1>لم يتم إضافات خدمات حتى الأن</h1>
                        <Image
                          src={"/images/empty.svg"}
                          alt="image"
                          width={1024}
                          height={1280}
                          className="w-[300px]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {openmap && (
                <div className="map w-[90%] h-[60vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]">
                  <MapComponent setLocation={setLocation} />
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
          )}
        </div>
      )}
      <Callservicecustomer />
    </>
  );
}
