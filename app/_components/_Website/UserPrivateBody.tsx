"use client";
import { instance } from "@/app/Api/axios";
import { allstring } from "@/app/types/dashbordcontenttypes";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CameraIcon, MapPin, User2 } from "lucide-react";
import { arabic } from "@/app/content/AR";
import LoadingDashbord from "../LoadingDashbord";
import MapComponent from "../Map";
import Callservicecustomer from "./Callservicecustomer";
import ForbiddenPage from "./ForbddenPage";
import { UseVariabels } from "@/app/context/VariabelsContext";
import Navbar from "./Navbar";

export default function UserPrivateBody({ id }: { id: string }) {
  const { currentuser } = UseVariabels();
  /// states
  const openinput = useRef<any>(null);
  const [data, setdata] = useState<allstring | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const [openmap, setopenmap] = useState(false);
  const [error, seterror] = useState<string>("");
  const [done, setdone] = useState<string>("");
  const [image, setimage] = useState<any>("");
  const [location, setlocation] = useState<any>({});
  const [form, setform] = useState({
    name: "",
    phone_number: "",
    image: "",
  });

  // get user data

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await instance
          .get(`user/${id}`)
          .then((res) => setdata(res.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, [id]);

  //handle value of data

  useEffect(() => {
    if (data) {
      setform({
        name: data.name,
        phone_number: data.phone_number,
        image: data.image,
      });

      if (typeof data.location == "string") {
        setlocation(JSON.parse(data.location));
      } else {
        setlocation(data.location);
      }
    }
  }, [data]);

  console.log(form);

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

  // handle edit for user data
  const handlesubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("name", form.name);
      formdata.append("phone_number", form.phone_number);
      formdata.append("location", JSON.stringify(location));
      if (image) {
        formdata.append("image", image);
      }
      const res = await instance.post(`/user/${id}`, formdata);
      const newdata = res.data.data;
      setform({
        name: newdata.name,
        phone_number: newdata.phone_number,
        image: newdata.image,
      });
      setimage(null);
      setdone("تم تحديث البيانات بنجاح");
      setloading(false);
    } catch (error) {
      setloading(false);
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
      <Navbar />
      {loading ? (
        <LoadingDashbord />
      ) : data !== null ? (
        <div className="w-full  relative mt-16">
          <h1 className="text-4xl w-fit m-auto my-8 text-secend_color">
            {arabic.personaldetails}
          </h1>
          <div className="flex-between relative max-lg:flex-col justify-center items-center px-[20px] ">
            <div className="img max-lg:my-4 lg:ml-8 flex items-center justify-center relative  ">
              {image ? (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="user"
                  width={1024}
                  height={1280}
                  className="w-[220px] h-[220px] rounded-full border-[6px] border-secend_color"
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
            <div className="form w-1/2 lg:border-r border-r-amber-600 pr-6 max-lg:w-full flex flex-col items-center gap-4 ">
              <form
                onSubmit={handlesubmit}
                className="flex flex-col gap-4 w-[85%] max-lg:w-full"
              >
                <div className="flex items-center relative">
                  <input
                    onChange={handleChange}
                    placeholder="إسم المستخدم"
                    value={form.name}
                    name="name"
                    type="text"
                    className={` placeholder-shown:pr-11 text-right h-[50px] rounded-md w-full   bg-white border border-gray-200 shadow-md  outline-none px-11 `}
                  />
                  <User2 className="text-secend_color absolute mr-2" />
                </div>
                <div className="flex-two">
                  <input
                    onChange={handleChange}
                    className={`h-[50px] rounded-md w-full text-left  bg-white border border-gray-200 shadow-md  outline-none px-4 placeholder-shown:px-4`}
                    type="text"
                    placeholder="رقم الجوال"
                    value={`${form.phone_number}+`}
                    name="phone_number"
                    maxLength={15}
                  />
                </div>
                <input
                  onChange={handleChange}
                  readOnly
                  name="location"
                  value={location.address}
                  type="text"
                  className={`h-[50px] rounded-md w-full  border-none  bg-gray-300   shadow-md  outline-none px-4 placeholder-shown:px-4`}
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
                  name="image"
                  onChange={handleimagechange}
                  ref={openinput}
                  hidden
                  type="file"
                />
                <input
                  type="submit"
                  value={arabic.savechaanggestext}
                  className=" cursor-pointer w-full  px-4 py-4 mt-8 rounded-md text-center text-white bg-secend_color"
                />
              </form>
              {done && (
                <p className="my-4  text-[18px] px-2 py-1 rounded-md bg-green-300   ">
                  {done}
                </p>
              )}
              <Callservicecustomer />
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
        </div>
      ) : (
        <LoadingDashbord />
      )}
    </>
  );
}
