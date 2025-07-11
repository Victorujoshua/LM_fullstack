import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Toast from './components/layout/Toast'; // Import Toast
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ResetPassword from './components/auth/ResetPassword';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css'; // For app-specific styles

// Function to set the default auth token if available
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' }); // Toast state

  const showToast = (message, type = 'info', duration = 3000) => {
    setToast({ message, type });
    // No need for duration here as Toast component handles its own dismissal timeout
    // However, if you wanted App.js to clear it, you could add a timeout here too.
  };

  const dismissToast = () => {
    setToast({ message: '', type: '' });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setAuthToken(storedToken);
      setToken(storedToken);
    }
    // You might want to add a call here to verify the token with the backend
    // For now, we assume if a token exists, it's valid until an API call fails
    setLoading(false);
  }, []);

  const handleSetToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
      setAuthToken(newToken);
    } else {
      localStorage.removeItem('token');
      setAuthToken(null);
    }
  };

  // Configure Axios base URL
  // Make sure your backend is running on port 5000 or adjust accordingly
  // If your frontend and backend are on different domains in production,
  // you'll need to configure CORS on your backend.
  axios.defaults.baseURL = 'http://localhost:5000';


  if (loading) {
    return <div className="text-center mt-20"><p>Loading...</p></div>; // Or a spinner component
  }

  return (
    <Router>
      <Navbar token={token} setToken={handleSetToken} />
      <Toast message={toast.message} type={toast.type} onDismiss={dismissToast} />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setToken={handleSetToken} showToast={showToast} />} />
          <Route path="/signup" element={<Signup setToken={handleSetToken} showToast={showToast} />} />
          <Route path="/reset-password" element={<ResetPassword showToast={showToast} />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute token={token}>
                <Dashboard showToast={showToast} />
              </PrivateRoute>
            }
          />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
