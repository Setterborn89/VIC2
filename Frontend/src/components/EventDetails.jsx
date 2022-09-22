import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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
        sampleMusic: null,
        userId: null,
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
      eventData.sampleMusic = eventResult.sampleMusic;

      let artistResponse = await fetch("/data/artists/" + eventData.artistId);
      let artistResult = await artistResponse.json();
      eventData.artistName = artistResult.name;

      let userResponse = await fetch("/data/login");
      let userResult = await userResponse.json();
      eventData.userId = userResult.id;

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
    message = "SOLD OUT";
  }

  function addToCart() {
    let shoppingCart = {
      quantity: tickets,
      price: event.price,
      date: event.date,
      location: event.location,
      concertId: event.concertId,
      artistName: event.artistName,
      userId: event.userId,
      seats: event.seats
    };
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
          <HiOutlineTicket className="ticket-icon" />
          <p>Standard</p>
          <p> {event.price} SEK</p>
          <div className="ticket-selector">
            <button
              disabled={tickets < 1 || event.seats == 0}
              className="quantity-btn"
              id="minus-btn"
              onClick={() => setCount(tickets - 1)}
            >
              –
            </button>
            <p>{tickets}</p>

            <button
              disabled={tickets > 9 || event.seats == 0}
              className="quantity-btn"
              onClick={() => setCount(tickets + 1)}
            >
              +
            </button>
          </div>
          <div className="event-buy-ticket">
            <p className="max-tickets">10 ticket limit</p>
          </div>
        </section>
        {tickets > 0 ? (
          <div className="shoppingcart-next">
              <Link
                disabled={event.seats == 0}
                className="continue-checkout-btn"
                to="/checkout"
                onClick={addToCart}
              >
                <span className="btn-span">Cart:</span>
                <span className="btn-span">
                  <BsCart3 />
                </span>
                <span className="btn-span">{cost} SEK</span>
              </Link>
          </div>
        ) : (
          <div className="shoppingcart-next">
            <button className="continue-checkout-btn">
              <span>Cart: </span>
              <span className="hidden">
                <BsCart3 /> Empty
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default EventDetails;
