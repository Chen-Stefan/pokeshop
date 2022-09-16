import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Message } from "../Message";
import Store from "../../pages/Store";

const StoreRoute = () => {
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setPaymentMessage("Your order has been placed!");
    }

    if (query.get("canceled")) {
      setPaymentMessage("Order canceled, please try again.");
    }
  }, []);

  return paymentMessage ? (
    <Message paymentMessage={paymentMessage} />
  ) : (
    <Store />
  );
};

export default StoreRoute;
