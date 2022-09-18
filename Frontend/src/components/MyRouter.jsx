import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../css/SignIn.css";
import "../App.css";
import "../css/ConcertComponent.css";
import "../css/SignUp.css";
import "../Css/ticket.css"
import "../Css/UserPage.css"
import "../css/EventDetails.css"
import "../css/EventDetails.css";
import "../css/Mobileview.css";
import "../css/ConcertByDate.css";

import { useUserContext } from "../contexts/useUserContext";

import Search from "./Search";
import SignUp from "./SignUp";
import CurrentConcerts from "./CurrentConcerts";
import ConcertComponent from "./ConcertComponent";
import EventDetails from "./EventDetails";
import VideoPlayer from "./VideoPlayer";
import UserPage from "./UserPage";
import Ticket from "./Ticket";
import Signout from "./Signout";
import ConcertByDate from "./ConcertByDate";

function MyRouter() {
  const { loggedIn } = useUserContext();
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
        <Link to="/" id="logo">
          <h1>Live Fanatic</h1>
        </Link>
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
            <Link to="ConcertByDate">Concert By Date</Link>
            <Link to="streamconcerts">Stream Concerts</Link>
            <Link to="LiveConcerts">Live Concerts</Link>
          </nav>
        </div>
        <div className="accountManagement">
          {!loggedIn ? 
          (
            <Link to="SignUp">Sign Up/Sign In</Link>
          ) 
          : 
          (<div>
            <Link to="Signout">Sign out</Link>
            <Link to="UserPage">Profile</Link>
          </div>)}
        </div>

        <div className="burger">
          <section class="top-nav">       
            <input id="menu-toggle" type="checkbox" />
            <label class='menu-button-container' for="menu-toggle">
            <div class='menu-button'></div>
          </label>
            <ul class="menu">
              <li>
                <Link to="/">Home</Link>
                <Link to="streamconcerts">Stream Concerts</Link>
                <Link to="LiveConcerts">Live Concerts</Link>
                <Link to="UserPage">UserPage</Link>
              </li>
            </ul>
          </section>
        </div> 

      </header>

      <main>
        <Routes>
          {
            <>
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/SignOut" element={<Signout />} />
              <Route path="ConCertByDate" element={<ConcertByDate />} />
              <Route path="/" element={<CurrentConcerts />}></Route>
              <Route path="/streamconcerts/:id" element={<ConcertComponent />} />
              <Route path="/videoPlayer/:url" element={<VideoPlayer/>}/>
              <Route path="/eventdetails/:id" element={<EventDetails />} />
              <Route path="/Lista" element={<Search />}></Route>
              <Route path="/UserPage" element={<UserPage />}></Route>
              <Route path="/ticket/:id" element={<Ticket />}></Route>
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
