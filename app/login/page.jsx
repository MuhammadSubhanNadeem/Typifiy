import ToasterShow from "@/_helpers/toasterShow.helper";
import CredentialLoginForm from "@/components/login/credentialLoginForm";
import LoginDivider from "@/components/login/loginDivider";
import LoginWithGithub from "@/components/login/loginWithGithub";
import LoginWithGoogle from "@/components/login/loginWithGoogle";
import { Suspense } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
// import {GoogleLogin} from "@react-oauth/google"
export default function page() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <ToasterShow />
      </Suspense>
      <div className="w-full h-[calc(100%-75px)] min-h-[680px] flex items-center justify-center bg-background-color">
        <div className="w-full max-w-[1440px] h-full flex flex-col items-center justify-center selection:bg-foreground-color">
          <h1 className="w-full h-fit text-5xl text-content font-orbit text-center">
            Login to Your Account
          </h1>
          <p className="w-full h-fit text-content-light text-lg text-center font-light font-orbit mt-[15px]">
            Sign in to your account, invite friends to exciting challenges,
            compete, <br /> have fun, and see who comes out on top!
          </p>
          <div className="w-full h-fit flex items-center justify-between border p-14 mt-[45px]">
            <div className="w-full h-fit flex">
              <Suspense fallback={<Loader />}>
                <CredentialLoginForm />
              </Suspense>
            </div>
            <LoginDivider />
            <div className="w-full h-full flex items-center justify-center border z-30">
              <div className="border w-full max-w-[320px] h-full flex flex-col gap-5 items-center justify-center">
                <LoginWithGoogle />
                <LoginWithGithub />
              </div>
            </div>
          </div>
          <div className="w-full h-fit flex items-center justify-center mt-[35px]">
            <p className="font-light font-roboto text-content">
              If you don't have any Account?{" "}
              <Link
                href={"/signup"}
                className="font-black font-orbit text-content hover:text-foreground-color transition-all duration-150"
                title="Go To Signup"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
