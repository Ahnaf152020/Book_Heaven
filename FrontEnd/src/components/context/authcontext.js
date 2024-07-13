import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const signUp = async (userData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, userData);
      alert(response.data.message); // Alert success message if needed
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
      alert(response.data.message); // Alert success message if needed
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const handleAuthError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      setError(error.response.data.message); // Set error message from server response
    } else if (error.request) {
      // The request was made but no response was received
      setError('Network Error. Please try again later.'); // Set generic network error
    } else {
      // Something happened in setting up the request that triggered an error
      setError('An unexpected error occurred. Please try again.'); // Set generic error
    }
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
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
