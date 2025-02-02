/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import ClientComponent from "./_components/ClientComponent";

export const metadata: Metadata = {
  title: "بلبل للخدمات - الرئيسية",
  description: "موقع بلبل للخدمات الرائجة - الصفحة الرئيسية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ direction: "rtl" }} className="amiri-regular">
        <ClientComponent>{children}</ClientComponent>
      </body>
    </html>
  );
}
