import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleRegister = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setErrorMsg('');
    
    try {
      axios
      .post(
        "http://localhost:5000/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then(res => setSuccessMsg(res.data))
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
    }

};
      
 
  // (res) => {
  //   if (res.data === "User already exists") {
  //     setErrorMsg("User already exists, please try again");
  //   } else {
  //     setSuccessMsg("Registration successful, please log in");
  //   }
  // };

  return (
    <div className="jumbotron">
      <h1>Register</h1>
      <span style={{color: 'green'}}>{successMsg}</span>
      <span style={{color: 'red'}}>{errorMsg}</span>
      <div className="form-floating mb-3">
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
          type="email"
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          id="password"
          placeholder="password"
          required
        />
        <label htmlFor="password">Password</label>
      </div>

      <button onClick={handleRegister} className="btn btn-primary">
        Register
      </button>
      <Link to="/">
        <button type="button" className="btn btn-outline-secondary">
          Login
        </button>
      </Link>
    </div>
  );
}
