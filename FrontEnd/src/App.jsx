import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';
import Footer from './components/Footer/Footer';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Borrow from './pages/Borrow';
import Chart from './pages/Chart'; 

import { AuthProvider } from './components/context/authcontext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/borrow" element={<Borrow />} />
              <Route path="/chart" element={<Chart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              
            
              
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;