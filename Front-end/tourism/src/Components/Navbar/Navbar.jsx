import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const CustomAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  color: 'white',
  position: 'absolute',
  top: 0,
  zIndex: 2,
});

const Title = styled(Typography)({
  flexGrow: 1,
});

const Navbar = ({ decodedToken }) => {
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    // Define navigation items based on user role from decodedToken
    let itemsToShow = [];

    if (decodedToken && decodedToken.role === 'user') {
      itemsToShow = [
        { label: 'Home', path: '/home' },
        { label: 'FeedBack', path: '/feedback-form' },
        { label: 'Gallery', path: '/image-gallary' },
        { label: 'Hotel', path: '/hotel-list' },
      ];
    } else if (decodedToken && decodedToken.role === 'agent') {
      itemsToShow = [
        { label: 'Home', path: '/home' },
        { label: 'AddPackage', path: '/adding-package' },
        { label: 'PostHotel', path: '/hotel-post' },
      ];
    } else if (decodedToken && decodedToken.role === 'admin') {
      itemsToShow = [
        { label: 'AdminApproval', path: '/admin-approval' },
        { label: 'AdminImageGallery', path: '/admin-image-gallary' },
      ];
    }

    setNavItems(itemsToShow);
  }, [decodedToken]);

  return (
    <CustomAppBar position="static">
      <Toolbar>
        <Title variant="h6" component="div">
          My App
        </Title>
        {navItems.map((item) => (
          <Button
            key={item.label}
            component={Link}
            to={item.path}
            color="inherit"
          >
            {item.label}
          </Button>
        ))}
        <Button component={Link} to="/logout" color="inherit">
          Log Out
        </Button>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/system';

// const CustomAppBar = styled(AppBar)({
//     backgroundColor: 'transparent', // Set background to transparent
//     boxShadow: 'none', // Remove the shadow
//     color: 'white', // Set the text color to white
//     position: 'absolute', // Add this to position the navbar absolutely
//     top: 0, // Position at the top
//     zIndex: 2, // Ensure the navbar is above the video
// });

// const Title = styled(Typography)({
//   flexGrow: 1,
// });

// const NavButton = styled(Button)({
//   marginLeft: 16, // Add your desired spacing
// });

// const Navbar = () => {
//   return (
//     <CustomAppBar position="static">
//       <Toolbar>
//         <Title variant="h6" component="div">
//           My App
//         </Title>
//         <NavButton component={Link} to="/home" color="inherit">
//           Home ---
//         </NavButton>
//         <NavButton component={Link} to="/admin-approval" color="inherit">
//           Approval
//         </NavButton>-----
//         <NavButton component={Link} to="/admin-image-gallary" color="inherit">
//           AddGallary
//         </NavButton>=
//         <NavButton component={Link} to="/image-gallary" color="inherit">
//           Gallary=
//         </NavButton>
//         <NavButton component={Link} to="/adding-package" color="inherit">
//           AddPackage=
//         </NavButton>
//         <NavButton component={Link} to="hotel-post" color="inherit">
//           Hotel Post=
//         </NavButton>
//         <NavButton component={Link} to="/feedback-form" color="inherit">
//           FeedBack
//         </NavButton>
//         <NavButton component={Link} to="/contact" color="inherit">
//           Contact
//         </NavButton>
//         <NavButton component={Link} to="hotel-list" color="inherit">
//           Hotel
//         </NavButton>
//         <NavButton component={Link} to="/" color="inherit">
//           Login/Register
//         </NavButton>
//         <NavButton component={Link} to="/logout" color="inherit">
//           Log Out
//         </NavButton>
//       </Toolbar>
//     </CustomAppBar>
//   );
// };

// export default Navbar;
