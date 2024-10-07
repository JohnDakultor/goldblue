import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../services/Authentication";
import HomeIcon from "@mui/icons-material/Home"; // Replace with your icon or image path
import goldBlue from "../assets/goldblue.png";
import supabaseClient from "../services/SupaBaseClient";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const baseURL = "https://goldblue-backend-z2sk.vercel.app/api";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isEmailValid(email)) {
      setErrorMessage("Invalid Email");
      return;
    }
  
    try {
      const res = await Axios.post(`${baseURL}/login`, {
        email: email,
        password: password,
      });
  
      if (res.data.auth === true) {
        localStorage.setItem('jwt', res.data.token); // Save JWT in local storage
        auth.login(res.data.result); // Log in with user sent from Express
  
        if (email === 'goldbluecorpsol@gmail.com') {
          navigate('/admin', { replace: true }); // Redirect to admin panel
        } else {
          navigate('/dashboard', { replace: true }); // Redirect to user dashboard
        }
      } else {
        setErrorMessage("Invalid password");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Invalid password");
    }


  };

 
  return (
    <div className="login-page">
      <IconButton
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          bgcolor: "transparent",
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
        onClick={() => navigate('/')}
      >
        <img
          src={goldBlue}
          alt="GoldBlue"
          style={{ height: "50px" }}
        />
      </IconButton>

      <Container
        maxWidth="xs"
        sx={{
          mt: 20,
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Login</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPasswordClick} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Forgot Password Link */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 1,
                mb: 1,
              }}
            >
              <Link to="/forgotpassword" style={{ textDecoration: "none", color: "#1976d2" }}>
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Login
            </Button>

            {errorMessage && (
              <Typography variant="body2" color="error">
                {errorMessage}
              </Typography>
            )}

          </Box>

          <Typography variant="body1" sx={{ mt: 2, ml: 20, color: "black" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
