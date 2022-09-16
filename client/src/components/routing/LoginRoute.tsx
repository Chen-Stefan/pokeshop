import { Navigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";

const LoginRoute = () => {
  return localStorage.getItem("authToken") ? (
    <Navigate to="/store" />
  ) : (
    <LoginPage />
  );
};

export default LoginRoute;
