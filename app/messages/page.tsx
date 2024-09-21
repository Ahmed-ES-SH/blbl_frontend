import React from "react";
import Navbar from "../_components/_Website/Navbar";
import {
  Camera,
  CheckCircle,
  ChevronRight,
  MapPinIcon,
  Mic,
  Phone,
  SendHorizonal,
  Truck,
  Video,
} from "lucide-react";
import Image from "next/image";
export default function page() {
  return (
    <>
      <div className="main-bg w-full h-screen">
        <Navbar />
        <div className="Conversation-section rounded-t-md mt-8 w-[80%] max-sm:w-[95%] m-auto bg-white ">
          <div className="firstpart bg-disable_color flex-between px-2 py-1 rounded-t-md">
            <div className="info flex-two">
              <ChevronRight />
              <Image
                src={"/images/avatar.png"}
                alt="avatar"
                width={1024}
                height={1280}
                className="w-[40px] h-[40px] rounded-full border-[4px] border-secend_color"
              />
              <div className="max-sm:text-[13px]">
                <p className="text-[18px] max-sm:text-[13px]">
                  أستاذ / محمد علاء
                </p>
                <p className="text-[12px] max-sm:text-[10px] text-secend_text">
                  متاح الأن
                </p>
              </div>
            </div>
            <div className="icons flex-two flex-row-reverse text-white text-[12px]">
              <Video />
              <Phone />
              <MapPinIcon />
            </div>
          </div>
          <div className="body px-6 py-2 mt-3 h-[65vh] overflow-y-auto hidden-scrollbar">
            <div className="flex flex-col items-start">
              <p className="text-white w-fit ml-auto p-1 py-2 bg-secend_color rounded-md ">
                بالتاكيد سارسل لك التفاصيل الان{" "}
              </p>
              <p className="flex items-center rounded-md mt-1 text-[12px] bg-secend_text/50">
                14:40 <CheckCircle width={12} />
              </p>
            </div>
            <div className="flex flex-col items-end w-fit mr-auto">
              <p className=" w-fit  p-1 py-2 bg-main_color border shadow-md rounded-md ">
                بالتاكيد ماذا تريد{" "}
              </p>
              <p className="flex items-center rounded-md mt-1 text-[12px] bg-secend_text/50">
                14:40 <CheckCircle width={12} />
              </p>
            </div>
            <div className="flex items-center gap-1 mt-5 w-[80%] m-auto">
              <span className="w-full h-[1px] bg-secend_color rounded-full"></span>
              <p>اليوم</p>
              <span className="w-full h-[1px] bg-secend_color rounded-full"></span>
            </div>
            <div className="flex flex-col items-end w-fit mt-2 mr-auto">
              <p className=" w-[230px]  p-1 py-2 bg-main_color border shadow-md rounded-md ">
                بالتاكيد يمكنك ان ترسل لى كل التفاصيل والصور التى يمكننى مساعدتك
                بها{" "}
              </p>
              <p className="flex items-center rounded-md mt-1 text-[12px] bg-secend_text/50">
                14:40 <CheckCircle width={12} />
              </p>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-white w-fit ml-auto p-1 py-2 bg-secend_color rounded-md ">
                بالتاكيد سارسل لك التفاصيل الان{" "}
              </p>
              <p className="flex items-center rounded-md mt-1 text-[12px] bg-secend_text/50">
                14:40 <CheckCircle width={12} />
              </p>
            </div>
            <div className="flex flex-col items-start my-2">
              <p className="text-white w-fit ml-auto p-1 py-2 bg-secend_color rounded-md ">
                بالتاكيد سارسل لك التفاصيل الان{" "}
              </p>
              <p className="flex items-center rounded-md mt-1 text-[12px] bg-secend_text/50">
                14:40 <CheckCircle width={12} />
              </p>
            </div>
          </div>
          <div className="input-text bg-[#ddd]/80  w-full relative flex-between">
            <input
              type="text"
              placeholder="اكتب هنا "
              className="w-full bg-[#ddd]  outline-none shadow-md px-4 pr-9 py-2 "
            />
            <div className="icons-2 absolute top-2 left-3 flex-two flex-row-reverse">
              <Camera className=" cursor-pointer text-gray-400" />
              <Mic className=" cursor-pointer text-gray-400" />
              <Truck className=" cursor-pointer text-gray-400" />
            </div>
            <SendHorizonal className=" cursor-pointer absolute top-2 right-2 text-sky-400" />
          </div>
        </div>
      </div>
    </>
  );
}
