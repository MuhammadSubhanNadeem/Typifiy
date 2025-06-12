// import Client_Component from "@/store/Client_Component";
import CheckAuth from "./checkAuth";
import Link from "next/link";
import MenuToggle from "../ui/MenuToggle";
import TopLinks from "./topLinks";
import Client_Component from "../Client_Component";
// import { motion } from "motion/react"
// import "../../app/globals.css";
export default function Nav() {
  return (
    <Client_Component>
      <nav className="w-full h-[70px] flex items-center justify-center border">
        <div className="relative w-full max-w-[1440px] h-full flex items-center justify-between border px-[35px] gap-5">
          <div className="font-bold font-orbit text-2xl text-foreground">
            Logo
          </div>
          <div className="min-[425px]:relative w-full h-full border text-content flex items-center justify-center">
            <div className="w-full h-full hidden max-sm:flex max-sm:items-center max-sm:justify-end">
              {/* <i class="bi bi-list text-2xl text-content-light"></i> */}
              {/* <Client_Component> */}
              <MenuToggle
                styling="hover:bg-background-light mr-[15px] transition-all duration-150 group"
                lineStyle="bg-content-light group-hover:bg-content transition-all duration-150"
              />
              {/* </Client_Component> */}
            </div>
            <div className="w-full h-full text-content flex items-center justify-evenly max-sm:hidden">
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
            {/* <Client_Component> */}
            <TopLinks />
            {/* </Client_Component> */}
          </div>
          <div className="w-[130px] text-content-light font-orbit flex items-center justify-center gap-1.5  cursor-pointer hover:text-content transition-all duration-150">
            {/* <Client_Component> */}
            <CheckAuth />
            {/* </Client_Component> */}
          </div>
        </div>
      </nav>
    </Client_Component>
  );
}
