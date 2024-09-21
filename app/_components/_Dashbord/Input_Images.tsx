"use client";
import React, { useRef } from "react";
import Image from "next/image";

interface typeimage {
  setimages: React.Dispatch<React.SetStateAction<File[]>>;
  images: File[];
}

const Input_Images: React.FC<typeimage> = ({ setimages, images }) => {
  const openinput: any = useRef(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files); // تحويل FileList إلى مصفوفة
      setimages(filesArray); // تحديث حالة images
    }
  };

  return (
    <>
      <div className="overflow-hidden">
        <label
          htmlFor="images"
          className="block text-sm font-medium text-secend_text max-lg:text-white max-lg:font-light font-serif text-md py-2"
        >
          Images:
        </label>
        <input
          ref={openinput}
          id="images"
          className=""
          name="images"
          type="file"
          onChange={handleImageChange}
          hidden
          multiple
        />
        {images.length >= 1 ? (
          <div className="flex items-center gap-2 ">
            {images.map((img, index) => (
              <Image
                key={index}
                className="w-[250px] h-1/2 "
                src={URL.createObjectURL(img)}
                alt="undraow"
                width={1024}
                height={1280}
              />
            ))}
          </div>
        ) : (
          <div
            onClick={() => openinput.current.click()}
            className="w-full  h-[35vh] px-4 py-2 flex items-center justify-center border-2 border-sky-400 border-dashed "
          >
            <Image
              className="  w-[200px]  "
              src={"/dashbord/add.png"}
              alt="undraow"
              width={1024}
              height={1280}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Input_Images;
