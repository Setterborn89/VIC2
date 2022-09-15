import React, { useState, useEffect } from "react";

import "../css/CurrentConcerts.css"
function CurrentConcerts() {
  const [liveConcertList, updateLiveConcertsData] = useState([]);
  const [streamConcertList, updateStreamConcertsData] = useState([]);

  useEffect(() => {
    async function loadData() {
      let liveTempConcertList = [];
      let streamTempConcertList = [];
      let sortedLiveList = [];
      let sortedStreamList = [];



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
        console.log(concertDate);
        const diffTime = Math.abs(concertDate - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log("Days from today: " + diffDays);

        if(diffDays <= 92){
          if (concert.stream) {
            streamTempConcertList.push(concert);
          } else {
            liveTempConcertList.push(concert);
          }
        }

        sortedLiveList = liveTempConcertList.sort(
          (objA, objB) => Number(objA.date) - Number(objB.date)
        );

        sortedStreamList = streamTempConcertList.sort(
          (objA, objB) => Number(objA.date) - Number(objB.date)
        );
      });

      updateStreamConcertsData(sortedStreamList);
      updateLiveConcertsData(sortedLiveList);

    }
    loadData();
    
  }, []);

  return (
    <>
      <div className="concert_container">
        <h2>Upcoming Concerts</h2>
        <hr />
        <h3>Live Concerts</h3>
        <div className="row">
          <div className="row_cards">
            {liveConcertList.map((element) => (
              
              <div key={element.id + Math.random()}>
                <a href={"/streamconcerts/" + element.id} >
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
              </div>
            ))}
          </div>
        </div>
        <h3>Stream Concerts</h3>
        <div className="row">
          <div className="row_cards">
            {streamConcertList.map((element) => (
              <div key={element.id + Math.random()}>
                <a href={"/streamconcerts/" + element.id}  >
                  <div className="card">
                    <img className="card_poster" src={element.image}/>
                    <div className="container">
                      <h4>
                        <b>{element.artistName}</b>
                      </h4>
                      <h3>{element.date}</h3>
                      <p>{element.location}</p>
                      <div className="stream_tag">
                        <h2>STREAM</h2>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentConcerts;
