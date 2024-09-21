import type { Metadata } from "next";
import ClientLayout from "../_components/_Dashbord/ClientLayout";
import Topbar from "../_components/_Dashbord/Topbar";
import Sidebar from "../_components/_Dashbord/Sidebar";
import RequiredAuth from "../_components/_Dashbord/RequriedAuth";
import Sidebardashbord from "../_components/_mobail/Sidebardashbord";

export const metadata: Metadata = {
  title: "لوحة التحكم ",
  description: "لوحة التحكم - بلبل للخدمات ",
};

export default function DashbordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClientLayout>
        <RequiredAuth>
          <div className="parent h-screen overflow-hidden">
            <Topbar />
            <main
              className="flex items-start gap-4 "
              style={{ direction: "rtl" }}
            >
              <Sidebar />
              <Sidebardashbord />
              <div className="w-[98%] mx-auto px-2 rounded-md bg-gradient-to-t from-main_color to-white  dark:bg-gradient-to-t dark:from-secend_dash dark:to-main_dash">
                {children}
              </div>
            </main>
          </div>
        </RequiredAuth>
      </ClientLayout>
    </>
  );
}
