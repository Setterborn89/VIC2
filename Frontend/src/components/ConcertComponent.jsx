import ArtistInfo from "./ArtistInfo";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ConcertComponent() {
  const [data, updateData] = useState([{}]);
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      let concertResponse = await fetch("/data/concerts/");
      concertResponse = await concertResponse.json();

      let array = [];

      concertResponse.map(pickConcerts);

      function pickConcerts(item) {
        if (item.artistId == id) {
          array.push(item);
        }
      }
      updateData(array);
    }
    loadData();
  }, [id]);

  return (
    <>
      <div className="event-container">
        <ArtistInfo />
        <div className="concert">
          <div className="ticketPrice">
            <div>
              <button>
                <a href={"/eventdetails/" + id}>Buy Tickets</a>
              </button>
            </div>
          </div>

          <div className="moreConcerts">
            <h3 className="additionalConserts">Additional Conserts </h3>
            {data[0].location != undefined ? (
              data.map((conserts) => (
                <section key={conserts.id}>
                  {conserts.id == id ? 
                  <p></p>
                  : 
                  <div>
                    <a
                      href={"/streamconcerts/" + conserts.id}
                      className="concert-location">{conserts.location}
                    </a>
                    <p className="concert-date" >Date: {conserts.date}</p>
                  </div>
                  }
                </section>
                  ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ConcertComponent;
