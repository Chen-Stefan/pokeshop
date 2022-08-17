import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { FormEvent, useState } from "react";

const CARD_OPTIONS: any = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { error, paymentMethod }: any = await stripe?.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement)!,
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:5000/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("Payment Successful");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return ( 
  <>
    {!success ? 
    <form onSubmit={handlePaymentSubmit} className='mt-5'>
      <fieldset className="FormGroup w-50 mx-auto">
        <div className="FormRow">
          <CardElement options={CARD_OPTIONS} />
        </div>
      </fieldset>
      <button style={{width: "10%", marginBottom:"100px"}} className="checkout mt-5 mx-auto">Pay</button>
    </form> : 
    <div>
      <h2>Order has been placed, thank you!</h2>
      </div>}
  </>
  )
 ;
}
