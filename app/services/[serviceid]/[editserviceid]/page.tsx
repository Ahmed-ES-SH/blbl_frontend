import Navbar from "@/app/_components/_Website/Navbar";
import ServiceEditBody from "@/app/_components/_Website/ServiceEditBody";

import React from "react";

export default function page({ params }: any) {
  const id = params.editserviceid;
  return (
    <>
      <div className="main-bg ">
        <Navbar />
        <ServiceEditBody service_id={id} />
      </div>
    </>
  );
}
