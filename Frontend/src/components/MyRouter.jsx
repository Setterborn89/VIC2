import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../App.css";
import MyComponent from "./MyComponent";
import EventInformation from "./EventInformation";
import ConcertComponent from "./ConcertComponent";
import SignUpIn from "./SignUpIn";

function MyRouter() {
  return (
    <Router>
      <section>
        <header>
          <h1 id="logo">Live Fanatic</h1>
          <div className="search-bar">
            <input placeholder="Search" />
            {/* <img src={} alt="/> */}
          </div>
          <div className="navBar">
            <nav>
              <Link to="Home">Home</Link>
              <Link to="StreamConcerts">Stream Concerts</Link>
              <Link to="LiveConcerts">Live Concerts</Link>
            </nav>
          </div>
          <Link to="SignUpIn">Sign Up/Sign In</Link>
        </header>
        <main>
          <Routes>
            {
              <>
                <Route path="/Home" element={<MyComponent />}></Route>
                <Route path="/StreamConcerts" element={<ConcertComponent />} />
                <Route path="/LiveConcerts" element={<EventInformation />} />
                <Route path="/SignUpIn" element={<SignUpIn />} />
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
            <p>efraim@newton.se</p>
            <p>+4675-530 40 50</p>
            <p>MALMÖ</p>
          </div>
        </footer>
      </section>
    </Router>
  );
}

export default MyRouter;
