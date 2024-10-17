import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handelSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/Signup", {
      username,
      email,
      password,
      phone,
    })
      .then((response) => {
        console.log("Signup response:", response); // Check response from server
        if (response.data.status) {
          console.log("Signup successful!"); // Log successful signup
          navigate("/otp", { state: { email } });
        }
      })
      .catch((err) => {
        console.log("Signup error:", err); // Log any errors
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="sign-up-container">
      <h2>Sign up</h2>
      <form className="sign-up-form" onSubmit={handelSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <div className="password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
            className="password-toggle-btn"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
          </div>

        <label htmlFor="phone">Mobile Number:</label>
        <input
          type="phone"
          autoComplete="phone"
          placeholder="Phone number"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">Signup</button>
        <p>
          already have an account? <Link to="/">login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
