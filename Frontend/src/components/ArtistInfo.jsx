import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { GoLocation } from "react-icons/go";
import { GoClock } from "react-icons/go";

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
        time: null,
      };

      let eventResponse = await fetch("/data/concerts/" + id);
      let eventResult = await eventResponse.json();
      eventData.location = eventResult.location;
      eventData.price = eventResult.price;
      eventData.date = eventResult.date.substring(0, 10);
      eventData.artistId = eventResult.artistId;
      eventData.seats = eventResult.seats;
      eventData.image = eventResult.image;
      eventData.time = eventResult.date.substring(11, 16);

      let artistResponse = await fetch("/data/artists/" + eventData.artistId);
      let artistResult = await artistResponse.json();
      eventData.artistName = artistResult.name;
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
            <a href="" className="event-location">
              <GoLocation />
              {event.location}
            </a>
            <p className="event-time">
              <GoClock /> Tid: {event.time}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistInfo;
