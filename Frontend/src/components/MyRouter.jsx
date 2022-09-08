import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../App.css";
import MyComponent from "./MyComponent";
import SignUpIn from "./SignUpIn";

function MyRouter() {
  return (
    <Router>
      <body>
        <header>
          <h1 id="logo">Live Fanatic</h1>
          <div className="search-bar">
            <input placeholder="Search" />
            {/* <img src={} alt="/> */}
          </div>
          <div className="navBar">
            <nav>
              <Link to="Home">Home</Link>
              <Link to="Stream Concerts">Stream Concerts</Link>
              <Link to="Live Concerts">Live Concerts</Link>
            </nav>
          </div>
          <Link to="SignUpIn">Sign Up/Sign In</Link>
        </header>
        <main>
          <Routes>
            {
              <>
                <Route path="/Home" element={<MyComponent />}></Route>
                <Route path="/SignUpIn" element={<SignUpIn />}></Route>
              </>
            }
          </Routes>
        </main>
        <footer>
          <div className="info">
            <h3>About</h3>
            <p>Est. 2022</p>
            <p>ViciousDevelopment2</p>
            <p>©Copyright</p>
          </div>
          <div className="info">
            <h3>Contact</h3>
            <p>efraim@livefanatic.se</p>
            <p>+4675-530 40 50</p>
            <p>MALMÖ</p>
          </div>
        </footer>
      </body>
    </Router>
  );
}

export default MyRouter;
