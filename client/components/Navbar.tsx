import React from "react";

export default function Navbar() {
  return (
    <div className="top-header">
      <div className="logo">
        <a href="/">
          <img src="/images/pokeball.webp" />
        </a>
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
