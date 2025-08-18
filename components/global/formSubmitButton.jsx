"use client";
import { useRef } from "react";
import Loader from "../Loader";

export default function FormSubmitButton({ loading, submitButtonText }) {
  let submitButtonStyleContainer = useRef(null);

  return (
    <button
      type="submit"
      disabled={loading}
      onMouseMove={(defs) => {
        let x = defs.nativeEvent.layerX / defs.currentTarget.clientWidth;
        let y = defs.nativeEvent.layerY / defs.currentTarget.clientHeight;
        submitButtonStyleContainer.current.style.top = `${y * 200 - 100}%`;
        submitButtonStyleContainer.current.style.left = `${x * 100}%`;
      }}
      title="Click To Login"
      className="relative w-full max-w-[320px] h-[45px] outline-none bg-foreground-color text-background-light/75 font-black flex items-center justify-between px-[15px] rounded-[5px] cursor-pointer font-roboto tracking-tight transition-all duration-200 hover:text-background-color overflow-hidden group disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <span className="z-30 text-md pointer-events-none">
            {submitButtonText}
          </span>
          <i className="bi bi-arrow-right text-xl pointer-events-none"></i>
          <span
            ref={submitButtonStyleContainer}
            className="absolute pointer-events-none opacity-[0] w-[90px] h-[90px] -top-[100%] bg-[rgb(93,255,18)] rounded-full blur-2xl group-hover:opacity-[1] transition-all duration-150 ease-linear"
          ></span>
        </>
      )}
    </button>
  );
}
