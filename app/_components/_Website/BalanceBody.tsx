"use client";
import { instance } from "@/app/Api/axios";
import { arabic } from "@/app/content/AR";
import { UseVariabels } from "@/app/context/VariabelsContext";
import { ChevronLeft, DollarSign, MapPin, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoadingDashbord from "../LoadingDashbord";
import { useRouter } from "next/navigation";
import Cookie from "cookie-universal";
export default function BalanceBody() {
  const router = useRouter();
  const cookie = Cookie();
  const token = cookie.get("token");

  const { id, currentuser } = UseVariabels();
  const [totaladdresses, settotaladdresses] = useState("");
  const [orderadd, setorderadd] = useState("");
  const [totalorders, settotalorders] = useState(0);
  const [openordermoney, setopenordermoney] = useState(false);
  const [loading, setloading] = useState(false);
  const [openaddmoney, setopenaddmoney] = useState(false);
  const [paypalaccounet, setpaypalaccounet] = useState("");
  const [done, setdone] = useState("");
  const [error, seterror] = useState("");
  const [amount, setamount] = useState("");
  const [addamount, setaddamount] = useState("");

  useEffect(() => {
    const countaddresses = async () => {
      try {
        const res = await instance.get(
          `/addresses-total/${id}/${currentuser.type}`
        );
        settotaladdresses(res.data.total_addresses);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      countaddresses();
    }
  }, [id]);

  useEffect(() => {
    const fetchuserData = async () => {
      try {
        const res = await instance.get(
          `/orders-count/${id}/${currentuser.type}`
        );
        settotalorders(res.data.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchuserData();
  }, [id, currentuser]);

  const handleordermoney = async () => {
    try {
      setloading(true);
      setdone("");
      seterror("");
      const formdata = new FormData();
      formdata.append("vendor_id", id);
      formdata.append("paypalaccount", paypalaccounet);
      formdata.append("amount", amount);
      const res = await instance.post("/orders-money-add", formdata);
      setpaypalaccounet("");
      setamount("");
      setdone(
        "تم إرسال طلبك بنجاح فى العادة يتم مراجعة الطلب  فى مدة من 24 ساعة الى 48 ساعة"
      );
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror("حدث خطأ أثناء إرسال طلبك. الرجاء المحاولة مرة أخرى.");
      console.log(error);
    }
  };

  const handleAddFunds = async () => {
    try {
      const formdata = new FormData();
      formdata.append("name", currentuser.data.name);
      formdata.append("email", currentuser.data.email);
      formdata.append("amount", addamount);
      formdata.append("user_id", id);
      const res = await instance.post(`/payment/addfunds`, formdata);
      console.log("Add Funds response:", res.data);
      router.push(res.data.Data.InvoiceURL); // إعادة التوجيه إلى رابط الفاتورة
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  };

  return (
    <>
      {currentuser ? (
        loading ? (
          <LoadingDashbord />
        ) : (
          <div className="main-page w-[50%] max-md:w-[90%]  ">
            <div className="title text-2xl text-center my-4">
              {arabic.valuetext}
            </div>
            <div className="w-full mt-11">
              <div className="flex-between w-full">
                <Link href={"/orders"} className="flex-two">
                  <ShoppingCart />
                  <p>{arabic.ordersnumbertext}</p>
                </Link>
                <div className="flex-two">
                  <p>{totalorders}</p>
                  <ChevronLeft />
                </div>
              </div>
              <div className="flex-between w-full my-6">
                <Link href={"/addresses"} className="flex-two">
                  <MapPin />
                  <p>{arabic.addressessavedtext}</p>
                </Link>
                <div className="flex-two">
                  <p>{totaladdresses}</p>
                  <ChevronLeft />
                </div>
              </div>
              {currentuser.type == "user" && (
                <div className="w-full">
                  <div className="flex-between w-full my-6">
                    <div className="flex-two">
                      <DollarSign />
                      <p>
                        الرصيد الكلى :{" "}
                        <span>{currentuser?.data?.balance || 0}$</span>
                      </p>
                    </div>
                    <div className="flex-two">
                      <p
                        onClick={() => setopenaddmoney((prev) => !prev)}
                        className="underline text-secend_color cursor-pointer ml-2"
                      >
                        {"+أضف"}
                      </p>
                    </div>
                  </div>
                  {openaddmoney && (
                    <div className="flex flex-col items-start ">
                      <label className="my-2">المبلغ :</label>
                      <input
                        value={addamount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setaddamount(e.target.value)
                        }
                        className="w-1/2 max-md:w-3/4 max-sm:w-full outline-none rounded-md shadow-md px-4 py-2 "
                        placeholder="المبلغ..."
                        type="number"
                        name="amount"
                        min={0}
                      />
                      <button
                        onClick={handleAddFunds}
                        className={`px-4 py-2 rounded-md bg-secend_color  shadow-md text-white  self-end my-2`}
                      >
                        إضافة
                      </button>
                    </div>
                  )}
                </div>
              )}
              {currentuser.type == "vendor" && (
                <div className=" w-full my-6">
                  <div className="flex-two">
                    <DollarSign />
                    <p>{arabic.valueaccounttext}</p>
                  </div>
                  <div className="flex-between my-4 w-[95%] mr-8 ">
                    <p>
                      الرصيد الكلى :{" "}
                      <span>{currentuser?.data?.balance || 0}$</span>
                    </p>
                    <p
                      onClick={() => setopenordermoney((prev) => !prev)}
                      className="underline text-secend_color self-end cursor-pointer ml-2"
                    >
                      {"+سحب"}
                    </p>
                  </div>
                  {currentuser && openordermoney && (
                    <div className="w-full flex flex-col items-start">
                      <label className="my-2">
                        أدخل حسابك الخاص ب paypal :{" "}
                      </label>
                      <input
                        value={paypalaccounet}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setpaypalaccounet(e.target.value)
                        }
                        className="w-full outline-none rounded-md shadow-md px-4 py-2 "
                        placeholder="Paypal..."
                        type="text"
                        name="paypalaccounet"
                      />
                      <label className="my-2">المبلغ :</label>
                      <input
                        value={amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setamount(e.target.value)
                        }
                        className="w-1/2 max-md:w-3/4 max-sm:w-full outline-none rounded-md shadow-md px-4 py-2 "
                        placeholder="المبلغ..."
                        type="number"
                        name="amount"
                      />
                      <p className="text-[15px] text-red-500 mt-4 self-end">
                        يجب مراعاة ان الحد الأدنى للسحب 20 $
                      </p>
                      <button
                        onClick={handleordermoney}
                        disabled={
                          currentuser?.data?.balacne < 20 ? true : false
                        }
                        className={`${
                          currentuser?.data?.balacne < 20
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }     px-4 py-2 rounded-md bg-secend_color  shadow-md text-white  self-end my-2`}
                      >
                        إرسال الطلب{" "}
                      </button>
                      {done && (
                        <p className="w-full py-1 px-2 bg-green-300 text-white rounded-md">
                          {done}
                        </p>
                      )}
                      {error && (
                        <p className="w-full py-1 px-2 bg-red-300 text-white rounded-md">
                          {error}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <LoadingDashbord />
      )}
    </>
  );
}
