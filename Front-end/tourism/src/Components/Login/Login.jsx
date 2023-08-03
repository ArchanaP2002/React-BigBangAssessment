import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 

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
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const encodedToken = response.data;
      const decodedToken = jwt_decode(encodedToken);
      console.log('Decoded Token:', decodedToken);
      console.log('Login success:', response.data);  
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
          name="emailId" 
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
