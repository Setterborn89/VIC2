// stripe
const Stripe = require("stripe");

// stripe.com api secret key, https://dashboard.stripe.com/test/apikeys
const stripe = new Stripe(
  "sk_test_51LiFyXCj7XCjxXPhOvz60hhpizeaFkd7jKptDxiZnrCxpCVzmQ2Ko6gCCKrtMxC1YrWVFtN41dLbYbv6ubmadtoX00FFxPIL2P"
); //

module.exports = function (server, db, host) {
  host = "http://localhost:5173";
  // route to create a checkout session
  server.post("/data/checkout", async (req, res) => {
    // accept a list of payment items, body should be formatted like:

    /*
    {
      "items":[
        {
            "description":"Thing",
            "price": 123,
            "quantity": 2
        },
        {
            "description":"Thang",
            "price": 2345,
            "quantity": 1
        }
      ]
    }
    */

    // Create an item list for Stripe:
    const lineItems = req.body.items.map((item) => {
      return {
        price_data: {
          currency: "sek",
          product_data: {
            name: item.artistName,
          },
          unit_amount: item.price * 100,
        },

        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
        },
      };
    });

    // Create a checkout session with Stripe
    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        // Set a success and cancel URL we will send customers to
        // They are complete urls
        success_url: host + "/checkout-success", // these should be client routes in the react app
        cancel_url: host + "/checkout-cancel",
        metadata: {"userId":req.body.userId,"concertId":req.body.concertId,"seats":req.body.seats,"quantity":req.body.quantity}
      });
      // save current checkout session to user session, so we can check result after
      req.session.checkoutSession = checkoutSession;
      // send user to stripe process,
      // note that you will have to handle the result of the payment after that process,
      // when the user returns to our client
      res.json({ url: checkoutSession.url });
    } catch (e) {
      // If there is an error send it to the client
      res.status(500).json({ error: e.message });
    }
  });

  // route to retrieve checkout session to check result
  server.get("/data/checkout", async (req, res) => {
    try {
      const checkoutSession = await stripe.checkout.sessions.retrieve(req.session.checkoutSession.id)
      let updatedSeats=checkoutSession.metadata.seats-checkoutSession.metadata.quantity
      db
        .prepare("INSERT INTO tickets (id, concertId, userId, used) VALUES(?,?,?,?)")
        .run([checkoutSession.id, checkoutSession.metadata.concertId, checkoutSession.metadata.userId, "0"]);
      db
        .prepare("UPDATE concerts SET seats = ? WHERE id = ?")
        .run([updatedSeats, checkoutSession.metadata.concertId]);
      res.json({ checkoutSession: checkoutSession });
      
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
};