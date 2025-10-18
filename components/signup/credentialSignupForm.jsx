"use client";

import { signIn } from "next-auth/react";
import LoginPasswordInput from "../login/loginPasswordInput";
import { useState } from "react";
import FormSubmitButton from "../global/formSubmitButton";

export default function CredentialSignupForm() {
  let [loading, setLoading] = useState(false);
  async function signupFormHandler(e) {
    e.preventDefault();
    document.cookie = "oauth_state=signup; path=/;";
    setLoading(true);
    let formData = new FormData(e.target);
    await signIn("credentials", {
      firstName: formData.get("first_name"),
      lastName: formData.get("last_name"),
      email: formData.get("email"),
      password: formData.get("password"),
      isSignup: true,
      callbackUrl: "/auth/callback",
    },);
    setLoading(false);
  }

  return (
    <form
      onSubmit={signupFormHandler}
      method="post"
      className="w-full h-fit flex flex-col items-center justify-center gap-3.5"
    >
      <input
        type="text"
        className="w-full max-w-[320px] h-[45px] border-[2px] focus:border-content border-content-light/45 transition-all duration-200 rounded-[5px] pl-[15px] outline-none font-roboto tracking-tight placeholder:font-light"
        name="first_name"
        required
        placeholder="First Name"
      />
      <input
        type="text"
        className="w-full max-w-[320px] h-[45px] border-[2px] focus:border-content border-content-light/45 transition-all duration-200 rounded-[5px] pl-[15px] outline-none font-roboto tracking-tight placeholder:font-light"
        name="last_name"
        required
        placeholder="Last Name"
      />
      <input
        type="email"
        className="w-full max-w-[320px] h-[45px] border-[2px] focus:border-content border-content-light/45 transition-all duration-200 rounded-[5px] pl-[15px] outline-none font-roboto tracking-tight placeholder:font-light"
        name="email"
        required
        placeholder="example@gmail.com"
      />
      <LoginPasswordInput
        passwordName="password"
        passwordPlaceholder="Strong Password"
      />
      <FormSubmitButton
        submitButtonText="Signup to Your Account"
        loading={loading}
      />
    </form>
  );
}
