"use client";

import { useEffect, useRef, useState } from "react";

export default function LoginPasswordInput() {
  let [isShow, setIsShow] = useState(false);
  let submitButtonStyleContainer = useRef(null);
  useEffect(() => {
    console.log(isShow);
  }, [isShow]);

  return (
    <>
      <div className="relative w-full max-w-[320px] h-[45px] flex items-center justify-center">
        <input
          type={isShow ? "text" : "password"}
          className="w-full h-full border-[2px] focus:border-content border-content-light/45 transition-all duration-200 rounded-[5px] pl-[15px] outline-none font-roboto tracking-tight"
          name="password"
          placeholder="Strong Password"
        />
        <i
          className={`bi ${
            isShow ? "bi-eye" : "bi-eye-slash"
          } text-lg text-content-light hover:text-content transition-all duration-150 cursor-pointer absolute top-[50%] right-[10px] -translate-[50%]`}
          onClick={() => {
            setIsShow(!isShow);
          }}
          title={`${isShow ? "Hide" : "Show"}`}
        ></i>
      </div>
      <button
        type="submit"
        onMouseMove={(defs) => {
          console.log(
            defs.nativeEvent.layerX / defs.currentTarget.clientWidth,
            defs.nativeEvent.layerY / defs.currentTarget.clientHeight
          );
          let x = defs.nativeEvent.layerX / defs.currentTarget.clientWidth;
          let y = defs.nativeEvent.layerY / defs.currentTarget.clientHeight;
          submitButtonStyleContainer.current.style.top = `${(y * 200) - 100}%`;
          submitButtonStyleContainer.current.style.left = `${x * 100}%`;
        }}
        title="Click To Login"
        className="relative w-full max-w-[320px] h-[45px] outline-none bg-foreground-color text-background-light/75 font-black flex items-center justify-between px-[15px] rounded-[5px] cursor-pointer font-roboto tracking-tight transition-all duration-200 hover:text-background-color overflow-hidden group"
      >
        <span className="z-30 text-md pointer-events-none">
          Login to Your Account
        </span>
        <i className="bi bi-arrow-right text-xl pointer-events-none"></i>
        <span
          ref={submitButtonStyleContainer}
          className="absolute pointer-events-none opacity-[0] w-[90px] h-[90px] -top-[100%] bg-[rgb(93,255,18)] rounded-full blur-2xl group-hover:opacity-[1] transition-all duration-150 ease-linear"
        ></span>
      </button>
    </>
  );
}
