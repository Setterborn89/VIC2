import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../contexts/useUserContext";

function Signout() {
  const { loggedIn, setLoggedIn } = useUserContext();

  let navigate = useNavigate();
  useEffect(() => {
    async function signOutUser() {
      let response = await fetch("/data/login", {
        method: "delete",
      });
      let dataResponse = await response.json();
      if (!dataResponse.loggedIn) {
        setLoggedIn(dataResponse.loggedIn);
        localStorage.removeItem("user");
      }
    }
    signOutUser();
    navigate("/");
  }, []);
}

export default Signout;
