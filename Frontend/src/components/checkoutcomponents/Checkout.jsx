import "./checkout.css";
import { useState, useEffect } from "react";

function Checkout() {
  const cart = localStorage.getItem("shopping-cart");
  const currentCart = JSON.parse(cart);

  const [tickets, setCount] = useState(0);
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
          quantity: currentCart.quantity,
        },
      ],
      userId: currentCart.userId,
      concertId: currentCart.concertId,
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
        <form onSubmit={checkout}>
          <div className="title-container">
            <h1>Checkout</h1>
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
              <div className="ticket-selector">
                <button
                  disabled={currentCart.quantity < 1}
                  className="minus-btn"
                  id="minus-btn"
                  onClick={() => setCount(tickets - 1)}
                >
                  -
                </button>
                <p>{currentCart.quantity}</p>

                <button
                  disabled={currentCart.quantity > 9}
                  className="plus-btn"
                  onClick={() => setCount(tickets + 1)}
                >
                  +
                </button>
              </div>
              <p>{currentCart.price},00 SEK</p>
            </div>
            <div className="concert-info">
              <p>Monday September 26th | 20:30</p>
            </div>
            <div className="sum-container">
              <p></p>
              <p></p>
              <p>Total</p>
              <p>
                <b>{totalPrice},00 SEK</b>
              </p>
            </div>
          </div>
          <div className="checkout-btn-container">
            <button
              type="submit"
              className="checkout-btn"
              disabled={currentCart == null}
            >
              Proceed to payment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Checkout;
