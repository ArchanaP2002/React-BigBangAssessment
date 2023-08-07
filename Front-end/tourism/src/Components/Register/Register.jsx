import React, { useState } from 'react';
import { Button, Typography, TextField, Grid, MenuItem } from '@mui/material';
import axios from 'axios';
import Tourismimage from '../../Images/Tourismimg.avif';
import './Register.css';
import { useNavigate } from 'react-router-dom';  


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
  const navigate = useNavigate();  

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

    if (name === 'password') {
      setPasswordError('');
    }

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

    if (validateForm()) {
      try {
        const response = await axios.post(
          'https://localhost:7228/api/Users/register',
          {
            ...formData,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        const encodedToken = response.data;
        localStorage.setItem('authToken', encodedToken);
        console.log('Encoded Token:', encodedToken);
        if (formData.role === 'user') {
          alert('Registration successful! Click OK to go to the home page.');
          navigate('/home');  
        } else if (formData.role === 'agent') {
          alert('Registration successful! Wait for admin approval.');
          navigate('/login');  
        }
            } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (formData.userName.trim() === '') {
      setUserNameError('Username is required');
      setIsNameValid(false);
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.userName)) {
      setUserNameError('Name should only contain characters');
      setIsNameValid(false);
      isValid = false;
    }

    if (formData.emailId.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(formData.emailId)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (formData.password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!isValidPassword(formData.password)) {
      setPasswordError('Password must be at least 8 characters and contain letters, numbers, and special characters');
      isValid = false;
    }

    if (formData.address.trim() === '') {
      setAddressError('Address is required');
      isValid = false;
    }

    if (formData.phoneNumber.trim() === '') {
      setPhoneNumberError('Phone Number is required');
      isValid = false;
    }

    if (formData.id_Proof.trim() === '') {
      setIdProofError('ID Proof is required');
      isValid = false;
    }

    return isValid;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordPattern.test(password);
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
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button type="submit" variant="contained" color="primary">
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
