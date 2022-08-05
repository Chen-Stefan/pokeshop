import { useRef, useState, useEffect } from "react";

export default function Register() {
  return (
    <div className="jumbotron">
      <h1>Register</h1>
      <form action="/user/register" method="post">
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

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        {/* input value= 什么 */}
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="password"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <a href="/" className="btn btn-outline-secondary" role="button">
        Login
      </a>
    </div>
  );
}
