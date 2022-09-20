import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/useUserContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useUserContext();
  const [message, SetMessage] = useState("Sign In")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    let dataResponse = await fetch("/data/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let response = await dataResponse.json();
    if (response.loggedIn) {
      setLoggedIn(response.loggedIn);
      localStorage.setItem("user", JSON.stringify(response.loggedIn));
      navigate({ pathname: "/" });
    } else {
      SetMessage("Could not login")
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="loginform">
        <div>
          <h3>{message}</h3>
          <div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                placeholder="Enter e-mail..."
                name="emailAdress"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter password..."
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Sign In</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignIn;
