import { useContext } from "react";
import { GlobalContext } from "./UserContext";

export const useUserContext = (name = "global") => {
  if (name === "global") return useContext(GlobalContext);
};
