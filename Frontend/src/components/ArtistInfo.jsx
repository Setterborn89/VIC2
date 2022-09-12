import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../css/eventdetails.css";

function ArtistInfo() {
  
  const time = "20:30";
  const [event, setEvent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function loadEvent() {
      let eventData = {
        artistName: null,
        artistId: null,
        location: null,
        date: null,
        price: null,
        image: null,
        seats: null,
      };

      let eventResponse = await fetch("/data/concerts/" + id);
      let eventResult = await eventResponse.json();
      eventData.location = eventResult.location;
      eventData.price = eventResult.price;
      eventData.date = eventResult.date;
      eventData.artistId = eventResult.artistId;
      eventData.seats = eventResult.seats;

      let artistResponse = await fetch("/data/artists/" + eventData.artistId);
      let artistResult = await artistResponse.json();
      eventData.artistName = artistResult.name;
      eventData.image = artistResult.image;
      setEvent(eventData);
    }
    loadEvent();
  }, []);

  return (
    <>
      <div className="artistInfo">
          <img src={event.image} />
        <div className="event-info">
          <div className="event-date">
            <span>{event.date}</span>
          </div>
          <div className="event-details">
            <h1 className="event-title">{event.artistName}</h1>
            <a href="">{event.location}</a>
            <h3 className="event-time">Tid: {time}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistInfo;
