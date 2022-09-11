import React, { useState, useEffect } from "react";

function SignUpIn() {
  async function createAccount() {
    let data = {
      firstName: "Kelly",
      lastName: "Tran",
      email: "kelly@hotmail.com",
      password: "abc123",
    };

    let dataResponse = await fetch("/data/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let response = await dataResponse.json();
  }

  return (
    <>
      <form className="accountform">
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
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                placeholder="Enter last name..."
                name="lastName"
                required
              />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                placeholder="Enter e-mail..."
                name="emailAdress"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="At least 6 characters..."
                name="password"
                required
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
              <button type="submit">Register</button>
            </div>
          </div>
        </div>
        <div>
          <h3>Sign In</h3>
          <div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input type="email" placeholder="Enter e-mail..." />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter password..." />
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

export default SignUpIn;
