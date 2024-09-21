"use client";
import { Check, MapPinIcon, Settings2, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import LoadingDashbord from "../LoadingDashbord";
import Image from "next/image";
import { instance } from "@/app/Api/axios";
import { arabic } from "@/app/content/AR";
import StartConversationLink from "./StartConversationLink";
import Link from "next/link";
import { UseVariabels } from "@/app/context/VariabelsContext";

interface Service {
  id: number;
  title: string;
  description: string;
  coast: string;
  image: string;
  vendor: {
    id: number;
    location: string;
  };
  extra_services?: any;
}

interface ExtraService {
  title_extra_service: string;
  coast_extra_service: string;
}

interface CardService {
  id?: number;
  title_extra_service?: string;
  coast_extra_service?: string;
  totalAmount?: string;
}

export default function ServiceBody({ id }: { id: number }) {
  const { currentuser, setmaincard, maincard } = UseVariabels();
  const [data, setdata] = useState<any>(null);
  const [location, setlocation] = useState<any>(null);
  const [extra_services, setextra_services] = useState<any>(null);
  const [isincard, setisincard] = useState<any>(false);
  const [cardservice, setcardservice] = useState<CardService[]>([]);
  const [totalAmount, setTotalAmount] = useState<string>("0.00");

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await instance.get(`/services/${id}`);
        setdata(res.data.data);
        setextra_services(res.data.data.extra_services);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, [id]);

  useEffect(() => {
    if (data) {
      const total = cardservice
        .reduce(
          (total, service) =>
            total + parseFloat(service.coast_extra_service || "0"),
          parseFloat(data.coast || "0")
        )
        .toFixed(2);
      setTotalAmount(total);
    }
  }, [cardservice, data]);

  const vendorid = data?.vendor.id;

  const addServiceToCart = (service: ExtraService) => {
    setcardservice((prev) => {
      const mainServiceInCart = prev.some((item) => item.id === data?.id);
      const extraServiceInCartIndex = prev.findIndex(
        (item) => item.title_extra_service === service.title_extra_service
      );

      let updatedServices = [...prev];

      if (!mainServiceInCart) {
        updatedServices.push({
          ...data!,
          title_extra_service: "",
          coast_extra_service: "0",
        });
      }

      if (extraServiceInCartIndex !== -1) {
        // Remove the extra service from the cart
        updatedServices.splice(extraServiceInCartIndex, 1);
      } else {
        // Add the extra service to the cart
        updatedServices.push({
          ...service,
        });
      }

      // Recalculate the total amount
      const newTotal = updatedServices
        .reduce(
          (total, item) => total + parseFloat(item.coast_extra_service || "0"),
          parseFloat(data?.coast || "0")
        )
        .toFixed(2);
      setTotalAmount(newTotal);

      // Update the total amount object instead of adding a new one
      const totalAmountIndex = updatedServices.findIndex(
        (item) => item.totalAmount !== undefined
      );
      if (totalAmountIndex !== -1) {
        updatedServices[totalAmountIndex].totalAmount = newTotal;
      } else {
        updatedServices.push({ totalAmount: newTotal });
      }

      return updatedServices;
    });
  };

  const handleAddToCart = () => {
    setcardservice((prev) => {
      // ابحث عن الخدمة الحالية في السلة
      const existingServiceIndex = prev.findIndex(
        (item) => item.id === data?.id
      );

      // احصل على الخدمات الإضافية الخاصة بالخدمة الجديدة
      const additionalServices = cardservice.filter(
        (item) => item.title_extra_service
      );

      // إذا كانت الخدمة غير موجودة في السلة، أضفها
      if (existingServiceIndex === -1) {
        const updatedCart = [
          ...prev,
          {
            ...data!,
            extra_services: additionalServices, // خدمات إضافية
            totalAmount: totalAmount, // إجمالي المبلغ الخاص بالخدمة
          },
        ];
        setmaincard(updatedCart);
        return updatedCart;
      } else {
        // إذا كانت الخدمة موجودة في السلة، تحقق مما إذا كانت موجودة في maincard
        const maincardServiceIndex = maincard.findIndex(
          (item: any) => item.id === data?.id
        );

        let updatedMaincard = [...maincard];

        if (maincardServiceIndex === -1) {
          // إذا كانت الخدمة غير موجودة في maincard، أضفها
          const updatedCart = [
            ...maincard,
            {
              ...data!,
              extra_services: additionalServices, // خدمات إضافية
              totalAmount: totalAmount, // إجمالي المبلغ الخاص بالخدمة
            },
          ];
          setmaincard(updatedCart);
        } else {
          // إذا كانت الخدمة موجودة في maincard، أضف الخدمات الإضافية الجديدة إليها
          updatedMaincard[maincardServiceIndex] = {
            ...updatedMaincard[maincardServiceIndex],
            extra_services: additionalServices, // تحديث الخدمات الإضافية
            totalAmount: totalAmount, // تحديث إجمالي المبلغ
          };
          setmaincard(updatedMaincard);
        }

        return prev;
      }
    });
  };

  useEffect(() => {
    if (data) {
      setlocation(JSON.parse(data?.vendor?.location));
    }
  }, [data]);

  const addtotal = () => {
    setcardservice((prev) => {
      // ابحث عن الخدمة الحالية في السلة
      const existingServiceIndex = prev.findIndex(
        (item) => item.id === data?.id
      );

      if (existingServiceIndex !== -1) {
        // إذا كانت الخدمة موجودة في السلة، قم بتحديث المبلغ الإجمالي
        const updatedServices = [...prev];
        updatedServices[existingServiceIndex].totalAmount = totalAmount;

        setmaincard(updatedServices);
        return updatedServices;
      } else {
        return prev;
      }
    });
  };

  useEffect(() => {
    if (data) {
      if (typeof extra_services == "string") {
        setextra_services(JSON.parse(extra_services));
      } else {
        setextra_services(extra_services);
      }
    }
  }, [extra_services, data]);

  useEffect(() => {
    if (maincard) {
      const isinmaincard =
        data && maincard.some((service: any) => service.id == data.id);
      if (isinmaincard) {
        setisincard(true);
      } else {
        setisincard(false);
      }
    }
  }, [maincard]);

  console.log(extra_services);

  return (
    <>
      {!data ? (
        <LoadingDashbord />
      ) : (
        <div className="main-page relative w-[85%] m-auto px-4 py-2 bg-bglight rounded-md shadow-md h-fit mt-6">
          <div className="service flex items-center justify-evenly max-lg:flex-col">
            <div className="w-[500px] max-lg:w-full">
              <h1 className="text-3xl text-main_color my-3 whitespace-nowrap">
                {data.title}
              </h1>
              <Image
                src={data.image}
                alt="service"
                width={1024}
                height={1280}
                className="w-[500px] max-lg:m-auto h-[300px] rounded-md"
              />
              <div className="flex-between relative max-md:flex-col max-md:gap-2 w-full mt-2">
                <div className="flex-two text-amber-600">
                  <MapPinIcon />
                  <p className="text-black text-[12px]">{location?.address}</p>
                </div>
                <StartConversationLink
                  secendparty_id={vendorid}
                  secendparty_type={"vendor"}
                />
              </div>
              <div className="w-fit m-auto my-5">
                سعر الخدمة{" "}
                <span className="text-secend_color">{data.coast}$</span>
              </div>
            </div>
            <div className="flex flex-col items-center w-[400px] max-md:w-full">
              <h1 className="my-1">{arabic.descservicetext}</h1>
              <div className=" w-full h-[200px] max-md:w-full  max-h-fit overflow-y-auto shadow-md border rounded-md px-2 py-1">
                {data.description}
              </div>
              {extra_services &&
                Array.isArray(extra_services) &&
                extra_services.map((service: any, index: number) => {
                  const isSelected = cardservice.some(
                    (item) =>
                      item.title_extra_service === service.title_extra_service
                  );
                  return (
                    <div
                      onClick={() => addServiceToCart(service)}
                      key={index}
                      className="flex my-2 items-center justify-between w-full cursor-pointer"
                    >
                      <div className="flex gap-2 items-center">
                        <div className="rounded-full overflow-hidden w-[15px] h-[15px] flex items-center justify-center border bg-white">
                          <div
                            className={`w-[7px] h-[7px] rounded-full duration-150 ${
                              isSelected ? "bg-orange-400" : ""
                            }`}
                          ></div>
                        </div>
                        <p>{service.title_extra_service}</p>
                      </div>
                      <p>${service.coast_extra_service}</p>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="w-fit m-auto">
            <div className="flex-two">
              <p>الإجمالي</p>
              <p className="px-3 py-1 border text-secend_color rounded-md shadow-md">
                {totalAmount}$
              </p>
            </div>
          </div>
          {isincard ? (
            <div
              onClick={addtotal}
              className="flex-two main_btn hover:bg-transparent hover:border-secend_color border border-transparent duration-150 hover:text-secend_color hover:scale-110 w-fit px-8 cursor-pointer"
            >
              <Check />
              <p>تم إضافتها الى السلة </p>
            </div>
          ) : (
            currentuser &&
            !currentuser?.data?.is_guest && (
              <div onClick={handleAddToCart} className="w-fit m-auto">
                <div
                  onClick={addtotal}
                  className="flex-two main_btn hover:bg-transparent hover:border-secend_color border border-transparent duration-150 hover:text-secend_color hover:scale-110 w-fit px-8 cursor-pointer"
                >
                  <ShoppingCart />
                  <p>إضافة إلى السلة</p>
                </div>
              </div>
            )
          )}
          {currentuser &&
            currentuser.type === "vendor" &&
            currentuser.data.id === data.vendor.id && (
              <Link
                href={`/services/${data.id}/${data.id}`}
                className="Edit-service absolute top-2 left-3 bg-secend_color p-2 rounded-md drop-shadow-md text-white flex items-center justify-between gap-2 w-[120px] max-sm:w-fit max-sm:text-[13px] whitespace-nowrap h-fit"
              >
                <p>تعديل الخدمة</p>
                <Settings2 />
              </Link>
            )}
        </div>
      )}
    </>
  );
}
