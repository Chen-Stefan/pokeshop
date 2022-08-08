import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function landing() {
  const logout = () => {
    axios
      .get("http://localhost:5000/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === "Logout successful") {
          window.location.href = "/";
        }
      });
  };

  return (
    <div>
      <div style={{ marginLeft: "35px" }}>Welcome to the Pokemon shop </div>

      <button onClick={logout} className="btn btn-secondary float-end">
        Log out
      </button>
    </div>
  );
}

{
  /* <b style= {{ fontSize: "x-large", color: "royalblue" }}></b> */
}
