import React from "react";
import { Link } from "react-router-dom";
import pokeball from "../assets/images/pokeball.webp";

export default function Navbar() {
  return (
    <div className="top-header">
      <div className="logo">
        <Link to="/">
          <img src={pokeball} />
        </Link>
      </div>

      <div>
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/checkout">shopcart</Link>
        </div>
      </div>
    </div>
  );
}
