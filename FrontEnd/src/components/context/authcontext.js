import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUp = async (userData) => {
    try {
      const response = await axios.post('https://book-heaven-st44.vercel.app/sign-up', userData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data.message : error.message);
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  const signIn = async (credentials) => {
    try {
      const response = await axios.post('https://book-heaven-st44.vercel.app/sign-in', credentials);
      const { token, userId } = response.data;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userId', userId);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ userId });
      alert(response.data.message);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data.message : error.message);
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  const signOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    if (accessToken && userId) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setUser({ userId });
      // Optionally fetch user info if needed
      // axios.get('http://localhost:1000/api/v1/profile') // Adjust the URL to your profile endpoint
      //   .then(response => {
      //     setUser(response.data.user);
      //   })
      //   .catch(error => {
      //     console.error('Error fetching user info:', error);
      //     signOut(); // Sign out if token is invalid or expired
      //   });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
