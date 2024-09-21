"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../_components/_Website/Navbar";
import { arabic } from "../content/AR";
import Image from "next/image";
import { Trash } from "lucide-react";
import { instance } from "../Api/axios";
import Cookie from "cookie-universal";
import { useRouter } from "next/navigation";
import { UseVariabels } from "../context/VariabelsContext";
import Callservicecustomer from "../_components/_Website/Callservicecustomer";
export default function PaymentPage() {
  const { setmaincard, maincard, currentuser, setglobalamount } =
    UseVariabels();
  const cookie = Cookie();
  const router = useRouter();
  const token = cookie.get("token");
  const [serviceswithamount, setserviceswithamount] = useState([]);
  const [updatebalance, setupdatebalance] = useState(false);
  const [totalmaincard, settotalmaincard] = useState("");

  const handlePayment = async () => {
    try {
      const formdata = new FormData();
      formdata.append("name", currentuser.data.name);
      formdata.append("user_id", currentuser.data.id);
      formdata.append("email", currentuser.data.email);
      formdata.append("phoneNumber", currentuser.data.phone_number);
      formdata.append("amount", totalmaincard);
      if (serviceswithamount) {
        formdata.append(
          "servicesWithAmount",
          JSON.stringify(serviceswithamount)
        );
      }
      const res = await instance.post(`/payment/create`, formdata);
      console.log("Add Funds response:", res.data);
      router.push(res.data.Data.InvoiceURL);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const gotobalancepage = () => {
    try {
      setglobalamount(totalmaincard);
      localStorage.setItem(
        "serviceswithamount",
        JSON.stringify(serviceswithamount)
      );
      router.push("/paymentpage");
    } catch (error) {
      console.log(error);
    }
  };

  const handeldelete = (id: any) => {
    setmaincard((prev: any) => prev.filter((service: any) => service.id != id));
  };

  useEffect(() => {
    if (maincard) {
      const total = maincard.reduce((acc: any, rec: any) => {
        // Ensure rec.coast is treated as a number for proper calculation
        const coast = parseFloat(rec.totalAmount) || 0; // Convert to number, default to 0 if NaN
        return acc + coast;
      }, 0);
      settotalmaincard(total);
    }
  }, [maincard]);

  useEffect(() => {
    if (maincard) {
      const aggregatedServices = maincard.reduce((acc: any, service: any) => {
        acc.push({
          id: service.vendor_id,
          totalAmount: service.totalAmount,
        });
        return acc;
      }, []);

      setserviceswithamount(aggregatedServices);
    }
  }, [maincard]);

  return (
    <>
      <div className=" main-bg">
        <Navbar />
        <div className="main-page mt-16   ">
          <h1 className="text-2xl w-fit m-auto">{arabic.basketcarttext}</h1>
          <div className="main-page  w-[90%] max-lg:w-full max-lg:px-3 m-auto mt-4 flex  max-lg:flex-col-reverse items-center justify-between">
            <div className="left flex flex-col items-end w-1/2 max-lg:w-full ">
              {maincard && maincard.length > 0 ? (
                <div className="grid grid-cols-2 max-lg:grid-cols-3 max-lg:mt-8 max-sm:grid-cols-2 gap-4 px-2 pb-4 w-full">
                  {maincard.map((service: any, index: number) => (
                    <div
                      key={index}
                      className="w-[90%] max-md:w-full h-[352px] max-h-fit flex flex-col items-start rounded-t-md border shadow-md"
                    >
                      <Image
                        src={service?.image}
                        alt="image"
                        width={1024}
                        height={1280}
                        className="w-full h-[200px] rounded-t-md"
                      />
                      <div className="content w-full px-2 mt-1">
                        <h1 className="text-[18px] text-secend_color">
                          {service?.title}
                        </h1>
                        <p className="text-[14px] text-secend_text">
                          {service?.description}
                        </p>
                        <div className="flex-between py-2 text-[15px] text-secend_text">
                          <p>{service?.coast}$</p>
                          <div
                            onClick={() => handeldelete(service?.id)}
                            className=""
                          >
                            <Trash
                              className="cursor-pointer text-secend_color"
                              width={20}
                            />
                          </div>
                        </div>
                        {/* Show additional services associated with this main service */}
                        {service.extra_services &&
                          service.extra_services.length > 0 && (
                            <div className="extra-services mt-2">
                              {service.extra_services.map(
                                (extra: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="text-[14px] text-secend_text w-full flex items-center justify-between px-2 my-1"
                                  >
                                    <p>{extra.title_extra_service}: </p>
                                    <p>{extra.coast_extra_service}$</p>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-[40vh] flex flex-col items-center justify-center gap-3">
                  <Image
                    src={"/images/undraw_empty_cart_co35.svg"}
                    alt=""
                    width={1024}
                    height={1280}
                    className="w-[400px]"
                  />
                  <h1>لم تقم بإضافة خدمات إلى السلة بعد .</h1>
                </div>
              )}
            </div>

            <div className="right   w-1/2 max-lg:w-full px-5 lg:border-r  border-black">
              <div className="copons w-fit m-auto">
                <h1 className="text-xl w-fit my-3 m-auto">كوبونات الخصم</h1>
                <div className="flex-two justify-center">
                  <div className="coponcard w-[170px] max-md:w-[150px] h-[220px] rounded-md border shadow-md px-[1px] py-1 flex flex-col items-center justify-center">
                    <p className="text-5xl text-secend_color ">50%</p>
                    <p className="text-[16px] text-center">
                      احصل على خصم 50% عند استخدام هذا الكوبون{" "}
                    </p>
                  </div>
                  <div className="coponcard w-[170px] max-md:w-[150px] h-[220px] rounded-md border shadow-md px-[1px] py-1 flex flex-col items-center justify-center">
                    <p className="text-5xl text-secend_color ">50%</p>
                    <p className="text-[16px] text-center">
                      احصل على خصم 50% عند استخدام هذا الكوبون{" "}
                    </p>
                  </div>
                </div>
                <h1 className="text-xl w-fit my-3 m-auto"> ملخص الدفع</h1>
                <div className="content w-[70%] m-auto max-sm:w-full">
                  <div className="flex-between w-full py-3">
                    <p>المجموع الفرعى </p>
                    <p>${totalmaincard || 0}</p>
                  </div>
                  <div className="flex-between w-full py-3">
                    <p> رسوم التوصيل </p>
                    <p>$5</p>
                  </div>
                  <div className="flex-between w-full font-bold py-3">
                    <p> المبلغ الإجمالى</p>
                    <p>${totalmaincard + 5}</p>
                  </div>
                </div>
                <button
                  onClick={handlePayment}
                  className="px-8 py-2 my-3 text-center text-[18px] text-white bg-secend_color rounded-md shadow-md w-[400px] max-md:w-[98%]"
                >
                  {arabic.payssure}
                </button>
              </div>
              <div className="w-fit m-auto my-4">
                <div
                  onClick={gotobalancepage}
                  className=" cursor-pointer text-[18px] text-secend_color  whitespace-nowrap  underline underline-secend_color   w-fit max-md:w-[98%]"
                >
                  الدفع عن طريق الرصيد
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Callservicecustomer />
    </>
  );
}
