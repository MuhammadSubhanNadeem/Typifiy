"use client";
import { createContext, useContext, useState } from "react";
export const appContext = createContext();
export default function App_Context({ children }) {
  let [topLinkShow, setTopLinkShow] = useState(false);
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
    uiStates: { topLinkShow, setTopLinkShow },
    apiCalls: {
      checkLogin: async () => {
        try {
          let req = await fetch("/api/auth/login", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: 'no-cache'
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
