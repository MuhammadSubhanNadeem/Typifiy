"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { toast } from "sonner";
import jwt from "jsonwebtoken"
export default function LoginWithGoogle() {
  let [loading, setLoading] = useState(false);
  let [loginRes, setLoginRes] = useState(null);
  let googleLogin = useGoogleLogin({
    onSuccess: (Credential) => {
      console.log(Credential);
      console.log(jwt.decode(Credential.access_token));
      (async function loginRequest() {
        setLoading(true);
        let res = await fetch("/api/auth/google-login", {
          method: "GET",
          headers: { "Authorization": `Bearer ${Credential.access_token}` },
        });
        let resData = await res.json();
        console.log(resData);
        setLoading(false);
        if (resData?.status === false) {
          toast(resData?.message);
        }
        setLoginRes(resData.user);
        return resData;
      })();
    },
    onError: () => {
      alert("Login Error! Please Try Again Later.");
    },
  });
  // let googleLogin = useGoogleOneTapLogin({
  //   onSuccess: credentialResponse => {
  //     console.log(credentialResponse);
  //   },
  //   onError: () => {
  //     console.log('Login Failed');
  //   },
  // });
  return (
    <>
      {/* {loading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : null} */}
      <button
        type="button"
        onClick={() => googleLogin()}
        className="w-full h-[45px] flex items-center justify-center gap-[15px] border-[1px] border-content-light/30 cursor-pointer rounded-[5px] hover:bg-background-light/40 transition-all duration-150"
      >
        <i className="bi bi-google text-xl"></i>{" "}
        <span className="font-roboto">Login with Google</span>
      </button>
    </>
  );
}
