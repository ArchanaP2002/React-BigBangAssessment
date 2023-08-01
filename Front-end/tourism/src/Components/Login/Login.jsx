import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7228/api/Users/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Login success:', response.data); // The token will be printed in the console
    } catch (error) {
      console.error('Error during login:', error.response.data);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        User Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="emailId" // Use 'emailId' instead of 'email'
          type="email"
          value={formData.emailId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
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
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
