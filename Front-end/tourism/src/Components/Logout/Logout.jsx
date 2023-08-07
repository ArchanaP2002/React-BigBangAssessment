import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from local storage to log the user out
    localStorage.removeItem('authToken');
    // Redirect to the login page after logout
    navigate('/login');
  }, [navigate]);

  return (
    <Button
      variant="contained"
      color="secondary"
      style={{ padding: '10px 30px' }}
      onClick={() => navigate('/logout')} // Redirect to the Logout route
    >
      Logout
    </Button>
  );
};

export default Logout;
