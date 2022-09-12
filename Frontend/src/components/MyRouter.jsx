import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import MyComponent from "./MyComponent";
import Search from "./Search";
import SignUpIn from "./SignUpIn";
import CurrentConcerts from "./CurrentConcerts";
import ConcertComponent from "./ConcertComponent";
import EventDetails from "./EventDetails";
import VideoPlayer from "./VideoPlayer";


function MyRouter() {
  const [searchWord, setSearchWord] = useState("searchword");
  const navigate = useNavigate();

  const searchText = event =>{
    setSearchWord(event.target.value)
    handleChange()
  }

  const handleChange = event => {
    navigate({pathname: '/Lista', search:"?searchword=" + searchWord});
  };

  return (<div>
      <header>
        <h1 id="logo">Live Fanatic</h1>
        <div className="search-bar">
            <input type ="text" placeholder="Search" onChange={searchText.bind(this)} />
        </div>
        <div className="navBar">
            <nav>
              <Link to="/">Home</Link>
              <Link to="streamconcerts">Stream Concerts</Link>
              <Link to="LiveConcerts">Live Concerts</Link>
            </nav>
          </div>
          <Link to="SignUpIn">Sign Up/Sign In</Link>
        </header>
        <main>
          <Routes>
            {
              <>
                <Route path="/SignUpIn" element={<SignUpIn />} />
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
