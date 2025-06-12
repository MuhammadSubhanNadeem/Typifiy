"use client";
import { useAppContext } from "@/store/App_Context";
import { useState } from "react";

export default function MenuToggle({ styling, lineStyle }) {
  const [open, setOpen] = useState(false);
  let appStore = useAppContext();
  // useEffect(() => {
  //   console.log(appStore?.uiStates?.topLinkShow);
  // }, [appStore?.uiStates?.topLinkShow])
  return (
    <div
      onClick={() => {
        setOpen(!open);
        appStore?.uiStates?.setTopLinkShow((prev) => !prev);
      }}
      className={`flex flex-col justify-center items-center w-10 h-10 cursor-pointer ${styling} rounded-[5px]`}
    >
      <span
        className={`block h-0.5 w-6 transition-all duration-300 ${
          open ? "rotate-45 translate-y-1.5" : ""
        } ${lineStyle}`}
      />
      <span
        className={`block h-0.5 w-6 my-1 transition-all duration-300 ${
          open ? "opacity-0" : ""
        } ${lineStyle}`}
      />
      <span
        className={`block h-0.5 w-6 transition-all duration-300 ${
          open ? "-rotate-45 -translate-y-1.5" : ""
        } ${lineStyle}`}
      />
    </div>
  );
}
