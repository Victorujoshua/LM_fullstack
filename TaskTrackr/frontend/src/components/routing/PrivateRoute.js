import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ token, children }) => {
  if (!token) {
    // Not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }
  return children; // Authenticated, render the child components
};

export default PrivateRoute;
