function CheckoutSuccess() {
  localStorage.removeItem("shopping-cart");

  return (
    <>
      <h1>Your payment was accepted, your checkout is completed</h1>
      <p></p>
    </>
  );
}

export default CheckoutSuccess;
