import "./checkout.css";
import { useState, useEffect } from "react";
import { GoClock } from "react-icons/go";

function Checkout() {
  const cart = localStorage.getItem("shopping-cart");
  const currentCart = JSON.parse(cart);

  const [tickets, setCount] = useState(currentCart.quantity);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalPrice = currentCart.quantity * currentCart.price;
    setTotalPrice(totalPrice);
  }, []);

  async function checkout(e) {
    e.preventDefault();

    const body = {
      items: [
        {
          artistName: currentCart.artistName,
          date: currentCart.date,
          location: currentCart.location,
          price: currentCart.price,
          quantity: tickets,
        },
      ],
      userId: currentCart.userId,
      concertId: currentCart.concertId,
      seats: currentCart.seats,
      quantity: tickets,
    };

    let response = await fetch("/data/checkout", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let result = await response.json();
    window.location.assign(result.url);
  }

  return (
    <>
      <div className="entire-container">
        <div className="title-container">
          <h1>Checkout</h1>
          <hr />
        </div>
        <div className="form-container">
          <div className="const-container">
            <p>Name</p>
            <p>Location</p>
            <p>Quantity</p>
            <p>Ticket Price</p>
          </div>
          <div className="var-container">
            <p>{currentCart.artistName}</p>
            <p>{currentCart.location}</p>
            <div className="checkout-ticket-selector">
              <button
                disabled={tickets < 1}
                className="quantity-btn"
                onClick={() => setCount(tickets - 1)}
              >
                –
              </button>
              <p>{tickets}</p>
              <button
                disabled={tickets > 9}
                className="quantity-btn"
                onClick={() => setCount(tickets + 1)}
              >
                +
              </button>
            </div>
            <p>{currentCart.price},00 SEK</p>
          </div>
          <div className="concert-info">
            <p>
              {new Date(currentCart.date).toDateString()} |{" "}
              <GoClock className="clock-icon" />{" "}
              {currentCart.date.substring(11, 16)}
            </p>
          </div>
          <div className="sum-container">
            <p></p>
            <p></p>
            <p>Total</p>
            <p>
              <b>{tickets * currentCart.price},00 SEK</b>
            </p>
          </div>
        </div>
        <div className="checkout-btn-container">
          <button
            onClick={checkout}
            className="checkout-btn"
            disabled={tickets == 0}
          >
            Proceed to payment
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;
