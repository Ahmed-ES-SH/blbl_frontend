"use client";
import React, { useEffect, useState } from "react";
import Loading3S from "../Loading3S";
import Navbar from "./Navbar";
import Slider from "./Slider";
import Categoryslider from "./Categoryslider";
import MinyOrderSection from "./MinyOrderSection";
import Addorder from "./Addorder";
import RandomServices from "./RandomServices";
import Cookie from "cookie-universal";

export default function MainPage() {
  const [loadingState, setloadingState] = useState(true);
  const cookie = Cookie();

  useEffect(() => {
    const intreval = setInterval(() => {
      setloadingState(false);
    }, 3000);

    return () => clearInterval(intreval);
  }, []);

  return (
    <>
      {loadingState ? (
        <Loading3S />
      ) : (
        <div className="bg-gradient-to-b from-main_color to-white">
          <Navbar />
          <Slider />
          <Categoryslider />
          <MinyOrderSection />
          <Addorder />
          <RandomServices />
        </div>
      )}
    </>
  );
}
