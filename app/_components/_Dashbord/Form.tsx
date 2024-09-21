"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookie from "cookie-universal";
import { instance } from "@/app/Api/axios";
import Input_Image from "./Input_Image";
import Input_Images from "./Input_Images";
import Input_Image_bank from "./Input_image_bank";
import LoadingDashbord from "../LoadingDashbord";
import Image from "next/image";
import MapComponent from "../Map";
import { MapPin } from "lucide-react";
interface formtype {
  inputs: { [key: string]: string }[];
  api: string;
  direct: string;

  image_or_images: boolean;
}

interface Typeform {
  [key: string]: any;
}

export default function Form({
  inputs,
  api,
  direct,
  image_or_images,
}: Typeform) {
  const [form, setform] = useState<Typeform>({});
  const [errors, seterrors] = useState<any>({});
  const [location, setlocation] = useState<any>({});
  const [refresh, setrefresh] = useState(false);
  const [openmap, setopenmap] = useState(false);
  const [loading, setloading] = useState(false);
  const [images, setimages] = useState<File[]>([]);
  const [image, setimage] = useState<any>("");
  const [imagebank, setimagebank] = useState<any>("");
  const router = useRouter();
  const pathname = usePathname();
  const cookie = Cookie();

  useEffect(() => {
    const initialFormState = inputs.reduce(
      (acc: { [key: string]: string }, input: { [key: string]: string }) => {
        acc[input.name] = "";
        return acc;
      },
      {} as { [key: string]: string }
    );

    setform(initialFormState);
  }, [inputs]);

  const handelchange = (e: any) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      if (location) {
        formData.append("location", JSON.stringify(location));
      }
      if (form.role) {
        formData.append("role", form.role);
      }
      if (form.gender) {
        formData.append("gender", form.gender);
      }

      if (!image_or_images) {
        for (let i = 0; i < images.length; i++) {
          formData.append("images[]", images[i]);
        }
      }

      if (image_or_images) {
        formData.append("image", image);
        if (imagebank) {
          formData.append("image_bank", imagebank);
        }
      }

      const res = await instance.post(api, formData);
      console.log(res);

      router.push(direct);
      setrefresh((prev) => !prev);
    } catch (error: any) {
      setloading(false);
      console.error("Error:", error);
      seterrors(error.response.data.errors);
    }
  };

  const setLocation = (address: any) => {
    setlocation(address);
  };

  useEffect(() => {
    if (location) {
      setform({ ...form, location: location });
    }
  }, [location]);

  console.log(form);

  return (
    <>
      {loading ? (
        <LoadingDashbord />
      ) : (
        <div className="flex items-start justify-between">
          <form
            onSubmit={handleSubmit}
            className={`relative hidden-scrollbar w-full ${
              pathname == "/signin" ? "h-fit" : "h-[83vh]"
            } overflow-y-auto bg-secend_dash mt-8 z-[3] bg-transparent`}
          >
            {inputs &&
              inputs.map((input: { [key: string]: string }, index: number) => (
                <div key={index}>
                  <label
                    htmlFor={input.title}
                    className="block text-sm font-medium dark:text-white text-[22px]   font-serif text-md py-2"
                  >
                    {input.title}
                  </label>
                  <input
                    id={input.title}
                    className="p-3 duration-150 outline-none focus:border-sky-400 border border-secend_text dark:border-gray-300 my-2 w-full rounded-md text-sm text-black dark:text-gray-700 shadow-sm"
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handelchange}
                    max={input.name == "stars" ? 5 : 999999999}
                    min={0}
                  />
                  <div>
                    {errors &&
                      errors[input.name] &&
                      Array.isArray(errors[input.name]) &&
                      errors[input.name].map((error: string, index: number) => (
                        <p
                          key={index}
                          className="px-2 py-2 w-full rounded-md bg-red-500 text-white"
                        >
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              ))}
            {pathname !== "/signin" ? (
              image_or_images ? (
                <>
                  <Input_Image image={image} setimage={setimage} />
                  {direct == "/dashbord/fixers" && (
                    <Input_Image_bank
                      image={imagebank}
                      setimage={setimagebank}
                    />
                  )}
                </>
              ) : (
                <Input_Images images={images} setimages={setimages} />
              )
            ) : (
              ""
            )}
            {direct == "/dashbord/fixers" && (
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium dark:text-white text-[22px] max-lg:font-light font-serif text-md py-2"
                >
                  الجنس
                </label>
                <select
                  onChange={handelchange}
                  id="gender"
                  name="gender"
                  className="block w-full my-2 text-secend_text rounded-md shadow-md outline-none py-2"
                >
                  <option>حدد إختيار</option>
                  <option value="female">ذكر</option>
                  <option value="male">أنثى</option>
                </select>
              </div>
            )}
            {(api === "/registerfromdashbord" ||
              api === "/storefromdashbord") && (
              <div className="w">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium dark:text-white text-[22px] max-lg:font-light font-serif text-md py-2"
                >
                  الموقع
                </label>
                <input
                  onChange={handelchange}
                  readOnly
                  value={location.address}
                  name="location"
                  type="text"
                  className={`h-[50px] text-[13px] rounded-md w-full  border-none  bg-gray-300   shadow-md  outline-none px-4 placeholder-shown:px-4`}
                />
                <div
                  onClick={() => setopenmap(!openmap)}
                  style={{ direction: "ltr" }}
                  className="flex-two text-secend_color cursor-pointer mt-2"
                >
                  <p>تحديد الموقع</p>
                  <MapPin width={14} />
                </div>
              </div>
            )}
            {api == "/registerfromdashbord" && (
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium dark:text-white text-[22px] max-lg:font-light font-serif text-md py-2"
                >
                  نوع الحساب :
                </label>
                <select
                  className="w-full rounded-md bg-secend_color dark:text-white dark:bg-main_dash shadow-md p-2 dark:border dark:border-secend_text outline-none"
                  name="role"
                  onChange={handelchange}
                  value={form.role || ""} // اجعل القيمة الافتراضية فارغة
                >
                  <option value="" disabled>
                    حدد نوع الحساب
                  </option>
                  <option value="user">مستخدم</option>
                  <option value="Admin">أدمن</option>
                  <option value="customerservice">خدمة العملاء</option>
                  <option value="serviceinspector">مراجع خدمات</option>
                </select>
              </div>
            )}
            {(api === "/registerfromdashbord" ||
              api === "/storefromdashbord") &&
              openmap && (
                <div className="w-full relative">
                  <div className="map  w-[90%] h-[60vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]">
                    <MapComponent setLocation={setLocation} />
                    <div className="w-fit mr-auto">
                      <button
                        onClick={() => setopenmap(false)}
                        className="px-6 py-2 text-white rounded-md text-center shadow-md bg-secend_color"
                      >
                        تم
                      </button>
                    </div>
                  </div>
                </div>
              )}
            <input
              className="p-4 px-12 my-4 mx-2 hover:scale-105 hover:bg-transparent border border-transparent cursor-pointer duration-300 hover:border-sky-500 rounded-md block bg-sky-400 dark:text-white w-fit lg:ml-auto"
              type="submit"
              value={`${pathname == "/signin" ? "Sign" : "إضافة"}`}
            />
          </form>
          <Image
            src={"/logonobg.png"}
            alt={"logo"}
            width={1024}
            height={1280}
            priority={true}
            className="w-full h-full max-lg:hidden"
          />
        </div>
      )}
    </>
  );
}
