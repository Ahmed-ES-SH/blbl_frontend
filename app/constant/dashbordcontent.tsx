import { Home } from "lucide-react";
import { dropprofiletype, navlinkstype } from "../types/dashbordcontenttypes";

export const navlinks: navlinkstype[] = [
  {
    title: "لوحة التحكم ",
    imgsrc: "/dashbord/dashboard.png",
    to: "/dashbord",
  },
  {
    title: "المستخدمين",
    imgsrc: "/dashbord/group.png",
    to: "/dashbord/users",
  },
  {
    title: " أضف مستخدم جديد",
    imgsrc: "/dashbord/add-group.png",
    to: "/dashbord/adduser",
  },
  {
    title: "أقسام الخدمات",
    imgsrc: "/dashbord/layers.png",
    to: "/dashbord/servicestypes",
  },
  {
    title: "أضف قسم جديد",
    imgsrc: "/dashbord/layer.png",
    to: "/dashbord/addservicetype",
  },
  {
    title: "الخدمات",
    imgsrc: "/dashbord/customer-service.png",
    to: "/dashbord/services",
  },

  {
    title: "الفنيين",
    imgsrc: "/dashbord/vendors.png",
    to: "/dashbord/fixers",
  },
  {
    title: "أضف فنى جديد ",
    imgsrc: "/dashbord/vendor.png",
    to: "/dashbord/addfixer",
  },
  {
    title: "إرسال الإشعارات",
    imgsrc: "/dashbord/bell.png",
    to: "/dashbord/notifications",
  },
  {
    title: "قسم العروض",
    imgsrc: "/dashbord/offer.png",
    to: "/dashbord/offers",
  },
  {
    title: "أضف عرض جديد",
    imgsrc: "/dashbord/offerplus.png",
    to: "/dashbord/offerplus",
  },
  {
    title: "قسم خدماتنا",
    imgsrc: "/dashbord/services-slider.png",
    to: "/dashbord/servicesslider",
  },
  {
    title: "أضف خدمة جديدة",
    imgsrc: "/dashbord/add-service-slider.png",
    to: "/dashbord/addserviceslider",
  },
  {
    title: "طلبات سحب رصيد",
    imgsrc: "/dashbord/order-money.png",
    to: "/dashbord/ordersmoney",
  },
  {
    title: "قسم خدمة العملاء",
    imgsrc: "/dashbord/question-mark.png",
    to: "/dashbord/servicecustomers",
  },
  {
    title: "محادثات خدمة العملاء",
    imgsrc: "/dashbord/live-chat.png",
    to: "/dashbord/customerconversations",
  },
];

export const navlinkscustemorservices: navlinkstype[] = [
  {
    title: "قسم خدمة العملاء",
    imgsrc: "/dashbord/question-mark.png",
    to: "/dashbord/servicecustomers",
  },
  {
    title: "محادثات خدمة العملاء",
    imgsrc: "/dashbord/live-chat.png",
    to: "/dashbord/customerconversations",
  },
];
export const inspactorservices: navlinkstype[] = [
  {
    title: "الخدمات",
    imgsrc: "/dashbord/customer-service.png",
    to: "/dashbord/services",
  },
];

export const dropprofile: dropprofiletype[] = [
  {
    title: "Home",
    icon: <Home width={14} />,
    to: "/",
  },
];
