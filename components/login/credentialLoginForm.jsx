"use client";

import { useState } from "react";
import FormSubmitButton from "../global/formSubmitButton";
import LoginPasswordInput from "./loginPasswordInput";
import { signIn } from "next-auth/react";

export default function CredentialLoginForm() {
  let [loading, setLoading] = useState(false);
  async function loginFormHandler(e) {
    e.preventDefault();
    document.cookie = "oauth_state=login; path=/;";
    setLoading(true);
    let formData = new FormData(e.target);
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      isSignup: false,
      callbackUrl: "/auth/callback",
    });
    setLoading(false);
  }
  return (
    <form
      onSubmit={loginFormHandler}
      method="post"
      className="w-full h-fit flex flex-col items-center justify-center gap-3.5"
    >
      <input
        type="email"
        className="w-full max-w-[320px] h-[45px] border-[2px] focus:border-content border-content-light/45 transition-all duration-200 rounded-[5px] pl-[15px] outline-none font-roboto tracking-tight"
        name="email"
        required
        placeholder="Enter Email"
      />
      <LoginPasswordInput
        passwordName="password"
        passwordPlaceholder="Password"
      />
      <FormSubmitButton
        submitButtonText="Login to Your Account"
        loading={loading}
      />
    </form>
  );
}
