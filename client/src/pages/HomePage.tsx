import axios from "axios";
import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import pikachuRunning from "../assets/images/pikachuRunning.gif";
import fireworks from "../assets/images/fireworks.png";
import Footer from "../components/Footer";

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

      navigate("/store");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <div className="mt-3 mx-auto fs-5" style={{ width: "70%" }}>
        <span>
          Welcome to my Pokémon shop <img src={fireworks} alt="fireworkIcon" />
          This is an online shopping site where you can explore and purchase
          your favorite pokemon cards. The Pokémon data are gathered from
          pokeapi.co, an open source RESTful API.
          <img
            src={pikachuRunning}
            alt="pikachuRunningGif"
            style={{ width: "60px", height: "48px", verticalAlign: "middle" }}
          />
        </span>
      </div>

      <div>
        <h2 className="title m-4 fs-5">Pokeshop</h2>

        <div className="login-screen">
          <form onSubmit={handleLogin} className="login-screen__form">
            {error && (
              <span className="alert alert-danger p-2" role="alert">
                {" "}
                {error}{" "}
              </span>
            )}

            <div className="form-group mt-2">
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

            <button
              type="submit"
              className="btn btn-outline-warning w-100"
              tabIndex={3}
            >
              Login
            </button>

            <span className="login-screen__subtext">
              Do not have an account? <Link to="/register">Sign up</Link>
            </span>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
