"use client";
import React from "react";
import { signOut } from "next-auth/react";
export default function LogoutButton() {
  return (
    <button
    className="w-full max-w-[220px] h-[45px] flex items-center justify-center gap-[15px] border-[1px] border-content-light/30 cursor-pointer rounded-[5px] hover:bg-background-light/40 transition-all duration-150"
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
    >
      Signout Your Account
    </button>
  );
}
