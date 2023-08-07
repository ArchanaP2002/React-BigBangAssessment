import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, allowedRoles, userRole, ...rest }) {
  if (!userRole) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    // User does not have the required role, redirect to home or a suitable page
    return <Navigate to="/home" />;
  }

  // User has the required role, render the component
  return <Route {...rest} element={<Component />} />;
}

export default PrivateRoute;
