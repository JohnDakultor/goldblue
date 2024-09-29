import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; 
import { TextField, Button, Typography, Container, Box, InputAdornment, IconButton } from '@mui/material';
import { resetPassword } from '../services/Axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 
  const navigate = useNavigate(); 

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [timer, setTimer] = useState(2);

  // Function to validate password strength
  const isPasswordValid = (password) => {
    const capitalLetterRegex = /[A-Z]/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!capitalLetterRegex.test(password)) {
      return 'Password must include at least one uppercase letter.';
    }

    if (!specialCharacterRegex.test(password)) {
      return 'Password must include at least one special character.';
    }

    return ''; // Return empty if validation passes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Validate password strength
    const validationError = isPasswordValid(newPassword);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
await resetPassword(token, newPassword);
        setSuccessMessage('Password reset successfully!');
        setErrorMessage(''); // Clear any previous error
        setIsCountdownActive(true); // Start the countdown
      
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  // useEffect to handle the countdown and navigation
  useEffect(() => {
    if (isCountdownActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      navigate('/login'); // Navigate to login after countdown
    }
  }, [isCountdownActive, timer, navigate]);

  return (
    <Container maxWidth="xs" sx={{ mt: 20, padding: '20px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Reset Password</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }} disabled={isCountdownActive}>
            {isCountdownActive ? `Redirecting in ${timer}...` : 'Reset Password'}
          </Button>
        </Box>

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}

        {successMessage && (
          <Typography variant="body2"  sx={{ mt: 2, color: 'green' }}>
            {successMessage}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ResetPassword;
