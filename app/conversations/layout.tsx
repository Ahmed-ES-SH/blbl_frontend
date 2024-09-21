import type { Metadata } from "next";
import ClientLayout from "../_components/_Dashbord/ClientLayout";

import Sidebarchats from "../_components/_Website/Sidebarchats";
import Navbar from "../_components/_Website/Navbar";
import Sidebarchatsmobail from "../_components/_mobail/Siderbarchatmobail";

export const metadata: Metadata = {
  title: "بلبل للخدمات - صفحة المحادثات ",
  description: " بلبل للخدمات - صفحة المحادثات ",
};

export default function ConversationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="main-bg">
      <Navbar />
      <ClientLayout>
        <div className="parent h-[85vh] overflow-hidden py-2 mt-4 ">
          <main
            className="flex items-start gap-4 px-4"
            style={{ direction: "rtl" }}
          >
            <div className="w-full h-[90vh] overflow-y-auto hidden-scrollbar mx-auto py-2  rounded-md bg-transparent ">
              {children}
            </div>
            <Sidebarchats />
            <Sidebarchatsmobail />
          </main>
        </div>
      </ClientLayout>
    </div>
  );
}
