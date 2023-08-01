import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegistrationPage from './Components/Register/Register';
import LoginPage from './Components/Login/Login';
import AdminApprovalPage from './Components/AdminApproval/AdminApprovalPage';
import HomePage from './Components/Landing/Home';

function App() {
  return (
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
        </ul>
      </nav> */}
      <HomePage />
      {/* <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-approval" element={<AdminApprovalPage />} />
        <Route path='/Landing' element={<HomePage />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
