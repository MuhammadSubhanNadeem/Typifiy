"use client";

// import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
export default function SignupWithGithub() {
  let [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.user) {
      toast.success("Signup Successfully");
      router.push("/");
    }
    if (session?.error) {
      toast.error(session.error);
      if (session.error === "User Already Exists! Please Login") {
        router.push("/login");
      } else {
        router.push("/signup");
      }
    }
  }, [session, router]);

  return (
    <>
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      ) : null}
      <button
        type="button"
        onClick={async () => {
          setLoading(true);
          document.cookie = "oauth_state=signup; path=/;";
          let res = await signIn("github", { redirect: false });
          setLoading(false);
        }}
        className="w-full h-[45px] flex items-center justify-center gap-[15px] border-[1px] border-content-light/30 cursor-pointer rounded-[5px] hover:bg-background-light/40 transition-all duration-150"
      >
        <i className="bi bi-github text-xl"></i>{" "}
        <span className="font-roboto">Signup with Github</span>
      </button>
    </>
  );
}
