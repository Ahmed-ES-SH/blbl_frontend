"use client";
import Image from "next/image";
import React from "react";

interface StarsProps {
  goldStars: any;
  grayStars: any;
}
export default function Stars({
  goldStars,
  grayStars,
}: StarsProps): React.JSX.Element {
  return (
    <div className="stars flex items-center gap-1 ml-2 ">
      {Array.from({ length: goldStars }, (_, index) => (
        <Image
          src={"/images/star.png"}
          alt="star"
          width={1024}
          height={1280}
          className="w-[16px]"
          key={index}
        />
      ))}
      {Array.from({ length: grayStars }, (_, index) => (
        <Image
          src={"/images/star-black.png"}
          alt="star"
          width={1024}
          height={1280}
          className="w-[16px] opacity-60"
          key={index}
        />
      ))}
    </div>
  );
}
