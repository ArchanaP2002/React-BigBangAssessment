import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
} from '@mui/material';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    emailId: '',
    password: '',
    role:'',
    
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);

    try {
      // Make a POST request to the registration endpoint
      const response = await axios.post('https://localhost:7228/api/Users/register', formData);

      const token = response.data;

      // Do something with the token, e.g., store it in local storage
      localStorage.setItem('token', token);
  
      // Show the token in the console
      console.log('Token:', token);
    }catch (error) {
        console.error('Error during registration:', error.response.data);
      }      
      
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography variant="h5">Register</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Role"
                fullWidth
                variant="outlined"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default RegisterPage;
