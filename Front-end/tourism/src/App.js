import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegistrationPage from './Components/Register/Register';
import LoginPage from './Components/Login/Login';
import AdminApprovalPage from './Components/AdminApproval/AdminApprovalPage';
import HomePage from './Components/Landing/Home';
import Navbar from './Components/Navbar/Navbar';
import ImageGallery from './Components/ImageGallary/ImageGallary';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Customize the primary color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      {/* <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/admin-approval">Admin Approval</Link>
          </li>
          <li>
            <Link to="/Landing">Home</Link>
          </li>
        </ul>
        
      </nav> */}
      <Navbar />
      {/* <HomePage /> */}
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-approval" element={<AdminApprovalPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/image-gallary' element={<ImageGallery />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
