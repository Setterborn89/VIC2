import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/SignIn.css";
import "../App.css";
import "../css/ConcertComponent.css";
import "../css/SignUp.css";
import "../css/EventDetails.css"
import MyComponent from "./MyComponent";
import Search from "./Search";
import SignUp from "./SignUp";
import CurrentConcerts from "./CurrentConcerts";
import ConcertComponent from "./ConcertComponent";
import EventDetails from "./EventDetails";
import VideoPlayer from "./VideoPlayer";
import Logout from "./Logout";

function MyRouter() {
  const [loggedIn, setLoggedInStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getCurrentUser() {
      let response = await fetch("/data/login");
      let result = await response.json();
      setLoggedInStatus(result.loggedIn);
      setLoaded(true);
      console.log(result.loggedIn);
    }
    getCurrentUser();
  }, []);

  const [searchWord, setSearchWord] = useState("searchword");
  const navigate = useNavigate();

  const searchText = (event) => {
    setSearchWord(event.target.value);
    handleChange();
  };

  const handleChange = (event) => {
    navigate({ pathname: "/Lista", search: "?searchword=" + searchWord });
  };

  return (
    <div>
      <header>
        <a href="/" id="logo">
          <h1>Live Fanatic</h1>
        </a>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            onChange={searchText.bind(this)}
          />
        </div>
        <div className="navBar">
          <nav>
            <Link to="/">Home</Link>
            <Link to="streamconcerts">Stream Concerts</Link>
            <Link to="LiveConcerts">Live Concerts</Link>
          </nav>
        </div>
        {!loggedIn ? (
          <Link to="SignUp">Sign Up/Sign In</Link>
        ) : (
          <Link to="SignOut">Sign Out</Link>
        )}
      </header>
      <main>
        <Routes>
          {
            <>
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/SignOut" element={<Logout />} />

              <Route path="/" element={<CurrentConcerts />}></Route>
              <Route
                path="/streamconcerts/:id"
                element={<ConcertComponent />}
              />
              <Route
                path="/liveconcerts"
                element={<VideoPlayer url="video/Chris-Do.mp4" />}
              />
              <Route path="/eventdetails/:id" element={<EventDetails />} />

              <Route path="/Lista" element={<Search />}></Route>
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
    </div>
  );
}

export default MyRouter;
