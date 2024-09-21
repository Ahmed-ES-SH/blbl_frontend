import React from "react";
import LeftTopComponent from "./TopVendors";
import MapComponent from "../../Map";

const LastSection = (address: any) => {
  const setlocation = { address: address };
  return <MapComponent setlocation={setlocation} />;
};

export default LastSection;
