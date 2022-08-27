import axios from "axios";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords entered do not match");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/register",
        { username, email, password },
        config
      );
      setSuccess(data.data);

      setTimeout(() => {
        setSuccess("");
      }, 10000);
    } catch (error) {
      // setError(error.message) axios自带的error message: Request failed with Status Code 400

      // error.response.data 是axios碰到错误返回的promise, 对应res.status.json 
      // 就需要使用error.response.data来取得发送的object, 然后再通过key获取error message
      setError(error.response.data.errorMessage);

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register-screen">
      <form onSubmit={handleRegister} className="register-screen__form">
        <h3 className="m-2">Register</h3>
        {success && (
          <span className="alert alert-success p-2 d-flex" role="alert">
            {success}
          </span>
        )}
        {error && (
          <span className="alert alert-danger p-2 d-flex" role="alert">
            {error}
          </span>
        )}
        <div className="form-group m-1">
          <label htmlFor="username" className="small">
            Username:
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            required
          />
        </div>

        <div className="form-group m-1">
          <label htmlFor="email" className="small">
            Email:
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="Enter email address"
            value={email}
            required
          />
        </div>

        <div className="form-group m-1">
          <label htmlFor="password" className="small">
            Password:
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            required
          />
        </div>

        <div className="form-group m-1">
          <label htmlFor="confirmpassword" className="small">
            Confirm Password:
          </label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
            required
            id="confirmpassword"
            placeholder="Confirm password"
            value={confirmPassword}
          />
        </div>
        <button type="submit" className="btn btn-warning w-100 mt-2">
          Register
        </button>
        <span className="register-screen__subtext">
          Alredy have an account? <Link to="/">Login</Link>
        </span>
      </form>
    </div>
  );
}
