"use client";
import React, { useRef } from "react";
import Image from "next/image";

interface typeimage {
  setimage: any;
  image: any;
}

export default function Input_Image({ setimage, image }: typeimage) {
  const openinput: any = useRef(null);

  const handleImageChange = (e: any) => {
    setimage(e.target.files[0]);
  };

  return (
    <>
      <div className="overflow-hidden">
        <label
          htmlFor="images"
          className="block text-sm font-medium  dark:text-white text-[22px] max-lg:font-light font-serif text-md py-2"
        >
          صورة
        </label>
        <input
          ref={openinput}
          id="images"
          className=""
          name="image"
          type="file"
          onChange={handleImageChange}
          hidden
        />
        {image != "" ? (
          <Image
            className="h-full w-[300px] shadow-md rounded-md   "
            src={URL.createObjectURL(image)}
            alt="image"
            width={1024}
            height={1280}
          />
        ) : (
          <div
            onClick={() => openinput.current.click()}
            className="w-full  h-[35vh] px-4 py-2 flex items-center justify-center border-2 border-sky-400 border-dashed "
          >
            <Image
              className="h-full  w-[150px]  "
              src={"/dashbord/addimage.png"}
              alt="undraow"
              width={1024}
              height={1280}
            />
          </div>
        )}
      </div>
    </>
  );
}
