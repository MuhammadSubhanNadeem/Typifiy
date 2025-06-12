// app/components/CheckAuth.jsx (Server Component)
"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/store/App_Context";
import Link from "next/link";
export default function CheckAuth() {
  let [loading, setLoading] = useState(true);
  let appStore = useAppContext();
  // Simulate server delay
  async function checkLogin() {
    // setLoading(true);
    // console.log(appStore);
    let response = await appStore.apiCalls.checkLogin();
    // console.log(response);
    if (response?.auth && response?.userData) {
      appStore.appData.setAccount({
        userName: response?.userData?.userName,
        userEmail: response?.userData?.userEmail,
        auth: true,
      });
    } else {
      appStore.appData.setAccount({
        userName: "",
        userEmail: "",
        auth: false,
      });
    }
    setLoading(false);
    // console.log("done");
  }
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    isDark
      ? window.document.documentElement.classList.add("dark")
      : window.document.documentElement.classList.remove("dark");
    checkLogin();
  }, []);
  return loading ? (
    <Skeleton className="w-[110px] h-[35px]" />
  ) : (
    <>
      {appStore.appData.account.auth ? (
        <>
          <i className="bi bi-person-fill text-2xl"></i>
          <Link href="/profile" className="text-lg font-extralight">Profile</Link>
        </>
      ) :  <>
          {/* <i className="bi bi-person text-2xl" title="Login To Your Account"></i> */}
          <Link href="/login" className="text-lg font-extralight md:text-[16px] lg:text-[18px] min-[1980px]:text-[20px]">Login</Link>
        </>}
    </>
  );
}
