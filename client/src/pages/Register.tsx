import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="jumbotron">
      <h1>Register</h1>
      <form action="">
        <div className="form-floating mb-3">
          <input
            type="text"
            onChange={e => setUsername(e.target.value)}
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
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
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
