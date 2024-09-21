"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../_components/_Website/Navbar";
import { arabic } from "../content/AR";
import Image from "next/image";
import { Apple } from "lucide-react";
import { UseVariabels } from "../context/VariabelsContext";
import { instance } from "../Api/axios";
import LoadingDashbord from "../_components/LoadingDashbord";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const { currentuser, setmaincard, maincard, id } = UseVariabels();
  const [able, setable] = useState("");
  const [balance, setbalance] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [totalmaincard, settotalmaincard] = useState("");
  const [serviceswithamount, setserviceswithamount] = useState<any>([]);
  const [openradio, setopenradio] = useState("");

  const handelappleclick = () => {
    setopenradio(openradio == "apple" ? "" : "apple"),
      setable(able == "apple" ? "" : "apple");
  };
  const handelvisacardclick = () => {
    setopenradio(openradio == "visacard" ? "" : "visacard"),
      setable(able == "visacard" ? "" : "visacard");
  };
  const handelvalueclick = () => {
    setopenradio(openradio == "value" ? "" : "value"),
      setable(able == "value" ? "" : "value");
  };

  useEffect(() => {
    if (currentuser) {
      setbalance(currentuser.data.balance);
    }
  }, [currentuser]);
  useEffect(() => {
    const savedServicesWithAmount: any =
      localStorage.getItem("serviceswithamount");
    setserviceswithamount(JSON.parse(savedServicesWithAmount));
    console.log(serviceswithamount[0]);
  }, [able]);

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

  const handlePaywithbalabnce = async () => {
    try {
      setloading(true);
      if (balance < totalmaincard) {
        setloading(false);
        return seterror("الرصيد الحالى غير كافى لاتمام العملية ");
      }
      const formdata = new FormData();
      formdata.append("amount", totalmaincard);
      if (serviceswithamount) {
        formdata.append(
          "services_with_amount",
          JSON.stringify(serviceswithamount)
        );
      }
      const res = await instance.post(`/paywithbalance/${id}`, formdata);
      if (res.status == 200) {
        setmaincard([]);
        localStorage.removeItem("serviceswithamount");
        router.push(`/success?transactionId=${res.data}`);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error("Error processing payment:", error);
    }
  };

  return (
    <>
      <div className=" main-bg">
        <Navbar />
        {loading ? (
          <LoadingDashbord />
        ) : (
          <div className="main-page mt-16    ">
            <h1 className="text-2xl w-fit m-auto">{arabic.paywithtext}</h1>
            <div className="pay-metheods w-[90%] max-lg:w-full max-lg:px-3 m-auto mt-4 flex  max-lg:flex-col-reverse items-start justify-between">
              <div className="right h-[280px] px-4  w-1/2 max-lg:w-full">
                {/* <div className="apple w-full max-lg:mt-7">
                <div onClick={handelappleclick} className="inline-flex gap-2">
                  <div className="rounded-full cursor-pointer overflow-hidden w-[15px] h-[15px] flex items-center justify-center border bg-white ">
                    <div
                      className={`w-[7px] h-[7px] rounded-full duration-150  ${
                        openradio == "apple" ? "bg-orange-400" : ""
                      }`}
                    ></div>
                  </div>
                  <Apple width={14} />
                  <p>ApplePay</p>
                </div>
                <input
                  disabled={able !== "apple"}
                  style={{
                    direction: "ltr",
                    opacity: able == "apple" ? "1" : ".5",
                  }}
                  className="w-[90%] max-lg:w-full bg-slate-200 my-2  p-3  outline-none border shadow-md "
                  type="text"
                  name="appleemail"
                  placeholder="Email Adress"
                />
              </div> */}
                <div
                  onClick={handelvalueclick}
                  className="inline-flex gap-2 max-lg:mt-7"
                >
                  <div className="rounded-full cursor-pointer overflow-hidden w-[15px] h-[15px] flex items-center justify-center border bg-white ">
                    <div
                      className={`w-[7px] h-[7px] rounded-full duration-150  ${
                        openradio == "value" ? "bg-orange-400" : ""
                      }`}
                    ></div>
                  </div>
                  <p>الدفع عبر الرصيد</p>
                </div>
                {able == "value" && (
                  <div className="currentvalue mt-6">
                    <div
                      className="self-start mt-6"
                      style={{ direction: "rtl" }}
                    >
                      <label>الرصيد الحالى : </label>
                      <input
                        readOnly
                        value={`$${balance || 0}`}
                        style={{ direction: "ltr" }}
                        className="w-[90%] max-lg:w-full bg-slate-200 my-2  p-3  outline-none border-b border shadow-md  "
                        type="text"
                      />
                    </div>
                    <div
                      className="self-start mt-6"
                      style={{ direction: "rtl" }}
                    >
                      <label> قيمة العملية : </label>
                      <input
                        readOnly
                        value={`$${totalmaincard || 0}`}
                        style={{ direction: "ltr" }}
                        className="w-[90%] max-lg:w-full bg-slate-200 my-2  p-3  outline-none border-b border shadow-md  "
                        type="text"
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* <div className="left flex flex-col items-end w-1/2 max-lg:w-full px-5 lg:border-r  border-black">
              <div
                onClick={handelvisacardclick}
                className="flex-two w-fit mr-auto"
              >
                <label className="text-[14px]">Creadit Card</label>
                <div className="rounded-full cursor-pointer overflow-hidden w-[15px] h-[15px] flex items-center justify-center border bg-white ">
                  <div
                    className={`w-[7px] h-[7px] rounded-full duration-150  ${
                      openradio == "visacard" ? "bg-orange-400" : ""
                    }`}
                  ></div>
                </div>
              </div>
              <div className="flex-two visa-master mt-3 ">
                <Image
                  src={"/images/visa.png"}
                  alt="visa"
                  width={1024}
                  height={1280}
                  className="w-[60px]"
                />
                <Image
                  src={"/images/mastercard.png"}
                  alt="visa"
                  width={1024}
                  height={1280}
                  className="w-[60px]"
                />
              </div>
              <div
                style={{ opacity: able == "visacard" ? "1" : ".5" }}
                className="inputs w-full mt-3 px-1 flex items-end flex-col "
              >
                <input
                  disabled={able !== "visacard"}
                  style={{ direction: "ltr" }}
                  className="w-[90%] max-lg:w-full bg-slate-200 my-2  p-3  outline-none border-b border-amber-600 "
                  type="text"
                  name="cardname"
                  placeholder="Name on Card"
                />
                <input
                  disabled={able !== "visacard"}
                  style={{ direction: "ltr" }}
                  className="w-[90%] max-lg:w-full bg-slate-200 my-2  p-3  outline-none border-b border-amber-600 "
                  type="text"
                  name="cardnumber"
                  placeholder="card Number"
                />
                <div className="flex-two w-[90%] max-lg:w-full max-lg:flex-col">
                  <input
                    disabled={able !== "visacard"}
                    style={{ direction: "ltr" }}
                    className="w-[95%] max-lg:w-full bg-slate-200 my-2  p-3  outline-none border-b border-amber-600 "
                    type="text"
                    name="expirydate"
                    placeholder="Expiry Date"
                  />
                  <input
                    disabled={able !== "visacard"}
                    style={{ direction: "ltr" }}
                    className="w-[95%] max-lg:w-full bg-slate-200 my-2  p-3  outline-none border-b border-amber-600 "
                    type="text"
                    name="securitycode"
                    placeholder="Security Code"
                  />
                </div>
                <input
                  disabled={able !== "visacard"}
                  style={{ direction: "ltr" }}
                  className="w-[90%] max-lg:w-full bg-slate-200 my-2  p-3  outline-none border-b border-amber-600 "
                  type="text"
                  name="Zip-Postl Code"
                  placeholder="Zip / Postal Code"
                />
              </div>
            </div> */}
            </div>
            <div
              onClick={handlePaywithbalabnce}
              className="w-fit max-lg:w-[95%] m-auto mt-3"
            >
              <button className="main_btn">{arabic.payssure}</button>
            </div>
            {error && <p className="text-red-500 my-4 px-6 ">{error}</p>}
          </div>
        )}
      </div>
    </>
  );
}
