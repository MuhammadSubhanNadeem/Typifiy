"use client";
import { createContext, useContext, useState } from "react";
export const appContext = createContext();
export default function App_Context({ children }) {
  let [topLinkShow, setTopLinkShow] = useState(false);
  let [textType, setTextType] = useState("alphabet");
  let [contentType, setContentType] = useState("word");
  let [paragraph, setParagraph] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius error, repellat saepe iure ipsum ex, velit consectetur asperiores cupiditate sed totam repellendus fugiat impedit cumque distinctio rem nulla beatae explicabo."
  );
  let [textTime, setTextTime] = useState(15);
  let [account, setAccount] = useState({
    userName: "",
    userEmail: "",
    auth: false,
  });
  let store = {
    appData: {
      account,
      setAccount,
    },
    uiStates: {
      topLinkShow,
      setTopLinkShow,
      textFilterStates: {
        textType,
        setTextType,
        contentType,
        setContentType,
        textTime,
        setTextTime,
        paragraph,
        setParagraph,
        // timeShow,
        // setTimeShow,
      },
    },
    apiCalls: {
      checkLogin: async () => {
        try {
          let req = await fetch("/api/auth/login", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-cache",
          });
          let res = await req.json();
          return res;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    },
  };
  return <appContext.Provider value={store}>{children}</appContext.Provider>;
}
export function useAppContext() {
  return useContext(appContext);
}
