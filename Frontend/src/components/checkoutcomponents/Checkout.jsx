import "./checkout.css";
import { useState, useEffect } from "react";

function Checkout() {
  const cart = localStorage.getItem("shopping-cart");
  const currentCart = JSON.parse(cart);

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
          price: currentCart.price,
          quantity: currentCart.quantity,
        },
      ],
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
      <div className="checkout">
        <form onSubmit={checkout}>
          <div id="#checkout-session">
            <h2 className="checkout-title">Checkout</h2>
            <div className="checkout-container">
              <p className="checkout-item th">Name</p>
              <p className="checkout-item th">Quantity</p>
              <p className="checkout-item th">Ticket price</p>
              <p className="checkout-item td">{currentCart.artistName}</p>
              <p className="checkout-item td">{currentCart.quantity}</p>
              <p className="checkout-item td">{currentCart.price} kr</p>
              <p className="checkout-item-total sum ">Total(SEK)</p>
              <p className="checkout-item sum totalPrice">{totalPrice} kr</p>
            </div>
            <div className="checkout-btn-container">
            <button
              className="checkout-btn"
              type="submit"
              disabled={currentCart == null}
            >
              Pay
            </button>
          </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Checkout;
