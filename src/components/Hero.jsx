import React from "react";
import WomanImg from "../img/woman_hero.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <section
        className="h-[800px] bg-hero
  bg-no-repeat bg-cover bg-center py-24"
      >
        <div className="container mx-auto flex justify-around h-full">
          {/* text */}
          <div className="flex flex-col justify-center">
            {/* pretitle */}
            <div className="font-semibold flex items-center uppercase text-white">
              <div className="w-10 h-[2px] bg-red-500 mr-3 "></div>New Trend
            </div>
            {/* title */}
            <h1
              className="text-[70px] leading-[1.1]  mb-4 text-white"
            >
              Clothify <br />
              <span className="font-semibold text-white">NEW ARRIVALS</span>
            </h1>
            <Link
              to={"/Allproducts"}
              className="self-start uppercase font-semibold border-b-2
      border-primary border-white text-white"
            >
              {" "}
              Discover More
            </Link>
          </div>
          {/* image */}
          <div className="hidden lg:block">
            <img src={WomanImg} alt="" />
          </div>
        </div>
      </section>
    </>
  );
};
