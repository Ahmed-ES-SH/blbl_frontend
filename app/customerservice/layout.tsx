import type { Metadata } from "next";
import ClientLayout from "../_components/_Dashbord/ClientLayout";
import SidebarchatsCustomermobail from "../_components/_mobail/SidebarChatsCustomermobail";
import Sidebarchatsforusers from "../_components/_Website/Sidebarchatsforusers";
import Navbar from "../_components/_Website/Navbar";
import Sidebarchatsforusersmobail from "../_components/_mobail/sidebatchatsforusersmobail";

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
      <Navbar />
      <ClientLayout>
        <div className="parent h-[85vh] overflow-hidden py-2 mt-4 dark:bg-secend_dash">
          <main
            className="flex items-start gap-4 px-4 dark:bg-secend_dash"
            style={{ direction: "rtl" }}
          >
            <div className="w-[96%] h-[90vh] overflow-y-auto hidden-scrollbar mx-auto pb-2  rounded-md dark:bg-main_dash ">
              {children}
            </div>
            <Sidebarchatsforusers />
            <Sidebarchatsforusersmobail />
          </main>
        </div>
      </ClientLayout>
    </div>
  );
}
