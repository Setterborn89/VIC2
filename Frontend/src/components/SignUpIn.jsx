function SignUpIn() {
  return (
    <>
      <div className="accountform">
        <div>
          <h3>Register for an account here</h3>
          <h4>First name</h4>
          <input type="text" placeholder="Enter first name" />
          <h4>Last name</h4>
          <input type="text" placeholder="Enter last name" />
          <h4>E-mail</h4>
          <input type="email" placeholder="Enter e-mail" />
          <h4>Password</h4>
          <input type="password" placeholder="Enter password" />
          <h4>Repeat password</h4>
          <input type="password" placeholder="Repeat password" />
          <div>
            <button>Register</button>
          </div>
        </div>
        <div>
          <h3>Sign In</h3>
          <h4>E-mail</h4>
          <input type="email" placeholder="Enter e-mail" />
          <h4>Password</h4>
          <input type="password" placeholder="Enter password" />
        </div>
        <div>
          <button>Sign In</button>
        </div>
      </div>
    </>
  );
}

export default SignUpIn;
