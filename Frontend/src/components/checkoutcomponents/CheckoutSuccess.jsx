function CheckoutSuccess() {

    async function getCheckoutResult() {
        let response = await fetch("/data/checkout");
        console.log("response", response);
        let result = await response.json();
        console.log("result", result);
    }
  return (
    <>
      <h1>Your payment was accepted, your checkout is completed</h1>
      <p>{getCheckoutResult()}</p>
    </>
  );
}

export default CheckoutSuccess;