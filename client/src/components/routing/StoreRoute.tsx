import { Navigate } from "react-router-dom";
import Store from "../../pages/Store";

const StoreRoute = () => {
  return localStorage.getItem("authToken") ? (
    <Store />
  ) : (
    <Navigate to="/" />
  );
};

export default StoreRoute;
