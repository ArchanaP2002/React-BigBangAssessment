import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import LoginPage from './Components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
      {/* <AddressInformation /> */}
    </BrowserRouter>
  );
}

export default App;
