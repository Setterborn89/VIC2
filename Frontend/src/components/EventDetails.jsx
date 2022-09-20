import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import "../css/eventdetails.css";
import ArtistInfo from "./ArtistInfo";

import { BsCart3 } from "react-icons/bs";
import { HiOutlineTicket } from "react-icons/hi";

function EventDetails() {
  const { id } = useParams();

  const [tickets, setCount] = useState(0);

  const [event, setEvent] = useState({});
  const [cost, updateCost] = useState(0);

  let className = "event-ticket-status ";
  let message;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    async function loadEvent() {
      let eventData = {
        artistName: null,
        artistId: null,
        location: null,
        info: null,
        date: null,
        price: null,
        image: null,
        seats: null,
        concertId: null,
        userId: null
      };

      let eventResponse = await fetch("/data/concerts/" + id);
      let eventResult = await eventResponse.json();
      eventData.location = eventResult.location;
      eventData.price = eventResult.price;
      eventData.date = eventResult.date.substring(0, 16);
      eventData.artistId = eventResult.artistId;
      eventData.seats = eventResult.seats;
      eventData.info = eventResult.info;
      eventData.image = eventResult.image;
      eventData.concertId = eventResult.id;

      let artistResponse = await fetch("/data/artists/" + eventData.artistId);
      let artistResult = await artistResponse.json();
      eventData.artistName = artistResult.name;

      let userResponse = await fetch("/data/login");
      let userResult = await userResponse.json();
      eventData.userId = userResult.id

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
    message = "Few tickets left";
  } else if (event.seats === 0) {
    className += "soldout";
    message = "Soldout";
  }

  function addToCart() {
    let shoppingCart = {
          quantity: tickets,
          price: event.price,
          concertId: event.concertId,
          artistName: event.artistName,
          userId: event.userId,
        }
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  }
  return (
    <>
      <div className="event-container">
        <ArtistInfo event={event} />
        <div className="extra-event-info">
          <h1 className="event-header">Eventinformation</h1>
          <p>{event.info}</p>
        </div>

        <span className={className}>{message}</span>
        <section className="tickets-table-container">
          <HiOutlineTicket className="ticket-icons" />
          <p>Standard</p>
          <p> {event.price} SEK</p>

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
        </section>
        <div className="event-buy-ticket">
          <p className="max-tickets">Limit 10 tickets</p>
        </div>
        <div className="cart">
          {tickets > 0 ? (
            <>
              <p>
                {" "}
                <BsCart3 />
              </p>
              <p>
                {tickets} {tickets == 1 ? "ticket" : "tickets"}
              </p>
              <p>{cost} SEK</p>
              <Link
                to="/checkout"
                className="event-buy-ticket-link"
                onClick={addToCart}
              >
                Buy
              </Link>
            </>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </>
  );
}

export default EventDetails;
