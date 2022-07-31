import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const logo = require('../assets/images/pokeball.webp');
  
  return (
    <div className="top-header">
      <div className="logo">
        <Link to="/">
          <img src="/images/pokeball.webp" />
        </Link>
      </div>

      <nav>
        <div className="menu">
          <ul>
            <li className="active">
              <a href="/landing">Home</a>
            </li>
            <li>
              <a href="/search.html">Search</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/game.html">Shop</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
