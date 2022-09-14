import { useState } from "react";
import { createContext } from "react";

const getState = () => {
  const [loggedIn, setLoggedIn] = useState(false);

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
