import { Navigate } from "react-router-dom";
import HomePage from "../../pages/HomePage";

const HomeRoute = () => {
  return localStorage.getItem("authToken") ? (
    <Navigate to="/store" />
  ) : (
    <HomePage />
  );
};

export default HomeRoute;
