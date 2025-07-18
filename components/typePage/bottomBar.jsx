"use client";

import { appContext } from "@/store/App_Context";
import { useContext } from "react";

export default function BottomBar() {
  let appStore = useContext(appContext);
  return (
    <div className="w-full h-fit mt-8 flex items-center justify-evenly flex-wrap">
      <button className="text-content-light font-roboto flex items-center justify-center gap-[5px] cursor-pointer hover:text-content transition-all duration-150">
        <i className="bi bi-arrow-clockwise text-lg"></i>reload
      </button>
      <button className="text-content-light font-roboto flex items-center justify-center gap-[5px] cursor-pointer hover:text-content transition-all duration-150">
        <i className="bi bi-pause text-2xl"></i>pause
      </button>
    </div>
  );
}
