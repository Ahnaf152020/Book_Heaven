// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const signUp = async (userData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, userData);
      setSnackbar({ open: true, message: response.data.message, severity: 'success' });
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signIn = async (credentials) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, credentials);
      const { token, userId } = response.data;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userId', userId);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ userId });
      setSnackbar({ open: true, message: response.data.message, severity: 'success' });
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setSnackbar({ open: true, message: 'Logged out successfully', severity: 'info' });
  };

  const handleAuthError = (error) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    if (error.response) {
      // The request was made and the server responded with a status code
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'Network Error. Please try again later.';
    }
    setError(errorMessage);
    setSnackbar({ open: true, message: errorMessage, severity: 'error' });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    if (accessToken && userId) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setUser({ userId });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, error, setError }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
