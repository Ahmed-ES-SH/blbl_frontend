import ProblemPage from "@/app/_components/_Dashbord/ProplemPage";
import React from "react";

export default function page() {
  return (
    <>
      <div className="w-full">
        <ProblemPage
          apiget="/messagevendor"
          apisend="/notification-vendor/add"
          apiupdate="/messagevendor"
        />
      </div>
    </>
  );
}
