"use client";
import React from "react";
import { useSelector } from "react-redux";

import Home from "@/application/Home";
import Screen2 from "@/application/Screen2";
import Screen3 from "@/application/Screen3";
import Screen4 from "@/application/Screen4";
import Screen5 from "@/application/Screen5";
import Screen6 from "@/application/Screen6";
const Main = () => {
  const currentScreen = useSelector((state) => state.screen[0]);

  return (
    <div className="flex items-center justify-center">
      {currentScreen === 1 && (
        <div>
          <Home />
        </div>
      )}
      {currentScreen === 2 && (
        <div className="flex items-center justify-center max-w-[1200px]">
          <Screen2 />
        </div>
      )}
      {currentScreen === 3 && (
        <div className="flex items-center justify-center max-w-[1200px]">
          <Screen3 />
        </div>
      )}
      {currentScreen === 4 && (
        <div className="flex items-center justify-center max-w-[1200px]">
          <Screen4 />
        </div>
      )}
      {currentScreen === 5 && (
        <div className="flex items-center justify-center max-w-[1200px]">
          <Screen5 />
        </div>
      )}
      {currentScreen === 6 && (
        <div className="flex items-center justify-center max-w-[1200px]">
          <Screen6 />
        </div>
      )}
    </div>
  );
};

export default Main;
