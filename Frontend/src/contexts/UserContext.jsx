import { useState, useEffect } from "react";
import { createContext } from "react";

const getState = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let userLoggedIn = localStorage.getItem("user");
    setLoggedIn(userLoggedIn);
  }, [loggedIn]);

  return {
    loggedIn,
    setLoggedIn,
  };
};

export const GlobalContext = createContext();

export function GlobalContextProvider(props) {
  return (
    <GlobalContext.Provider value={getState()}>
      {props.children}
    </GlobalContext.Provider>
  );
}
