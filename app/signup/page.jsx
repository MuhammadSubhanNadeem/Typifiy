import ToasterShow from "@/_helpers/toasterShow.helper";
import Loader from "@/components/Loader";
import LoginDivider from "@/components/login/loginDivider";
import CredentialSignupForm from "@/components/signup/credentialSignupForm";
import SignupWithGithub from "@/components/signup/signupWithGithub";
import SignupWithGoogle from "@/components/signup/signupWithGoogle";
import Link from "next/link";
import { Suspense } from "react";
export default async function page() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <ToasterShow />
      </Suspense>
      <div className="w-full h-[calc(100%-75px)] min-h-[680px] flex items-center justify-center bg-background-color">
        <div className="w-full max-w-[1440px] h-full flex flex-col items-center justify-center selection:bg-foreground-color">
          <h1 className="w-full h-fit text-5xl text-content font-orbit text-center">
            Create New Account
          </h1>
          <p className="w-full h-fit text-content-light text-lg text-center font-light font-orbit mt-[15px]">
            Sign up for a new account, create challenges, invite friends, and
            enjoy new experiences!
          </p>
          <div className="w-full h-fit flex items-center justify-between border p-14 mt-[45px]">
            <div className="w-full h-fit flex">
              <Suspense fallback={<Loader />}>
                <CredentialSignupForm />
              </Suspense>
            </div>

            <LoginDivider />
            <div className="w-full h-full flex items-center justify-center border z-30">
              <div className="border w-full max-w-[320px] h-full flex flex-col gap-5 items-center justify-center">
                <SignupWithGoogle />
                <SignupWithGithub />
              </div>
            </div>
          </div>
          <div className="w-full h-fit flex items-center justify-center mt-[35px]">
            <p className="font-light font-roboto text-content">
              If you already have an account?{" "}
              <Link
                href={"/login"}
                className="font-black font-orbit text-content hover:text-foreground-color transition-all duration-150"
                title="Go To Signup"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* ) : (
        <div className="">
          <LogoutButton />
        </div>
      )} */}
    </>
  );
}
