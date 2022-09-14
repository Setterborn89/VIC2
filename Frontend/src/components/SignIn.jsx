import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignIn(props){

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
        props.isLoggedIn == true
        response.loggedIn == true ? navigate({pathname: '/'}) : console.log("Could not login")        
      };

    return <>

    <div className="loginform">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <div>
        <div className="email-login">
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
            <div className="password-login">
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
                    <button href="/" type="submit">Sign In</button>
                </div>
          </div>
        </form> 
    </div>

        </>
}

export default SignIn;