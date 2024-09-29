import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/Axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setSuccessMessage(""); // Clear success message when email changes
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start the countdown immediately on button click
    startTimer();

    if (!isEmailValid(email)) {
      return;
    }

    try {
      await forgotPassword(email);
      // Set the success message
      setSuccessMessage("Password reset link sent. Check your email.");
    } catch (err) {
      console.error("Error sending password reset link:", err);
      // Handle error (optional)
    }
  };

  const startTimer = () => {
    setIsTimerActive(true);
    setTimer(120); // Set the countdown timer to 120 seconds
  };

  // Handle the countdown logic using useEffect
  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      // Clean up the interval when the timer reaches 0
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsTimerActive(false); // Re-enable the button after countdown
    }
  }, [timer, isTimerActive]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 20,
        backgroundColor: "#f9f9f9",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Forgot Password
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
          Enter your email address and we'll send you a link to reset your password.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isTimerActive} // Disable button while countdown is active
          >
            {isTimerActive ? `Resend in ${timer} seconds` : "Send Reset Link"}
          </Button>
        </Box>

        {/* Display success message */}
        {successMessage && (
          <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
            {successMessage}
          </Typography>
        )}

        <Link to="/login" style={{ textDecoration: "none", marginTop: "16px" }}>
          <Typography variant="body2" color="primary">
            Back to Login
          </Typography>
        </Link>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
