import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  IconButton,
  Divider,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import authService from "../services/Axios";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value.replace(/[^a-zA-Z]/g, ""));
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value.replace(/[^a-zA-Z]/g, ""));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasSpecialChar;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (!isPasswordValid(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter and one special character."
      );
      return;
    }

    authService
      .signup(firstName, lastName, email, password)
      .then((response) => {
        console.log(response);
        setSuccess(true);
      })
      .catch((error) => {
        if (
          error.response.status === 400 &&
          error.response.data === "Email already in use"
        ) {
          setErrorMessage("Email already in use");
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        } else {
          console.log(error.message);
          setErrorMessage("Failed to sign up");
        }
      });
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        window.location.href = "/";
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleCloseModal = () => {
    setSuccess(false);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 10,
        backgroundColor: "#f9f9f9",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Sign Up</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoFocus
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleShowPasswordClick} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Box>
      <Modal
        open={success}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={success}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Sign Up Successful
            </Typography>
            <DoneIcon style={{ fontSize: 80, color: "green" }} />
          </Box>
        </Fade>
      </Modal>
      <Typography variant="body1" sx={{ mt: 2, mb: 2, textAlign: "end" }}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          Already have an account?
        </Link>
      </Typography>
    </Container>
  );
}
