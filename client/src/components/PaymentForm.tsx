import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { FormEvent, useState } from "react";
import pikachu from "../assets/images/pikachu.gif";

 // headers: {
          //   "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          // },

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
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm({ amount }: any) {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { clearCart } = useShoppingCart();
  const stripe = useStripe();
  const elements = useElements();
  const paymentAmount = amount.paymentAmount;

  const handlePaymentSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { err, paymentMethod }: any = await stripe?.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement)!
    });

    if (!err) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:5000/api/payment", {
          amount: Math.round(paymentAmount * 100),
          id,
        });

        if (response.data.success) {
          console.log("Payment Successful");
          setSuccess(true);
          clearCart()
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        setError(error.response.data.errorMessage);
        setTimeout(() => {
          setError("");
        }, 5000);
        
      }
    } else {
      console.log(err.message);
    }
  };

  return !success ? (
    <div className="text-center">
      {error && (
        <span className="alert alert-danger p-3" role="alert">
          {error}
        </span>
      )}
      <form onSubmit={handlePaymentSubmit} className="mt-5">
        <fieldset className="FormGroup w-50 mx-auto">
          <div className="FormRow">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <button
          style={{ width: "10%", marginBottom: "100px" }}
          className="checkout mt-5 mx-auto"
        >
          Place Order
        </button>
      </form>
    </div>
  ) : (
    <div>
      <h3 className="text-center mt-5">Your order has been placed!</h3>
      <h5 className="text-center" style={{color: "green"}}>We will notify you when your order has shipped</h5>

      <div className="d-flex justify-content-center m-5">
        <img src={pikachu} style={{ width: "350px", height: "280px" }} />
      </div>
    </div>
  );
}
