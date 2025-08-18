"use client";
import { useState } from "react";

export default function LoginPasswordInput({
  passwordName,
  passwordPlaceholder,
}) {
  let [isShow, setIsShow] = useState(false);
  return (
    <div className="relative w-full max-w-[320px] h-[45px] flex items-center justify-center">
      <input
        type={isShow ? "text" : "password"}
        className="w-full h-full border-[2px] focus:border-content border-content-light/45 transition-all duration-200 rounded-[5px] pl-[15px] outline-none font-roboto tracking-tight placeholder:font-light"
        name={passwordName}
        placeholder={passwordPlaceholder}
        required
      />
      <i
        className={`bi ${
          isShow ? "bi-eye" : "bi-eye-slash"
        } text-lg text-content-light hover:text-content transition-all duration-150 cursor-pointer absolute top-[50%] right-[10px] -translate-[50%] font-extralight`}
        onClick={() => {
          setIsShow(!isShow);
        }}
        title={`${isShow ? "Hide" : "Show"}`}
      ></i>
    </div>
  );
}
