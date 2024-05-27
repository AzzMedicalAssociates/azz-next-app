"use client";
import React from "react";
import ProviderSlider from "./ProviderSlider";
import { useSelector } from "react-redux";

const ProviderComponent = () => {
  const currentScreen = useSelector((state) => state.screen[0]);
  return (
    <>
      {currentScreen === 1 ? (
        <section className="relative mb-40 mt-10  bg-slate-100  rounded  h-[550px] w-full grid grid-cols-2 max-md:grid-cols-1 max-md:gap-10  max-md:h-fit py-5">
          <div className=" col-span-1 flex items-center justify-center ">
            <div className="flex items-start justify-center flex-col gap-5 max-md:h-[250px] max-md:items-center ">
              <div className="text-2xl max-md:text-center font-semibold text-[#1E328F]">
                Top-rated doctors across all specialties
              </div>
              <div className="text-md">
                90% of patients gave these doctors 5 stars
              </div>
              <div className="btn btn-primary shadow-lg btn-outline !text-lg text-nowrap max-md:!text-md ">
                See more highly-recommended doctors
              </div>
            </div>
          </div>
          <div className="col-span-1 !h-full  max-md:pb-10 max-md:-mt-20 ">
            <ProviderSlider />
          </div>
        </section>
      ) : null}
    </>
  );
};

export default ProviderComponent;
