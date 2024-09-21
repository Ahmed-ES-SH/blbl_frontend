import {
  DollarSign,
  Layers,
  Layers2Icon,
  LayoutDashboard,
  MessageCircleMore,
  Phone,
  PlusCircleIcon,
  ShoppingCartIcon,
  User2,
} from "lucide-react";
import { allstring } from "../types/dashbordcontenttypes";

export const slidercategorycontent: allstring[] = [
  {
    title: "صيانة تقنية",
    imgsrc: "/categories/cat-9.png",
    to: "#",
  },
  {
    title: "ابحث عن منتجات ",
    imgsrc: "/categories/cat-2.png",
    to: "/searchforproducts",
  },

  {
    title: "برمجة التطبيقات  ",
    imgsrc: "/categories/cat-5.png",
    to: "/descservice",
  },
  {
    title: "تنظيم فكرة المشروع ووضع خطة العمل ",
    imgsrc: "/categories/cat-6.png",
    to: "#",
  },

  {
    title: "تصميم وبرمجة والمواقع ",
    imgsrc: "/categories/cat-8.png",
    to: "#",
  },
  {
    title: "صيانة تقنية",
    imgsrc: "/categories/cat-9.png",
    to: "#",
  },
  {
    title: "خدمة سباكة",
    imgsrc: "/categories/cat-10.png",
    to: "#",
  },
  {
    title: "برمجة التطبيقات  ",
    imgsrc: "/categories/cat-5.png",
    to: "/descservice",
  },
];

export const otherproducts: allstring[] = [
  {
    title: "منتجات إستهلاكية 'عامة'",
    imgsrc: "/categories/cat-1.png",
  },
  {
    title: "سيارات",
    imgsrc: "/categories/cat-3.png",
  },
  {
    title: "ملابس وأحذية",
    imgsrc: "/categories/cat-4.png",
  },
  {
    title: "الأجهزة الإلكترونية والهواتف",
    imgsrc: "/categories/cat-7.png",
  },
];

export const serviceprogram: allstring[] = [
  {
    title: "برمجة التطبيقات  ",
    imgsrc: "/categories/cat-5.png",
  },
  {
    title: "تنظيم فكرة المشروع ووضع خطة العمل ",
    imgsrc: "/categories/cat-6.png",
  },

  {
    title: "تصميم وبرمجة والمواقع ",
    imgsrc: "/categories/cat-8.png",
  },
];

export const langs: allstring[] = [
  {
    text: "العربية",
    imgsrc: "/images/arabic.png",
  },
  {
    text: "English",
    imgsrc: "/images/english.png",
  },
  {
    text: "india",
    imgsrc: "/images/india.png",
  },
  {
    text: "باكستانى",
    imgsrc: "/images/pakistan.png",
  },
  {
    text: "Bangladesh",
    imgsrc: "/images/bangladesh.png",
  },
  {
    text: "Soomaalia",
    imgsrc: "/images/Flag-Somalia.png",
  },
];

export const opationsvendor = [
  {
    text: "الملف  الشخصى",
    icon: <User2 />,
    to: "/vendorprivatepage",
  },
  {
    text: " الإتصال بالدعم ",
    icon: <Phone />,
    to: "/customerservice",
  },
  {
    text: "إدارة الطلبات",
    icon: <Layers2Icon />,
    to: "/orders",
  },
  {
    text: "أضف خدمة جديدة",
    icon: <PlusCircleIcon />,
    to: "/addservice",
  },

  {
    text: " سلة الطلبات ",
    icon: <ShoppingCartIcon />,
    to: "/card",
  },

  {
    text: "الرصيد",
    icon: <DollarSign />,
    to: "/balancepage",
  },
  {
    text: "صندوق الرسائل ",
    icon: <MessageCircleMore />,
    to: "/conversations",
  },
];
export const opationsguest = [
  {
    text: " الإتصال بالدعم ",
    icon: <Phone />,
    to: "/customerservice",
  },
  {
    text: "إدارة الطلبات",
    icon: <Layers2Icon />,
    to: "/orders",
  },

  {
    text: "الرصيد",
    icon: <DollarSign />,
    to: "/balancepage",
  },
];
export const opationsuser = [
  {
    text: "الملف  الشخصى",
    icon: <User2 />,
    to: "/vendorprivatepage",
  },
  {
    text: " الإتصال بالدعم ",
    icon: <Phone />,
    to: "/customerservice",
  },
  {
    text: "إدارة الطلبات",
    icon: <Layers2Icon />,
    to: "/orders",
  },

  {
    text: " سلة الطلبات ",
    icon: <ShoppingCartIcon />,
    to: "/card",
  },

  {
    text: "الرصيد",
    icon: <DollarSign />,
    to: "/balancepage",
  },

  {
    text: "صندوق الرسائل ",
    icon: <MessageCircleMore />,
    to: "/conversations",
  },
];

export const opationsadmin = [
  {
    text: "لوحة التحكم",
    icon: <LayoutDashboard />,
    to: "/dashbord",
  },

  {
    text: "الملف  الشخصى",
    icon: <User2 />,
    to: "",
  },
];

export const icons: string[] = [
  "/images/twitter.png",
  "/images/instagram.png",
  "/images/tik-tok.png",
];

export const codephonecontent: allstring[] = [
  {
    code: "+966",
    image: "/flags/Saudi_Arabia.svg.webp",
  },
  {
    code: "+973",
    image: "/flags/Bahrain.svg.webp",
  },
  {
    code: "+961",
    image: "/flags/Lebanon.svg.webp",
  },
  {
    code: "+974",
    image: "/flags/Qatar.svg.webp",
  },
  {
    code: "+967",
    image: "/flags/Yemen.svg.webp",
  },
  {
    code: "+20",
    image: "/flags/Egypt.svg.webp",
  },
  {
    code: "+212",
    image: "/flags/Morocco.svg.webp",
  },
  {
    code: "+252",
    image: "/flags/Somalia.svg.webp",
  },
  {
    code: "+971",
    image: "/flags/Emirates.svg.webp",
  },
  {
    code: "+966",
    image: "/flags/Oman.svg.webp",
  },
  {
    code: "+249",
    image: "/flags/Sudan.svg.webp",
  },
  {
    code: "+962",
    image: "/flags/Jordan.svg.webp",
  },
  {
    code: "+970",
    image: "/flags/Palestine.svg.webp",
  },
  {
    code: "+216",
    image: "/flags/Tunisia.svg.webp",
  },
];
