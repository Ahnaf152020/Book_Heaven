import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  // Create Axios instance
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  // Request interceptor to attach the token to every request
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle token refresh
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent infinite loop
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await api.post('/refresh-token', { refreshToken });
          const { accessToken } = response.data;

          localStorage.setItem('accessToken', accessToken);
          api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
          return api(originalRequest); // Retry original request
        } catch (refreshError) {
          signOut(); // Sign out if refreshing the token fails
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  // Sign up function
  const signUp = async (userData) => {
    try {
      const response = await api.post('/sign-up', userData);
      setSnackbar({ open: true, message: response.data.message, severity: 'success' });
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Sign in function
  const signIn = async (credentials) => {
    try {
      // Sending sign-in request to the backend with the provided credentials
      const response = await api.post('/sign-in', credentials);
  
      // Log the entire response to check for the presence of email and address
      console.log('Sign-in Response:', response.data);
  
      // Destructure the response to extract tokens and user details, including role
      const { accessToken, refreshToken, userId, username, email, address, role } = response.data;
  
      // Store tokens and user info in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username || ''); // Store username or empty string
      localStorage.setItem('email', email || ''); // Store email or empty string
      localStorage.setItem('address', address || ''); // Store address or empty string
      localStorage.setItem('role', role || ''); // Store role or empty string
  
      // Set the authorization header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
      // Update user state with the retrieved details, including role
      setUser({ userId, username, email, address, role });
  
      // Show a success message
      setSnackbar({ open: true, message: response.data.message || 'Login successful!', severity: 'success' });
  
      return response.data; // Return the response data if further processing is needed
    } catch (error) {
      // Handle any errors that occur during sign-in
      handleAuthError(error);
      throw error; // Re-throw the error for handling it in the component if needed
    }
  };

  // Sign out function
  const signOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('address');
    localStorage.removeItem('role');
   
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setSnackbar({ open: true, message: 'Logged out successfully', severity: 'info' });
  };

  // Handle authentication errors
  const handleAuthError = (error) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.request) {
      errorMessage = 'Network Error. Please try again later.';
    }
    setSnackbar({ open: true, message: errorMessage, severity: 'error' });
  };

  // Check for stored access token and user info on initial load
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const address = localStorage.getItem('address');
    const role = localStorage.getItem('role'); // Retrieve role from localStorage

    if (accessToken && userId) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setUser({ userId, username, email, address, role }); // Include role in user state
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
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

// Custom hook to use the AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
