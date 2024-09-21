import React from "react";

export default function LoadingDashbord() {
  return (
    <>
      <div className="w-full h-[65vh] relative">
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px]   ">
          <span className="loader  "></span>
        </div>
      </div>
    </>
  );
}
