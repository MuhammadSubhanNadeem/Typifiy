import LoginDivider from "@/components/login/loginDivider";
import LoginPasswordInput from "@/components/login/loginPasswordInput";
import LogoutButton from "@/components/logout/logoutButton";
import SignupWithGithub from "@/components/signup/signupWithGithub";
import SignupWithGoogle from "@/components/signup/signupWithGoogle";
import Link from "next/link";
// import {GoogleLogin} from "@react-oauth/google"
export default async function page() {
  
  // useEffect(() => {

  // }, [session])

  return (
    <>
      {/* {!session?.user?.email ? ( */}
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
                <form
                  action="../api/auth/signup"
                  method="post"
                  className="w-full h-fit flex flex-col items-center justify-center gap-3.5"
                >
                  <input
                    type="text"
                    className="w-full max-w-[320px] h-[45px] border-[2px] focus:border-content border-content-light/45 transition-all duration-200 rounded-[5px] pl-[15px] outline-none font-roboto tracking-tight placeholder:font-light"
                    name="first_name"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    className="w-full max-w-[320px] h-[45px] border-[2px] focus:border-content border-content-light/45 transition-all duration-200 rounded-[5px] pl-[15px] outline-none font-roboto tracking-tight placeholder:font-light"
                    name="last_name"
                    placeholder="Last Name"
                  />
                  <input
                    type="email"
                    className="w-full max-w-[320px] h-[45px] border-[2px] focus:border-content border-content-light/45 transition-all duration-200 rounded-[5px] pl-[15px] outline-none font-roboto tracking-tight placeholder:font-light"
                    name="email"
                    placeholder="example@gmail.com"
                  />
                  <LoginPasswordInput
                    passwordName="password"
                    passwordPlaceholder="Strong Password"
                    submitButtonText="Signup to Your Account"
                  />
                </form>
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
