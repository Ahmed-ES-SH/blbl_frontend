import React from "react";
import ChartPart from "./ChartPart";
import CireclePart from "./CireclePart";

const FirstCanvesSection = () => {
  return (
    <>
      <div className="flex max-lg:flex-col items-center gap-3 mt-2  px-4 w-full  h-fit m-auto">
        <ChartPart title={"Average Revenue"} state={true} />
        <CireclePart />
      </div>
    </>
  );
};

export default FirstCanvesSection;
