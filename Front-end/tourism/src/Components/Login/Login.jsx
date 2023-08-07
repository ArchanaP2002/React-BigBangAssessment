import React, { useState } from 'react';
import { Button, Typography, TextField, Container, Link } from '@mui/material';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
  });
  const navigate = useNavigate();  

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailId) {
      newErrors.emailId = 'Email is required';
    } else if (!isValidEmail(formData.emailId)) {
      newErrors.emailId = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and contain letters, numbers, and special characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-z]+[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return; // Exit early if form validation fails
    }
  
    try {
      const response = await axios.post('https://localhost:7228/api/Users/login', formData);
    
      const encodedToken = response.data;
      const decodedToken = jwt_decode(encodedToken);
    
      // Store the decoded token in local storage
      localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
    
      // Extract user role from the decoded token
      const userRole = decodedToken.role;
    
      console.log('Decoded Token:', decodedToken);
      console.log('Login success:', response.data);
      alert('Login successful! ');
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error.response.data);
    }
    
  };
  

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        User Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="emailId"
          type="email"
          value={formData.emailId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ marginBottom: '20px' }}
          error={Boolean(errors.emailId)}
          helperText={errors.emailId}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ marginBottom: '20px' }}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ padding: '10px 30px', marginBottom: '10px' }}
        >
          Login
        </Button>
        <Typography>
          New user? <Link component={RouterLink} to="/register">Sign Up</Link>
        </Typography>
      </form>
    </Container>
  );
};

export default Login;
