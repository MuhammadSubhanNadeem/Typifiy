import localFont from "next/font/local";
import "./globals.css";
export const geistSans = localFont({
  src: "/fonts/Geist-Regular.woff2",
  variable: "--font-geist-sans",
  weight: "400",
});

export const geistMono = localFont({
  src: "/fonts/Geist-Mono.woff2",
  variable: "--font-geist-mono",
  weight: "400",
});

export const robotoMono = localFont({
  src: "/fonts/RobotoMono-Regular.woff2",
  variable: "--font-roboto-mono",
  weight: "400",
});

export const orbit = localFont({
  src: "/fonts/Orbitron-Regular.woff2",
  variable: "--font-orbit",
  weight: "400",
});