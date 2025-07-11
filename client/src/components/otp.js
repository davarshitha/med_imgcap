import React, { useState } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const OTP = () => {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email; // Retrieve email from location state

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/verifyOTP", { email, otp })
      .then((response) => {
        if (response.data.status) {
          navigate("/home");
        } else {
          alert("Incorrect OTP. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error verifying OTP. Please try again.");
      });
  };

  const handleResendOTP = () => {
    Axios.post("http://localhost:3000/auth/sendOTP", { email })
      .then((response) => {
        if (response.data.status) {
          alert("New OTP sent successfully.");
        } else {
          alert("Failed to resend OTP. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error resending OTP. Please try again.");
      });
  };

  return (
    <div className="sign-up-container">
      <h2>Enter OTP</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label htmlFor="otp">Enter OTP:</label>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />

        <button type="submit">Submit</button>
        <p>
          Didn't receive OTP?{" "}
          <button type="button" onClick={handleResendOTP}>
            Resend OTP
          </button>
        </p>
      </form>
    </div>
  );
};

export default OTP;
