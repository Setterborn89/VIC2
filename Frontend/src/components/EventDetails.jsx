import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../css/eventdetails.css";
import ArtistInfo from "./ArtistInfo";

function EventDetails() {
  const { id } = useParams();
  const info =
    "Se starttid ovan vid datum. Se ev förband längre ner på sidan. Insläpp: 18:15 Åldersgräns: 13+.";

  const [tickets, setCount] = useState(0);
  const [event, setEvent] = useState({});
  const [cost, updateCost] = useState(0);

  let className = "event-ticket-status ";
  let message;

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

  useEffect(() => {
    let totalPrice = tickets * event.price;
    updateCost(totalPrice);
  }, [tickets, cost]);

  if (event.seats < 100 && event.seats != 0) {
    className += "message";
    message = "Fåtal biljetter kvar";
  } else if (event.seats === 0) {
    className += "soldout";
    message = "Slutsålt";
  }

  return (
    <>
      <div className="event-container">
        <ArtistInfo event={event} />
        <div className="extra-event-info">
          <h1>Evenemangsinformation</h1>
          <p>{info}</p>
          <p>
            Rullstols information: Säljes endast via Live Fanatic Kundservice
            075-530 40 50
          </p>
        </div>

        <span className={className}>{message}</span>

        <div className="event-buy-ticket">
          <p>Välj antal biljetter</p>
          <div className="ticket-selector">
            <button
              disabled={tickets < 1}
              className="minus-btn"
              id="minus-btn"
              onClick={() => setCount(tickets - 1)}
            >
              -
            </button>
            <h1>{tickets}</h1>

            <button
              disabled={tickets > 9}
              className="plus-btn"
              onClick={() => setCount(tickets + 1)}
            >
              +
            </button>
          </div>
          <p className="max-tickets">Max 10 biljetter</p>
          <div>
            <strong className="ticket-price">{event.price} kr</strong>
          </div>
          <div>
            <p>
              {tickets} {tickets == 1 ? "biljett" : "biljetter"}{" "}
            </p>
          </div>
          <button className="event-buy-ticket-link" disabled={tickets == 0}>
            Köp biljett
          </button>
        </div>
      </div>
    </>
  );
}

export default EventDetails;
