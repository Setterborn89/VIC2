import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    let dataResponse = await fetch("/data/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let response = await dataResponse.json();

    response.loggedIn == true
      ? navigate({ pathname: "/" })
      : console.log("Could not login");
    console.log(response);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="loginform">
        <div>
          <h3 id="signIn">Sign In</h3>
          <div id="signInform">
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
                placeholder="At least 6 characters..."
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button href="/" type="submit">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignIn;
