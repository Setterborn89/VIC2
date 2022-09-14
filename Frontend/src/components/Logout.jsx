import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
function Logout() {
let navigate = useNavigate();
useEffect(() => {
    async function signOutUser() {
        let response = await fetch("/data/login", {
          method: "delete",
        });
        let dataResponse = await response.json();
      }
      signOutUser();
      navigate('/');


}, [])

}

export default Logout;
