"use client";

import { useAppContext } from "@/store/App_Context";
import Link from "next/link";

export default function TopLinks() {
  let appStore = useAppContext();

//   useEffect(() => {
//     console.log(appStore?.uiStates?.topLinkShow);
//   }, [appStore?.uiStates?.topLinkShow])
  
  return (
    <>
      {appStore?.uiStates?.topLinkShow ? (
        <div className="w-full h-full text-content flex items-center justify-evenly max-sm:flex-col max-sm:h-fit max-sm:absolute max-sm:top-[68px] max-sm:bg-background-color  max-sm:border-[1px] max-sm:border-background-light">
          <Link
            href={"/"}
            className="font-orbit text-content-light hover:text-content transition-all duration-150 text-[12px] md:text-[14px] text-between-lg-and-1980 2xl:text-[18px]  flex items-center justify-center gap-1.5 max-sm:h-[45px] max-sm:w-full max-sm:hover:bg-background-light"
          >
            <i className="bi bi-keyboard text-lg md:text-xl lg:text-2xl 2xl:text-3xl"></i>
            Typing
          </Link>
          <Link
            href={"/multi-player"}
            className="font-orbit text-content-light hover:text-content transition-all duration-150 text-[12px] md:text-[14px] text-between-lg-and-1980 2xl:text-[18px] flex items-center justify-center gap-1.5 max-sm:h-[45px] max-sm:w-full max-sm:hover:bg-background-light"
          >
            <i className="bi bi-controller text-lg md:text-xl lg:text-2xl 2xl:text-3xl"></i>
            MultiPlayer
          </Link>
          <Link
            href={"#"}
            className="font-orbit text-content-light hover:text-content transition-all duration-150 text-[12px] md:text-[14px] text-between-lg-and-1980 2xl:text-[18px] flex items-center justify-center gap-1.5 max-sm:h-[45px] max-sm:w-full max-sm:hover:bg-background-light"
          >
            Play Game
          </Link>
        </div>
      ) : null}
    </>
  );
}
