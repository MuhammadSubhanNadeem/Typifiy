"use client";
import { useEffect, useState } from "react";
export default function LoginDivider() {
  let [rotateAngle, setRotateAngle] = useState(0);
  function windowMouseMoveListener(defs) {
    let xPos = defs.clientX / window.innerWidth;
    setRotateAngle(xPos * 60);
  }
  useEffect(() => {
    window.addEventListener("mousemove", windowMouseMoveListener);
    return () =>
      window.removeEventListener("mousemove", windowMouseMoveListener);
  }, []);
  return (
    <div
      className="w-[12px] h-[75px] bg-foreground-color rounded-[2px] -rotate-[30deg] transition-all duration-300 ease-linear"
      style={{transform: `rotate(${rotateAngle}deg)`}}
    >
    </div>
  );
}
