"use client";
import React, { useRef } from "react";
import Image from "next/image";

interface typeimage {
  setimage: React.Dispatch<React.SetStateAction<File>>;
  image: any;
}

export default function Input_Image_bank({ setimage, image }: typeimage) {
  const openinput: any = useRef(null);

  const handleImageChange = (e: any) => {
    setimage(e.target.files[0]);
  };

  return (
    <>
      <div className="overflow-hidden py-2">
        <label
          htmlFor="images"
          className="block text-sm font-medium dark:text-white text-[22px]   max-lg:font-light font-serif text-md py-2"
        >
          صورة المعاملات البنكية
        </label>
        <input
          ref={openinput}
          id="images"
          className=""
          name="image_bank"
          type="file"
          onChange={handleImageChange}
          hidden
        />
        {image != "" ? (
          <Image
            className="h-full w-[300px] rounded-md   "
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
              className="h-full  w-[300px]  "
              src={"/dashbord/imagebank.png"}
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
