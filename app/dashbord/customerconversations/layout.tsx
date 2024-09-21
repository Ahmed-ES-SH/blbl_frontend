import ClientLayout from "@/app/_components/_Dashbord/ClientLayout";
import SidebarchatsCustomermobail from "@/app/_components/_mobail/SidebarChatsCustomermobail";
import Sidebarchatsmobail from "@/app/_components/_mobail/Siderbarchatmobail";
import Sidebarchats from "@/app/_components/_Website/Sidebarchats";
import SidebarchatsCustomers from "@/app/_components/_Website/SidebarChatsCustemors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحة محادثات خدمة العملاء ",
  description: "صفحة المحادثات  - بلبل للخدمات",
};

export default function ConversationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="main-bg dark:bg-secend_dash">
      <ClientLayout>
        <div className="parent h-[85vh] overflow-hidden py-2 mt-4 dark:bg-secend_dash">
          <main
            className="flex items-start gap-4 px-4 dark:bg-secend_dash"
            style={{ direction: "rtl" }}
          >
            <div className="w-[96%] h-[90vh] overflow-y-auto hidden-scrollbar mx-auto pb-2  rounded-md dark:bg-main_dash ">
              {children}
            </div>
            <SidebarchatsCustomers />
            <SidebarchatsCustomermobail />
          </main>
        </div>
      </ClientLayout>
    </div>
  );
}
