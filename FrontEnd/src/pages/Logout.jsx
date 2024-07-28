import React, { useContext } from 'react';
import { AuthContext } from '../components/context/authcontext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('Logged out successfully');
    navigate('/login'); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-gray-100 rounded-lg">
        <p className="mb-4 text-xl">Are you sure you want to log out?</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
