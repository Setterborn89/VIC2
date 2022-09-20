import ArtistInfo from "./ArtistInfo";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../contexts/useUserContext";

function ConcertComponent() {
  const [data, updateData] = useState([{}]);
  const { id } = useParams();
  const { loggedIn } = useUserContext();

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
            {loggedIn ? (
              <button>
                <Link to={"/eventdetails/" + id}>Buy Tickets</Link>
              </button>
            ) : (
              <p>Sign in to get tickets!</p>
            )}
          </div>

          <div className="moreConcerts">
            {data[0].location != undefined ? (
              data.map((conserts) => (
                <section key={conserts.id}>
                  {conserts.id == id ? (
                    <p></p>
                  ) : (
                    <div>
                      <h3>Additional Conserts </h3>
                      <Link
                        to={"/streamconcerts/" + conserts.id}
                        className="concert-location"
                      >
                        {conserts.location}
                      </Link>
                      <p className="concert-date">Date: {conserts.date}</p>
                    </div>
                  )}
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
