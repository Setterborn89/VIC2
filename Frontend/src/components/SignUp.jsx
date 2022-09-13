import React, { useState, useEffect } from "react";
import SignIn from "./SignIn"

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      // firstName : firstName,
      // lastName : lastName,
      email: email,
      password: password,
    };
    console.log(data);
    let dataResponse = await fetch("/data/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let response = await dataResponse.json();
    console.log(response);
  };

  return (
    <>
    
      <form onSubmit={handleSubmit} className="accountform">
        <div>
          <h3 id="register">Create account</h3>
          <div id="registerform">
            <div>
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                placeholder="Enter first name..."
                name="firstName"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                placeholder="Enter last name..."
                name="lastName"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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
              <label>Confirm password</label>
              <input
                type="password"
                placeholder="Confirm password..."
                name="confirmPassword"
                required
              />
            </div>
            <div>
              <button>Register</button>
            </div>
          </div>
        </div>
      
      </form>
      <SignIn/>
    </>
  );
}

export default SignUp;
