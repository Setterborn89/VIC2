import { useEffect } from "react";

function CheckoutSuccess() {
  localStorage.removeItem("shopping-cart");
  useEffect(() => {
    async function loadData() {
      let response = await fetch("/data/checkout");
      console.log(response)
    }
    loadData();
}, []);

  return (
    <>
      <h1>Your payment was accepted, your checkout is completed</h1>
      <p></p>
    </>
  );
}

export default CheckoutSuccess;
