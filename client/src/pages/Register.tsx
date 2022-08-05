import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="jumbotron">
      <h1>Register</h1>
      <form action="">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="username"
            required
          />
          <label htmlFor="username">Username</label>
        </div>
      {/* <input value = 什么> */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <Link to="/">
          <button type="button" className="btn btn-outline-secondary">
            Login
          </button>
        </Link>
      </form>
    </div>
  );
}
