import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import api from "../../apis/index";

const stripePromise = loadStripe(
  "pk_test_51IpY5SBtp8twNsKT2ZuHjMRH7Ne40Nkynv7VNRnQINOnkj3N0id7sLRczvclo3krC056AfwOAOLPXuqti5vJL3JI00G0GBEzB7"
);

function Checkout() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  async function handleClick(event) {
    try {
      const stripe = await stripePromise;

      const response = await api.post("/create-checkout-session", {
        buyerId: "60942b57840b1bfed65e7f15",
        products: [
          {
            qtt: 2,
            productId: "60940a71e989c5fb90723bac",
          },
          {
            qtt: 1,
            productId: "60942b21840b1bfed65e7f14",
          },
        ],
      });

      console.log(response.data);

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.error(result.error.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={handleClick}>
        Checkout
      </button>
    </div>
  );
}

export default Checkout;
