import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';

import Cart from './pages/Cart';
import ChangePassword from './pages/ChangePassword';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Footer from './components/Footer/Footer';
import BookDetails from './pages/BookDetails';
import BorrowedBooksPage from './pages/BorrowedBookPage'; 

const App = () => {
  
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
         
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/book/:id" element={<BookDetails />} />
            { }
            <Route path="/borrowed" element={<BorrowedBooksPage borrowedBooks={borrowedBooks} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
