"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Loader from "../Loader";
export default function SignupWithGithub() {
  let [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        setLoading(true);
        document.cookie = "oauth_state=signup; path=/;";
        await signIn("github", {
          callbackUrl: "/auth/callback",
        });
        setLoading(false);
      }}
      className="w-full h-[45px] flex items-center justify-center gap-[15px] border-[1px] border-content-light/30 cursor-pointer rounded-[5px] hover:bg-background-light/40 transition-all duration-150"
    >
      {loading ? (
        <Loader className="w-fit h-fit" />
      ) : (
        <>
          <i className="bi bi-github text-xl"></i>{" "}
          <span className="font-roboto">Signup with Github</span>
        </>
      )}
    </button>
  );
}
