// RegistrationPage.js
import React, { useState } from 'react';
import { Button, Typography, TextField, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';
import Tourismimage from '../../Images/Tourismimg.avif';
import './Register.css';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    emailId: '',
    password: '',
    role: '', // Set the default role to 'user'
    address: '',
    phoneNumber: '',
    id_Proof: '',
  });

  const [isAgentApproved, setIsAgentApproved] = useState(false);

  // State variables for input field validation
  const [userNameError, setUserNameError] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [idProofError, setIdProofError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate name field
    if (name === 'userName') {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        setUserNameError('Name should only contain characters');
        setIsNameValid(false);
      } else {
        setUserNameError('');
        setIsNameValid(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input fields before submitting the form
    if (validateForm()) {
      try {
        const response = await axios.post('https://localhost:7228/api/Users/register', {
          ...formData,
          status: isAgentApproved ? 'Approved' : 'Pending',
        });
        console.log('Registration success:', response.data);
      } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
      }
    }
  };

  const validateForm = () => {
    // Reset error messages
    setUserNameError('');
    setEmailError('');
    setPasswordError('');
    setAddressError('');
    setPhoneNumberError('');
    setIdProofError('');

    let isValid = true;

    // Username validation
    if (formData.userName.trim() === '') {
      setUserNameError('Username is required');
      setIsNameValid(false);
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.userName)) {
      setUserNameError('Name should only contain characters');
      setIsNameValid(false);
      isValid = false;
    }

    // Email validation
    if (formData.emailId.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    } else if (!formData.emailId.includes('@')) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    // Password validation
    if (formData.password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    }

    // Address validation
    if (formData.address.trim() === '') {
      setAddressError('Address is required');
      isValid = false;
    }

    // Phone Number validation
    if (formData.phoneNumber.trim() === '') {
      setPhoneNumberError('Phone Number is required');
      isValid = false;
    }

    // ID Proof validation
    if (formData.id_Proof.trim() === '') {
      setIdProofError('ID Proof is required');
      isValid = false;
    }

    return isValid;
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom className="registration-header">
          <img src={Tourismimage} alt="Tourism" className="tourism-image" />
          User Registration
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <div className="registration-form">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!isNameValid}
              helperText={!isNameValid ? userNameError : ''}
              InputProps={{
                classes: {
                  root: 'MuiOutlinedInput-root',
                  input: 'MuiOutlinedInput-input',
                  focused: 'MuiOutlinedInput-focused',
                  notchedOutline: 'MuiOutlinedInput-notchedOutline',
                },
              }}
            />

            <TextField
              label="Email"
              name="emailId"
              type="email"
              value={formData.emailId}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              error={Boolean(emailError)}
              helperText={emailError}
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
              required
              error={Boolean(passwordError)}
              helperText={passwordError}
            />

            <RadioGroup
              aria-label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{ marginBottom: '16px' }}
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel value="agent" control={<Radio />} label="Agent" />
            </RadioGroup>

            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              error={Boolean(addressError)}
              helperText={addressError}
            />

            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              error={Boolean(phoneNumberError)}
              helperText={phoneNumberError}
            />

            <TextField
              label="ID Proof"
              name="id_Proof"
              value={formData.id_Proof}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              error={Boolean(idProofError)}
              helperText={idProofError}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegistrationPage;
