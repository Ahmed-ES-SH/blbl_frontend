"use client";
import { arabic } from "@/app/content/AR";
import { instance } from "@/app/Api/axios";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { allstring } from "@/app/types/dashbordcontenttypes";
import { useRouter } from "next/navigation";
import LoadingDashbord from "../LoadingDashbord";

export default function AddService() {
  const router = useRouter();
  const openinput = useRef<any>(null);
  const [open, setopen] = useState(false);
  const [imageorvideo, setimageorvideo] = useState("");
  const [form, setform] = useState({
    title: "",
    description: "",
    coast: "",
    link_video: "",
    servicetype_id: "",
  });

  const [image, setimage] = useState<any>("");
  const [currentuser, setcurrentuser] = useState<any>(null);
  const [loading, setloading] = useState<any>(false);
  const [extra_services, setextra_services] = useState<any>([]);
  const [servicestypes, setservicestypes] = useState<any>(null);
  const [extra_service, setextra_service] = useState<any>({});

  const handlesubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("title", form.title);
      formdata.append("description", form.description);
      formdata.append("coast", form.coast);
      formdata.append("start_price", "0");
      formdata.append("end_price", "0");
      formdata.append("vendor_id", currentuser.data.id);
      formdata.append("servicetype_id", form.servicetype_id);
      if (image) {
        formdata.append("image", image);
      }

      extra_services.push(extra_service);

      if (extra_services.length > 0) {
        formdata.append("extra_services", JSON.stringify(extra_services));
      }

      if (form.link_video !== "") {
        formdata.append("link_video", form.link_video);
      }
      const res = await instance.post("/services/add", formdata);
      console.log(res);
      router.push(`/vendorpublicpage/${currentuser.data.id}`);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const gettypes = async () => {
      try {
        const res = await instance
          .get("/servicestypes")
          .then((res) => setservicestypes(res.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    gettypes();
  }, []);
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await instance
          .get("/user")
          .then((res) => setcurrentuser(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);

  const handlechange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handlextra_serviceechange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setextra_service({
      ...extra_service,
      [e.target.name]: e.target.value,
    });
  };

  const handleimagechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setimage(files[0]);
    }
  };
  console.log(currentuser && currentuser.data.id);
  return (
    <>
      {loading ? (
        <LoadingDashbord />
      ) : (
        <div className="page-content px-4 py-2 w-full">
          <h1 className="text-right text-secend_color text-2xl mt-6 mb-2">
            {arabic.addnewservicetext}
          </h1>
          <div className="flex max-lg:flex-col items-start justify-between ">
            <div className="addphoto-video w-[30%] max-lg:w-full">
              <div
                onClick={() => setopen((prev) => !prev)}
                className=" cursor-pointer flex-two shadow-lg w-fit px-6 py-2 border border-black text-[20px]"
              >
                <PlusCircle />
                <p className="font-bold">{arabic.addimageorvidotext}</p>
              </div>
              <h1 className="text-[16px] text-secend_color mt-4">
                {arabic.descinputimagetext}
              </h1>
              {open &&
                (image ? (
                  <Image
                    onClick={() => openinput.current.click()}
                    src={URL.createObjectURL(image)}
                    alt="add"
                    width={1024}
                    height={1280}
                    className="w-[200px] m-auto my-2 cursor-pointer"
                  />
                ) : (
                  <motion.div
                    initial={{ height: 0, width: 0 }}
                    animate={{ height: 200, width: "100%" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border  shadow-md  overflow-hidden rounded-md my-4 bg-bglight"
                  >
                    <div className="w-full">
                      <div className="flex items-center text-[14px] border-b">
                        <button
                          onClick={() => setimageorvideo("image")}
                          className="px-2 py-1 border"
                        >
                          أضف صورة من الجهاز
                        </button>
                        <button
                          onClick={() => setimageorvideo("video")}
                          className="px-2 py-1 border"
                        >
                          {" "}
                          أضف رابط فيديو خاض بالخدمة
                        </button>
                      </div>
                      {imageorvideo == "video" && (
                        <div className="px-2 my-3">
                          <label>رابط الفيديو :</label>
                          <input
                            name="link_video"
                            value={form.link_video}
                            onChange={handlechange}
                            type="text"
                            className="w-full outline-none bg-bglight border shadow-md px-2 py-1 "
                          />
                        </div>
                      )}
                      {imageorvideo == "image" && (
                        <div className="px-2 my-3 flex flex-col items-center">
                          <label className="self-start"> أضف صورة:</label>
                          <input
                            name="image"
                            multiple
                            ref={openinput}
                            type="file"
                            hidden
                            onChange={handleimagechange}
                          />

                          <Image
                            onClick={() => openinput.current.click()}
                            src={"/dashbord/add.png"}
                            alt="add"
                            width={1024}
                            height={1280}
                            className="w-[50px] my-2 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
            <div className="texts-service w-[60%] max-lg:w-full h-full pr-3 border-r-2 border-secend_color">
              <form onSubmit={handlesubmit}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-start">
                    <label className="my-1">عنوان الخدمة</label>
                    <input
                      onChange={handlechange}
                      value={form.title}
                      name="title"
                      type="text"
                      className=" w-[70%] max-lg:w-3/4 max-sm:w-full border-secend_color border py-3 px-2 shadow-md outline-none bg-white rounded-md "
                    />
                    <p className="my-3 text-[14px] text-secend_text">
                      {arabic.descinputTitletext}
                    </p>
                  </div>
                  {servicestypes == null ? (
                    <p> جارى تحميل الأقسام...</p>
                  ) : (
                    <div className="flex flex-col items-start">
                      <label className="my-1">قسم الخدمة</label>
                      <select
                        name="servicetype_id"
                        onChange={handlechange}
                        className=" outline-none p-2 rounded-md shadow-md"
                      >
                        {servicestypes.map((type: allstring, index: number) => (
                          <option value={type.id} key={index}>
                            {type.title}
                          </option>
                        ))}
                      </select>
                      <p className="my-3 text-[14px] text-secend_text">
                        إختر تنصيف يناسب خدمتك
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex-two w-3/4 max-lg:w-full">
                  <div className="flex flex-col items-start">
                    <label className="my-1">{arabic.descservicetext}</label>
                    <input
                      onChange={handlechange}
                      value={form.description}
                      name="description"
                      type="text"
                      className="  border-secend_color border h-[80px] py-3 px-2 shadow-md outline-none bg-white rounded-md "
                    />
                  </div>
                  <div className="flex flex-col items-start max-sm:mr-[30px]">
                    <label className="text-center my-1">
                      {arabic.pricetext}
                    </label>
                    <input
                      onChange={handlechange}
                      value={form.coast}
                      name="coast"
                      type="number"
                      className=" w-[30%] max-lg:w-1/2 max-sm:w-full border-secend_color border  py-3 px-2 shadow-md outline-none bg-white rounded-md "
                    />
                    <p className="text-[12px] pt-2 text-secend_text text-center">
                      انقر مرتين لتعديل السعر{" "}
                    </p>
                  </div>
                </div>
                <div className="flex-two w-[60%] max-lg:w-full">
                  <div className="flex flex-col items-start">
                    <label className="my-1">{arabic.extraSercicetext}</label>
                    <input
                      onChange={handlextra_serviceechange}
                      name="title_extra_service"
                      type="text"
                      className=" w-[80%] border-secend_color border h-[60px] py-3 px-2 shadow-md outline-none bg-white rounded-md "
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <label className="text-center my-1">{arabic.Fortext}</label>
                    <input
                      onChange={handlextra_serviceechange}
                      name="coast_extra_service"
                      type="number"
                      className=" w-[30%] max-lg:w-1/2 border-secend_color border  py-3 px-2 shadow-md outline-none bg-white rounded-md "
                    />
                    <p className="text-[12px] text-center text-secend_text pt-2">
                      انقر مرتين لتعديل السعر
                    </p>
                  </div>
                </div>
                <input
                  value={arabic.addservicebtntext}
                  type="submit"
                  className="w-[300px] m-auto px-8 py-2 rounded-md cursor-pointer shadow-md text-white mt-16 bg-secend_color"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
