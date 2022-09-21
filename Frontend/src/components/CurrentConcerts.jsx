import React, { useState, useEffect } from "react";

import "../css/CurrentConcerts.css";
import { Link } from "react-router-dom";
import "../css/CurrentConcerts.css";
function CurrentConcerts() {
  const [liveConcertList, updateLiveConcertsData] = useState([]);
  const [streamConcertList, updateStreamConcertsData] = useState([]);

  useEffect(() => {
    async function loadData() {
      let liveTempConcertList = [];
      let streamTempConcertList = [];

      let concertsResponse = await fetch("/data/concerts");
      const concertsData = await concertsResponse.json();

      let artistsResponse = await fetch("/data/artists");
      const artistsData = await artistsResponse.json();

      const currentDate = new Date();

      concertsData.forEach((concert) => {
        for (const artist of artistsData) {
          if (concert.artistId == artist.id) {
            concert.artistName = artist.name;
            break;
          } else {
            concert.artistName = "artist not found";
          }
        }
        const concertDate = new Date(concert.date);
        const diffTime = Math.abs(concertDate - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 31) {
          if (concert.stream) {
            streamTempConcertList.push(concert);
          } else {
            liveTempConcertList.push(concert);
          }
        }
      });

      updateStreamConcertsData(streamTempConcertList);
      // Sort by date in ascending order
      streamTempConcertList.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      updateLiveConcertsData(liveTempConcertList);
      // Sort by date in ascending order
      liveTempConcertList.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    }
    loadData();
  }, []);

  return (
    <>
      <div className="concert_container">
        <h2>Upcoming Concerts</h2>
        <hr />
        <h3>Live Concerts</h3>
        <div className="CCrow">
          <div className="row_cards">
            {liveConcertList.map((element) => (
              <div key={element.id + Math.random()}>
                <Link to={"/ConcertComponent/" + element.id}>
                  <div className="card">
                    <img className="card_poster" src={element.image} />
                    <div className="container">
                      <h4>
                        <b>{element.artistName}</b>
                      </h4>
                      <h3>{new Date(element.date).toDateString()}</h3>
                      <p>{element.location}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <h3>Stream Concerts</h3>
        <div className="CCrow">
          <div className="row_cards">
            {streamConcertList.map((element) => (
              <div key={element.id + Math.random()}>
                <Link to={"/ConcertComponent/" + element.id}>
                  <div className="card">
                    <img className="card_poster" src={element.image} />
                    <div className="container">
                      <h4>
                        <b>{element.artistName}</b>
                      </h4>
                      <h3>{new Date(element.date).toDateString()}</h3>
                      <p>{element.location}</p>
                      <div className="stream_tag">
                        <h2>STREAM</h2>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentConcerts;
