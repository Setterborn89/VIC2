function CheckoutCancel() {

    async function getCheckoutResult() {
        let response = await fetch("/data/checkout");
        console.log("response", response);
        let result = await response.json();
        console.log("result", result);
    }
  return(
  <>
    <h1>Your checkout was cancelled</h1>
  </>
  )
}

export default CheckoutCancel;
