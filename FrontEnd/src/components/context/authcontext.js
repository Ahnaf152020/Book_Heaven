import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  
  const navigate = useNavigate(); // Initialize useNavigate

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
          
          // Check if refresh token is present
          if (!refreshToken) {
            signOut(); // No refresh token available, log out the user
            return Promise.reject(error);
          }

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
      const response = await api.post('/sign-in', credentials);
      const { accessToken, refreshToken, userId, username, email, address, role } = response.data;
  
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username || '');
      localStorage.setItem('email', email || '');
      localStorage.setItem('address', address || '');
      localStorage.setItem('role', role || '');
  
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setUser({ userId, username, email, address, role });
  
      setSnackbar({ open: true, message: response.data.message || 'Login successful!', severity: 'success' });
  
      // Redirect to home after successful login
      navigate('/');  // Redirects the user to the home page
  
      return response.data;
    } catch (error) {
      handleAuthError(error);
      throw error;
    }
  };

  // Sign out function with redirection to login page
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
    
    // Redirect to login page
    navigate('/login'); // Ensure this is your actual login route
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
    const role = localStorage.getItem('role');

    if (accessToken && userId) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setUser({ userId, username, email, address, role });
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
