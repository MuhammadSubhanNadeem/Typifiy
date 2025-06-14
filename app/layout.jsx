import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Nav from "@/components/Nav/nav";
import App_Context from "@/store/App_Context";
import Client_Component from "@/components/Client_Component";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const orbit = Orbitron({
  variable: "--font-orbit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  // let context = useContext(appContext);
  // console.log(context);

  return (
    <html lang="en" className="dark">
      <body
        className={`w-full h-full ${geistSans.variable} ${geistMono.variable} ${orbit.variable} antialiased bg-background-color`}
      >
        <header className="w-full h-full flex items-center justify-center">
          <Nav />
        </header>
        {children}
        <App_Context>
          <Client_Component />
        </App_Context>
      </body>
    </html>
  );
}
