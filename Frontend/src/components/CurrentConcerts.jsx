import React, { useState, useEffect } from "react";

import "../css/CurrentConcerts.css"
function CurrentConcerts() {
  let [liveConcertList, updateLiveConcertsData] = useState([]);
  let [streamConcertList, updateStreamConcertsData] = useState([]);

  useEffect(() => {
    async function loadData() {
      liveConcertList = [];
      streamConcertList = [];

      let concertsResponse = await fetch("/data/concerts");
      const concertsData = await concertsResponse.json();

      let artistsResponse = await fetch("/data/artists");
      const artistsData = await artistsResponse.json();

      concertsData.forEach((concert) => {
        for (const artist of artistsData) {
          if (concert.artistId == artist.id) {
            concert.artistName = artist.name;
            break;
          } else {
            concert.artistName = "artist not found";
          }
        }

        if (concert.stream) {
          streamConcertList.push(concert);
        } else {
          liveConcertList.push(concert);
        }
      });

      updateStreamConcertsData(streamConcertList);
      updateLiveConcertsData(liveConcertList);
      console.log(liveConcertList);
      console.log(streamConcertList);
    }
    loadData();
  }, []);

  return (
    <>
      <div>
        <h2>Upcoming Concerts</h2>
        <h3>Live Concerts</h3>
        <div className="row">
          <card className="row_cards">
            {liveConcertList.map((element) => (
              <>
                <a href={"/streamconcerts/" + element.id}  key={element.id + Math.random()}>
                  <div className="card">
                    <img className="card_poster" src={element.image} />
                    <div className="container">
                      <h4>
                        <b>{element.artistName}</b>
                      </h4>
                      <h3>{element.date}</h3>
                      <p>{element.location}</p>
                    </div>
                  </div>
                </a>
              </>
            ))}
          </card>
        </div>
        <hr />
        <h3>Stream Concerts</h3>
        <div className="row">
          <card className="row_cards">
            {streamConcertList.map((element) => (
              <>
                <a href={"/streamconcerts/" + element.id} key={element.id + Math.random()} >
                  <div className="card">
                    <img className="card_poster" src={element.image} />
                    <div className="container">
                      <h4>
                        <b>{element.artistName}</b>
                      </h4>
                      <h3>{element.date}</h3>
                      <p>{element.location}</p>
                    </div>
                  </div>
                </a>
              </>
            ))}
          </card>
        </div>
      </div>
    </>
  );
}

export default CurrentConcerts;
