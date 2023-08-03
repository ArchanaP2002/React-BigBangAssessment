import jwt_decode from 'jwt-decode'; 
import React, { useState } from 'react';
import { Button, Typography, TextField, Grid, RadioGroup, FormControlLabel,  MenuItem  } from '@mui/material';
import axios from 'axios';
import Tourismimage from '../../Images/Tourismimg.avif';
import './Register.css';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    emailId: '',
    password: '',
    role: '',  
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

    // Special handling for the "role" field
    // if (name === 'role') {
    //   if (value === 'agent') {
    //     setIsAgentApproved(false); // Set isAgentApproved to false when role is "agent"
    //   }
    // }

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
        const response = await axios.post(
          'https://localhost:7228/api/Users/register',
          {
            ...formData,
            status: isAgentApproved ? 'Approved' : 'Pending',
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
  
        const encodedToken = response.data.encodedToken;
        localStorage.setItem('authToken', encodedToken);
        const decodedToken = jwt_decode(encodedToken);
        console.log('Decoded Token:', decodedToken);
        console.log('Encodede', encodedToken);
  
        return { encodedToken, decodedToken };
      } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
      }
    }
  };
  
  

  const validateForm = () => {
    // // Reset error messages
    // setUserNameError('');
    // setEmailError('');
    // setPasswordError('');
    // setAddressError('');
    // setPhoneNumberError('');
    // setIdProofError('');

    let isValid = true;

    // Username validation
    // if (formData.userName.trim() === '') {
    //   setUserNameError('Username is required');
    //   setIsNameValid(false);
    //   isValid = false;
    // } else if (!/^[A-Za-z\s]+$/.test(formData.userName)) {
    //   setUserNameError('Name should only contain characters');
    //   setIsNameValid(false);
    //   isValid = false;
    // }

    // // Email validation
    // if (formData.emailId.trim() === '') {
    //   setEmailError('Email is required');
    //   isValid = false;
    // } else if (!formData.emailId.includes('@')) {
    //   setEmailError('Invalid email format');
    //   isValid = false;
    // }

    // // Password validation
    // if (formData.password.trim() === '') {
    //   setPasswordError('Password is required');
    //   isValid = false;
    // }

    // // Address validation
    // if (formData.address.trim() === '') {
    //   setAddressError('Address is required');
    //   isValid = false;
    // }

    // // Phone Number validation
    // if (formData.phoneNumber.trim() === '') {
    //   setPhoneNumberError('Phone Number is required');
    //   isValid = false;
    // }

    // // ID Proof validation
    // if (formData.id_Proof.trim() === '') {
    //   setIdProofError('ID Proof is required');
    //   isValid = false;
    // }

    return isValid;
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <img src={Tourismimage} alt="Tourism" className="tourism-image" />

      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom className="registration-header">
          User Registration
        </Typography>
        <div className="registration-form">
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Username"
                id='texfield'
                name="userName"
                value={formData.userName}
                onChange={handleChange}
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
            </div>
            <div>
              <TextField
                label="Email"
                name="emailId"
                id='texfield'
                type="email"
                value={formData.emailId}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                error={Boolean(emailError)}
                helperText={emailError}
                InputProps={{
                  classes: {
                    root: 'MuiOutlinedInput-root',
                    input: 'MuiOutlinedInput-input',
                    focused: 'MuiOutlinedInput-focused',
                    notchedOutline: 'MuiOutlinedInput-notchedOutline',
                  },
                }}
              />
            </div>
            <div>
              <TextField
                label="Password"
                id='texfield'
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                error={Boolean(passwordError)}
                helperText={passwordError}
                InputProps={{
                  classes: {
                    root: 'MuiOutlinedInput-root',
                    input: 'MuiOutlinedInput-input',
                    focused: 'MuiOutlinedInput-focused',
                    notchedOutline: 'MuiOutlinedInput-notchedOutline',
                  },
                }}
              />
            </div>
            <div>
            <TextField
              label="Role"
              name="role"
              id='texfield'
              select
              value={formData.role} 
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputProps={{
                classes: {
                  root: 'MuiOutlinedInput-root',
                  input: 'MuiOutlinedInput-input',
                  focused: 'MuiOutlinedInput-focused',
                  notchedOutline: 'MuiOutlinedInput-notchedOutline',
                },
              }}
            >
                          <MenuItem value="">
              <em> </em>
            </MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="agent">Agent</MenuItem>
            </TextField>
            </div>
            <div>
              <TextField
                label="Address"
                name="address"
                id='texfield'
                value={formData.address}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                error={Boolean(addressError)}
                helperText={addressError}
                InputProps={{
                  classes: {
                    root: 'MuiOutlinedInput-root',
                    input: 'MuiOutlinedInput-input',
                    focused: 'MuiOutlinedInput-focused',
                    notchedOutline: 'MuiOutlinedInput-notchedOutline',
                  },
                }}
              />
            </div>
            <div>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                margin="normal"
                id='texfield'
                variant="outlined"
                required
                error={Boolean(phoneNumberError)}
                helperText={phoneNumberError}
                InputProps={{
                  classes: {
                    root: 'MuiOutlinedInput-root',
                    input: 'MuiOutlinedInput-input',
                    focused: 'MuiOutlinedInput-focused',
                    notchedOutline: 'MuiOutlinedInput-notchedOutline',
                  },
                }}
              />
            </div>
            <div>
              <TextField
                label="ID Proof"
                id='texfield'
                name="id_Proof"
                value={formData.id_Proof}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                error={Boolean(idProofError)}
                helperText={idProofError}
                InputProps={{
                  classes: {
                    root: 'MuiOutlinedInput-root',
                    input: 'MuiOutlinedInput-input',
                    focused: 'MuiOutlinedInput-focused',
                    notchedOutline: 'MuiOutlinedInput-notchedOutline',
                  },
                }}
              />
            </div>
            <div>
              <Button type="submit" variant="contained" color="primary"   >
                Register
              </Button>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegistrationPage;
