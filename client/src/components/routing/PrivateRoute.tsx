import { Navigate } from "react-router-dom";
// import PrivateScreen from "../screens/PrivateScreen";

const PrivateRoute = () => {
  return localStorage.getItem("authToken") ? (
    null
    // <PrivateScreen />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
