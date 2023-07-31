import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
} from '@mui/material';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login data:', formData);

    try {
       const { emailId, password } = formData;
      const response = await axios.post('https://localhost:7228/api/Users/login', { emailId, password });

      const token = response.data;

       localStorage.setItem('token', token);

       console.log('Token:', token);
    } catch (error) {
      console.error('Error during login:', error.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
