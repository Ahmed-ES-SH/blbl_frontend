"use client";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import HoverInput from "./HoverInput";
import SearchBox from "./SearchBox";
import { UseVariabels } from "@/app/context/VariabelsContext";

export default function Addorder() {
  const { currentuser } = UseVariabels();
  type StateType = "" | "write" | "guest";
  const [state, setstate] = useState<StateType>(
    currentuser?.data?.is_guest ? "guest" : ""
  );
  return (
    <>
      {currentuser && (
        <div>
          {state == "write" ? (
            <HoverInput setstate={setstate} />
          ) : state == "guest" ? (
            <div>
              <div className="flex-two w-fit m-auto my-2">
                <button className="px-8 py-3 text-center rounded-md bg-secend_color text-white text-xl">
                  اكتب تفاصيل طلبك هنا
                </button>
                <ArrowLeft width={32} className="text-secend_color" />
              </div>
              <p className="w-fit m-auto text-center text-red-400">
                ستحتاج الى حساب فعلى لتتمكن من إضافة طلبك !
              </p>
            </div>
          ) : (
            <div className="flex-two w-fit m-auto my-2">
              <button
                onClick={() => setstate("write")}
                className="px-8 py-3 text-center rounded-md bg-secend_color text-white text-xl"
              >
                اكتب تفاصيل طلبك هنا
              </button>
              <ArrowLeft width={32} className="text-secend_color" />
            </div>
          )}
        </div>
      )}
    </>
  );
}
