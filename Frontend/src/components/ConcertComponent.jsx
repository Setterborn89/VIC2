import ArtistInfo from "./ArtistInfo";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../contexts/useUserContext";

function ConcertComponent() {
  const [data, updateData] = useState([{}]);
  const [aditionalConcerts, setAditionalConcerts] = useState([{}]);
  const { id } = useParams();
  const { loggedIn } = useUserContext();

  console.log(id)

  useEffect(() => {
    async function loadData() {
        let array1 = [];
        let array2 = [];
        let artistId

        let concertResponse = await fetch("/data/concerts/");
        concertResponse = await concertResponse.json();

        concertResponse.forEach((item)=>{
            if (item.id == id) {
            array1.push(item);
            artistId = item.artistId
            }
        })
        concertResponse.forEach((item)=>{
            if (item.artistId == artistId) {
                array2.push(item);
            }
        })
        
        updateData(array1);
        setAditionalConcerts(array2)
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
              aditionalConcerts.map((conserts) => (
                <section key={conserts.id}>
                  {conserts.id == id ? (
                    <p></p>
                  ) : (
                    <div>
                      <h3>Additional Conserts </h3>
                      <Link
                        to={"/ConcertComponent/" + conserts.id}
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
