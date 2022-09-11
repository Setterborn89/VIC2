import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../App.css";
import MyComponent from "./MyComponent";
import EventDetails from "./EventDetails";
import ConcertComponent from "./ConcertComponent";
import VideoPlayer from "./VideoPlayer";

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
          <a href="" id="login">
            Login
          </a>
        </header>
        <main>
          <Routes>
            {
              <>
                <Route path="/home" element={<MyComponent />}></Route>
                <Route path="/streamconcerts" element={<ConcertComponent />} /> 
                <Route path="/liveconcerts" element={<VideoPlayer url="video/Chris-Do.mp4" />} />
                <Route path="/eventdetails/:id" element={<EventDetails />} />
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
