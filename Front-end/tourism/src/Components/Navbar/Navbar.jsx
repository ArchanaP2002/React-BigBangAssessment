import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const CustomAppBar = styled(AppBar)({
    backgroundColor: 'transparent', // Set background to transparent
    boxShadow: 'none', // Remove the shadow
    color: 'white', // Set the text color to white
    position: 'absolute', // Add this to position the navbar absolutely
    top: 0, // Position at the top
    zIndex: 2, // Ensure the navbar is above the video
});

const Title = styled(Typography)({
  flexGrow: 1,
});

const NavButton = styled(Button)({
  marginLeft: 16, // Add your desired spacing
});

const Navbar = () => {
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <Title variant="h6" component="div">
          My App
        </Title>
        <NavButton component={Link} to="/" color="inherit">
          Home
        </NavButton>
        <NavButton component={Link} to="/admin-approval" color="inherit">
          Approval
        </NavButton>
        <NavButton component={Link} to="/admin-image-gallary" color="inherit">
          AddGallary
        </NavButton>
        <NavButton component={Link} to="/image-gallary" color="inherit">
          Gallary
        </NavButton>
        <NavButton component={Link} to="/adding-package" color="inherit">
          AddPackage
        </NavButton>
        {/* <NavButton component={Link} to="/add-itinerary/:packageId" color="inherit">
          Itinerary Upload
        </NavButton> */}
        <NavButton component={Link} to="/feedback-form" color="inherit">
          FeedBack
        </NavButton>
        <NavButton component={Link} to="/contact" color="inherit">
          Contact
        </NavButton>
        {/* <NavButton component={Link} to="/itineraryList/:packageId" color="inherit">
          Itineary
        </NavButton> */}
        <NavButton component={Link} to="/login" color="inherit">
          Login/Register
        </NavButton>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;
