import { useState, useEffect } from "react";
import ArtistInfo from "./ArtistInfo";
function EventInformation() {
  const price = "250,00";
  const info = "";

  const [tickets, setCount] = useState(0);

  return (
    <>
      <div className="event-container">
        <ArtistInfo />
        <div className="extra-event-info">
          <h1>Evenemangsinformation</h1>
          <p>
            Se starttid ovan vid datum. Se ev förband längre ner på sidan.
            Insläpp: 18:15 Åldersgräns: 13+
          </p>
          <p>
            Rullstols information: Säljes endast via Live Fanatic Kundservice
            075-530 40 50
          </p>
        </div>
        <span className="event-ticket-status message">
          Fåtal biljetter kvar
        </span>
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
            <strong className="ticket-price">{price} kr</strong>
          </div>
          <a className="event-buy-ticket-link">Köp biljett</a>
        </div>
      </div>
    </>
  );
}

export default EventInformation;
