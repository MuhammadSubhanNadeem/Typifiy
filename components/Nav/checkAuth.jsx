"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import DropDownMenuComponent from "../profile/dropDownMenu";

export default function CheckAuth() {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession(null);

  useEffect(() => {
    console.log(session, "session");
  }, [session]);

  if (status === "loading") {
    return <Skeleton className="w-[110px] h-[35px]" />;
  }

  return session?.user ? (
    // <DropdownMenuTrigger asChild>
    <DropDownMenuComponent />
  ) : (
    // </DropdownMenuTrigger>
    <Link
      href="/login"
      className="text-lg font-extralight md:text-[16px] lg:text-[18px] min-[1980px]:text-[20px]"
    >
      Login
    </Link>
  );
}
