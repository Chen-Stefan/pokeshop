import axios from "axios";
import { useState, useEffect, FormEvent } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import pikachu from "../assets/images/pikachu.gif";

export default function HomePage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );
      // when we register, we will get a token, store it in localStorage
      localStorage.setItem("authToken", data.token);

      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <div>
        Welcome to My Pokemon shop! This is an online shopping site where you
        can search, view and purchase the Pokemon cards you like. The Pokemon
        data come from the open source RESTful API created by pokemon lovers
        wolrdwide.
      </div>
      <Container>
        <div
          className="jumbotron jumbotron-fluid mt-3 float-end"
          style={{ minWidth: "18rem", marginBottom: "0" }}
        >
          <h2>Pokeshop</h2>
        </div>
        <div className="login-screen">
        <form onSubmit={handleLogin} className="login-screen__form">
         
          {error && <span className="error-message"> {error} </span>}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              id="email"
              placeholder="Enter email address"
              value={email}
              tabIndex={1}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password:&nbsp;
              <Link
                to="/forgotpassword"
                className="login-screen__forgotpassword"
                tabIndex={4}
              >
                Forgot Password?
              </Link>
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
              placeholder="Enter password"
              value={password}
              tabIndex={2}
            />
          </div>

          <button type="submit" className="btn btn-outline-warning" tabIndex={3}>
            Login
          </button>

          <span className="login-screen__subtext">
            Do not have an account? <Link to="/register">Sign up</Link>
          </span>
        </form>
        </div>
        <div className="d-flex justify-content-center m-3">
          <img src={pikachu} style={{ width: "400px", height: "280px" }} />
        </div>
      </Container>
    </>
  );
}
