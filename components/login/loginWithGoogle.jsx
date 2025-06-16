"use client";

import { useGoogleLogin } from "@react-oauth/google";

export default function LoginWithGoogle() {
  let googleLogin = useGoogleLogin({
    onSuccess: (Credential) => {console.log(Credential)},
    onError: () => {alert("Login Error! Please Try Again Later.")}
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
