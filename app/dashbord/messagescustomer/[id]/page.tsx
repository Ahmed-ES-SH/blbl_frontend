import ProblemPage from "@/app/_components/_Dashbord/ProplemPage";
import React from "react";

export default function page() {
  return (
    <>
      <div className="w-full">
        <ProblemPage
          apiget="/messagecustomer"
          apisend="/notification-user/add"
          apiupdate="/messagecustomer"
        />
      </div>
    </>
  );
}
