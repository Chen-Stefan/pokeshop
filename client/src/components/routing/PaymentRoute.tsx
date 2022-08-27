import { Navigate } from "react-router-dom";
import StripeContainer from "../StripeContainer";

const PaymentRoute = () => {
  return localStorage.getItem("authToken") ? (
    <StripeContainer />
  ) : (
    <Navigate to="/" />
  );
};

export default PaymentRoute;
