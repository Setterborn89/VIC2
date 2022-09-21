import React, { useState, useEffect } from "react";

function ConcertByDate() {
  const [concertList, updateConcertList] = useState([]);

  useEffect(() => {
    async function getConcerts() {
      let concerts = [];

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
        concerts.push(concert);
      });

      concerts.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      updateConcertList(concerts);
      // Sorted in ascending order
      
    }
    getConcerts();
  }, []);

  return (<div>
    <h2>All concerts</h2>
    <hr />
    <div className="sortByDate">
      {concertList.map((element) => (
        <div className="dateCards" key={element.id + Math.random()}>
          <a
            className="sortByDateCards"
            href={"/ConcertComponent/" + element.id}
          >
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
          </a>
        </div>
      ))}
    </div>
  </div>
  );
}

export default ConcertByDate;
