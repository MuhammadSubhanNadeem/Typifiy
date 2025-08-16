"use client";
import { SessionProvider } from "next-auth/react";
export function SessionProviderComponent({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
