import { useEffect, useState } from "react";

function GetCurrentUser(props) {
  let [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    async function getCurrentUser() {
      let response = await fetch("/data/login");
      let result = await response.json();
      if (result.loggedIn) currentUser = result.email;
      console.log(result.loggedIn, result.email);
      setCurrentUser(currentUser);
    }
    getCurrentUser();
  }, []);
}

export default GetCurrentUser;
