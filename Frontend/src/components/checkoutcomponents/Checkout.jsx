function Checkout() {
  async function checkout(e) {
    e.preventDefault();
    const cart = localStorage.getItem("shopping-cart");
    const testcart = JSON.parse(cart);
    console.log(testcart.artistName);
    console.log(JSON.parse(cart));
    // stripe checkout body
    const body = {
      items: [
        {
          artistName: testcart.artistName,
          price: testcart.price,
          quantity: cart.quantity,
        },
      ],
    };

    console.log(body);
    let response = await fetch("/data/checkout", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log("response", response);
    let result = await response.json();
    console.log("result", result);
    if (result.url) {
      console.log(result.url);
      // $("#link-to-stripe").attr("href", result.url).show();
    }
  }

  return (
    <>
      <form onSubmit={checkout}>
        <h2>Form values for one checkout item</h2>
        <label>
          Description
          <input type="text" id="description" />
        </label>
        <label>
          Price
          <input type="text" id="price" />
        </label>
        <label>
          Quantity
          <input type="text" id="quantity" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Checkout;
