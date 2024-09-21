import { Metadata } from "next";
import MainPage from "./_components/_Website/MainPage";

export const metadata: Metadata = {
  title: "بلبل للخدمات - الرئيسية",
  description:
    "متجر بلبل لبيع الخدمات المصغرة الرائجة  - صيانة  - تصليح - خدمات  - برمجة - تطبيقات - تطبيقات هواتف   ",
};

export default function Home() {
  return <MainPage />;
}
