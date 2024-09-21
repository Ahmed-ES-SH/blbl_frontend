"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { instance } from "@/app/Api/axios";
import { arabic } from "@/app/content/AR";
import { allstring } from "@/app/types/dashbordcontenttypes";
import LoadingDashbord from "../LoadingDashbord";
import { UseVariabels } from "@/app/context/VariabelsContext";
import ForbddenPage from "./ForbddenPage";
export default function ServiceEditBody({ service_id }: any) {
  const { id } = UseVariabels();
  const openinput: React.MutableRefObject<any> = useRef(null);
  const [data, setdata] = useState<any>(null);
  const [loading, setloading] = useState<any>(false);
  const [image, setimage] = useState<any>("");
  const [extra_services, setextra_services] = useState<any>([]);
  const [extra_service, setextra_service] = useState<any>(null);
  const [form, setform] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await instance.get(`/services/${service_id}`);
        setdata(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, [service_id]);

  useEffect(() => {
    if (data) {
      setform({
        title: data.title,
        description: data.description,
        price: data.coast,
        image: data.image,
      });

      if (typeof data.extra_services == "string") {
        setextra_services(JSON.parse(data.extra_services));
      } else {
        setextra_services(data.extra_services);
      }
    }
  }, [data]);

  const handlechange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handlextra_serviceechange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setextra_service({ ...extra_service, [e.target.name]: e.target.value });
  };

  const handleimagechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setimage(files[0]);
    }
  };

  const handleedit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("title", form.title);
      formdata.append("description", form.description);
      formdata.append("coast", form.price);
      if (image) {
        formdata.append("image", image);
      }
      extra_services.push(extra_service);

      if (extra_services.length > 0) {
        formdata.append("extra_services", JSON.stringify(extra_services));
      }

      const res = await instance.post(`/service-edit/${service_id}`, formdata);
      setform({
        title: res.data.data.title,
        description: res.data.data.description,
        price: res.data.data.coast,
        image: res.data.data.image,
      });

      setextra_services(JSON.parse(res.data.data.extra_services));
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const reomveextraservcie = (title: any) => {
    setextra_services((prev: any) =>
      prev.filter((item: any) => item.title_extra_service != title)
    );
  };

  if (data !== null && data.vendor_id != id) {
    return <ForbddenPage />;
  }

  return (
    <>
      {data !== null ? (
        !loading ? (
          <div className="page-content px-4 py-2 w-full">
            <h1 className="text-right text-secend_color text-2xl mt-6 mb-2">
              {"تعديل الخدمة "}
            </h1>
            <div className="flex max-lg:flex-col items-start justify-between  ">
              <div className="w-[60%] max-sm:w-full">
                {image ? (
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="service"
                    width={1024}
                    height={1280}
                    className="w-[500px] max-sm:w-full"
                  />
                ) : (
                  <Image
                    src={form.image}
                    alt="service"
                    width={1024}
                    height={1280}
                    className="w-[500px] max-sm:w-full"
                  />
                )}
                <p
                  onClick={() => openinput.current.click()}
                  className="my-2 w-fit m-auto cursor-pointer"
                >
                  تعديل الصور{" "}
                </p>
              </div>
              <div className="texts-service w-[60%] max-lg:w-full h-full pr-3 border-r-2 border-secend_color">
                <form onSubmit={handleedit}>
                  <div className="flex flex-col items-start">
                    <label className="my-1">عنوان الخدمة</label>
                    <input
                      type="text"
                      name="title"
                      onChange={handlechange}
                      value={form.title}
                      className=" w-[40%] max-lg:w-3/4 max-sm:w-full border-secend_color border py-3 px-2 shadow-md outline-none bg-white rounded-md "
                    />
                    <p className="my-3 text-[14px] text-secend_text">
                      {arabic.descinputTitletext}
                    </p>
                  </div>
                  <div className="flex-two max-md:flex-col max-lg:items-start w-3/4 max-lg:w-full">
                    <div className="flex flex-col  items-start max-lg:w-full ">
                      <label className="my-1">{arabic.descservicetext}</label>
                      <textarea
                        name="description"
                        onChange={handlechange}
                        value={form.description}
                        className=" max-lg:w-full  border-secend_color whitespace-normal border h-[80px] overflow-y-auto py-3 px-2 shadow-md outline-none bg-white rounded-md "
                      />
                    </div>
                    <div className="flex flex-col items-start w-fit">
                      <label className="text-center my-1">
                        {arabic.pricetext}
                      </label>
                      <input
                        name="price"
                        onChange={handlechange}
                        value={form.price}
                        type="number"
                        className=" w-[42%] text-[13px] max-lg:w-1/2  border-secend_color border  py-3 px-2 shadow-md outline-none bg-white rounded-md "
                      />
                      <p className="text-[12px] pt-2 text-secend_text text-center">
                        انقر مرتين لتعديل السعر{" "}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-2 my-2 rounded-md  w-[60%] max-lg:w-full">
                    <label className="my-1 border-b pb-1 border-black  w-fit">
                      الخدمات الإضافية{" "}
                    </label>
                    {data.extra_services &&
                      extra_services.map((service: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex my-4 bg-main_color rounded-sm px-2  py-8 relative items-center justify-between w-full cursor-pointer"
                          >
                            <div className="flex gap-2 items-center">
                              <p>{service.title_extra_service}</p>
                            </div>
                            <p>${service.coast_extra_service}</p>
                            <p
                              onClick={() =>
                                reomveextraservcie(service.title_extra_service)
                              }
                              className=" absolute top-0 right-0 px-3 py-1 text-center text-white bg-secend_color hover:bg-red-300 duration-200"
                            >
                              -
                            </p>
                          </div>
                        );
                      })}
                  </div>

                  <div className="flex-two max-md:flex-col max-md:items-start w-[60%] max-lg:w-full">
                    <div className="flex flex-col items-start">
                      <label className="my-1">{arabic.extraSercicetext}</label>
                      <input
                        type="text"
                        onChange={handlextra_serviceechange}
                        name="title_extra_service"
                        className=" w-[80%] max-md:w-full border-secend_color border h-[60px] py-3 px-2 shadow-md outline-none bg-white rounded-md "
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="text-center my-1">
                        {arabic.Fortext}
                      </label>
                      <input
                        type="number"
                        onChange={handlextra_serviceechange}
                        name="coast_extra_service"
                        className=" w-[42%] max-lg:w-1/2 border-secend_color border  py-3 px-2 shadow-md outline-none bg-white rounded-md "
                      />
                      <p className="text-[12px] text-center text-secend_text pt-2">
                        انقر مرتين لتعديل السعر
                      </p>
                    </div>
                  </div>
                  <input
                    name="image"
                    onChange={handleimagechange}
                    ref={openinput}
                    type="file"
                    hidden
                  />
                  <div className="w-fit m-auto">
                    <input
                      type="submit"
                      value={arabic.savechaanggestext}
                      className="w-[300px] m-auto px-8 py-2 rounded-md cursor-pointer shadow-md text-white mt-16 bg-secend_color"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <LoadingDashbord />
        )
      ) : (
        <LoadingDashbord />
      )}
    </>
  );
}
