// "use client";

// // import { useGoogleLogin } from "@react-oauth/google";
// import { useState } from "react";
// import { toast } from "sonner";
// import { signIn, useSession } from "next-auth/react";
// import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// export default function SignupWithGoogle() {
//   let [loading, setLoading] = useState(false);
//   let router = useRouter();
//   // let [loginRes, setLoginRes] = useState(null);
//   const { data: session } = useSession();
//   return (
//     <>
//       {loading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : null}
//       <button
//         type="button"
//         // onClick={() => googleLogin()}
//         onClick={async () => {
//           setLoading(true);
//           document.cookie = "oauth_state=signup; path=/;";
//           let res = await signIn("google", { redirect: false });
//           console.log(res);

//           setLoading(false);
//           if (session?.error) {
//             toast.error(session.error);
//             if(session?.error === "User Already Exists! Please Login") {
//               router.push("/login");
//             } else {
//               router.push("/signup");
//             }
//           } else if (session?.user?.email) {
//             router.push("/");
//             toast.success("Signup Successfully");
//           } else {
//             toast.error("Something went wrong");
//           }
//         }}
//         className="w-full h-[45px] flex items-center justify-center gap-[15px] border-[1px] border-content-light/30 cursor-pointer rounded-[5px] hover:bg-background-light/40 transition-all duration-150"
//       >
//         <i className="bi bi-google text-xl"></i>{" "}
//         <span className="font-roboto">Signup with Google</span>
//       </button>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupWithGoogle() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // React to session changes
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
  // useEffect(() => {
  //   if (session?.error) {
  //     toast.error(session.error);
  //   }
  // }, [session]);
  const handleSignup = async () => {
    setLoading(true);
    document.cookie = "oauth_state=signup; path=/;";

    const res = await signIn("google", { redirect: false });
    setLoading(false);
    console.log(res, "res");

    // immediate errors (OAuth/NextAuth level)
    if (res?.error) {
      toast.error(res.error);
    }
  };

  return (
    <>
      {loading && (
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      )}
      <button
        type="button"
        onClick={handleSignup}
        className="w-full h-[45px] flex items-center justify-center gap-[15px] border-[1px] border-content-light/30 cursor-pointer rounded-[5px] hover:bg-background-light/40 transition-all duration-150"
      >
        <i className="bi bi-google text-xl"></i>{" "}
        <span className="font-roboto">
          {loading ? "Loading..." : "Signup with Google"}
        </span>
      </button>
    </>
  );
}
