"use client";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
// import { useEffect } from "react";

export default function DropDownMenuComponent() {
  const [avatarFallback, setAvatarFallback] = useState("");
  const { data: session, status } = useSession(null);
  useEffect(() => {
    let fullName = `${session.user?.firstName} ${session.user?.lastName}`;
    console.log(fullName);

    setAvatarFallback(
      fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 3)
        .map((word) => word[0])
        .join("")
    );
  }, [avatarFallback]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-max h-full border-none outline-none cursor-pointer flex items-center justify-center gap-2">
          <i className="bi bi-person-fill text-2xl"></i>
          <span className="inline-block text-lg font-extralight">Profile</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background-color">
        <DropdownMenuLabel className="my-1">
          <div className="w-full h-full flex items-center justify-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={session.user?.dp} alt="DP" />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-tight cursor-default">
              <span className="text-[16px] font-medium text-content">
                {session.user?.firstName} {session.user?.lastName}
              </span>
              <span className="text-[12px] text-content-light">
                {session.user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="my-2.5">
          <DropdownMenuItem className="cursor-pointer text-md text-content-light hover:text-content transition-all duration-150 font-orbit">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-md text-content-light hover:text-content transition-all duration-150 font-orbit">
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="w-full flex items-center justify-center my-2">
          <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-fit h-fit px-3 py-1 font-orbit text-sm text-foreground bg-red-500 cursor-pointer hover:bg-red-600 rounded-[5px] font-extrabold"
            title="Logout From Your Account"
          >
            <i className="bi bi-box-arrow-left text-lg m-0 p-0"></i>Logout
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
