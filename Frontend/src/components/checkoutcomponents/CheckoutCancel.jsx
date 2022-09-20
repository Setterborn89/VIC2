function CheckoutCancel() {
localStorage.removeItem('shopping-cart');

  return (
    <>
      <h1>Your checkout was cancelled!</h1>
    </>
  );
}

export default CheckoutCancel;
