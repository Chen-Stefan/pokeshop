import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("")
   
  const login = () => {
    axios
      .post(
        "http://localhost:5000/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data === "Authentication Successful") {
          window.location.href = "/landing";
        } else {
          
        }
      });
  };

  return (
    <>
      <div>
        Welcome to the Pokemon shop! This is an online shopping site where you
        can search, view and purchase the Pokemon cards you like. The Pokemon
        data come from the open source RESTful API created by pokemon lovers
        wolrdwide.
      </div>
      <Container>
        <div className="row mt-5">
          <div className="col">
            <div
              className="jumbotron jumbotron-fluid mt-3"
              style={{ minWidth: "18rem", marginBottom: "0" }}
            >
              <div className="container">
                <h1 className="my-2 mx-4">Pokeshop</h1>
                <p className="lead mx-4 mt-4">
                  Gather your favorite Pokemon cards
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="jumbotron pt-3 mt-3" style={{ minWidth: "18rem" }}>
              {/* Login Error */}
                <div className="form-floating my-3">
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    id="username"
                    placeholder="username"
                    required
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="password"
                    placeholder="password"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button
                  onClick={login}
                  style={{ backgroundColor: "#350661" }}
                  className="btn btn-primary"
                >
                  Login
                </button>
                <Link to="/register">
                  <button type="button" className="btn btn-outline-primary">
                    Register
                  </button>
                </Link>
              {/* <span id="error-message"></span> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
