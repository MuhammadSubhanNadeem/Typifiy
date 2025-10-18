"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Loader from "../Loader";

export default function SignupWithGoogle() {
  const [loading, setLoading] = useState(false);
  const handleSignup = async () => {
    setLoading(true);
    document.cookie = "oauth_state=signup; path=/;";

    await signIn("google", {
      callbackUrl: "/auth/callback",
    });
    setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleSignup}
      className="w-full h-[45px] flex items-center justify-center gap-[15px] border-[1px] border-content-light/30 cursor-pointer rounded-[5px] hover:bg-background-light/40 transition-all duration-150"
    >
      {loading ? (
        <Loader className="w-fit h-fit" />
      ) : (
        <>
          <i className="bi bi-google text-xl"></i>{" "}
          <span className="font-roboto">Signup with Google</span>
        </>
      )}
    </button>
  );
}
