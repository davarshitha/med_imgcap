import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handelSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/", {
      email,
      password,
    })
      .then((response) => {
        console.log("Login response:", response); // Check response from server
        if (response.data.status) {
          console.log("Login successful!"); // Log successful login
          navigate("/home");
        } else {
          setShowPopup(true); // Set state to show popup for user not registered
        }
      })
      .catch((err) => {
        console.log("Login error:", err); // Log any errors
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="sign-up-container">
      <h2>Login</h2>
      <form className="sign-up-form" onSubmit={handelSubmit}>
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

        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/Signup">Signup</Link>
        </p>
      </form>

      {/* Popup message */}
      {showPopup && (
        <div className="popup">
          <p>User not registered</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Login;
