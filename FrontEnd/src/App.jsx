import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar/Navbar'; 
import Home from './pages/Home'; 
import AboutUs from './pages/AboutUs'; 
import Profile from './pages/Profile'; 
import Footer from './components/Footer/Footer'; 
import BookDetails from './pages/BookDetails';
import Login from './pages/Login'; 
import SignUp from './pages/SignUp'; 
import Borrow from './pages/Borrow'; 
import Chart from './pages/Chart';  
 
import { AuthProvider, useAuth } from './components/context/authcontext'; 

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Login />; // Redirect to login if not authenticated
};

const App = () => { 
  return ( 
    <Router> 
      <AuthProvider> 
        <div className="flex flex-col min-h-screen"> 
          <Navbar /> 
          <div className="flex-grow"> 
            <Routes> 
              <Route path="/" element={<Home />} /> 
              <Route path="/about-us" element={<AboutUs />} /> 
              <Route path="/borrow" element={<ProtectedRoute element={<Borrow />} />} /> 
              <Route path="/chart" element={<Chart />} /> 
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> 
              <Route path="/sign-up" element={<SignUp />} /> 
              <Route path="/login" element={<Login />} /> 
              <Route path="/books/:id" element={<BookDetails />} /> 
            </Routes> 
          </div> 
          <Footer /> 
        </div> 
      </AuthProvider> 
    </Router> 
  ); 
}; 
 
export default App;
