import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Button } from '@mui/material';

const Logout = () => {
  const { logout, snackbar, setSnackbar } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-gray-100 rounded-lg">
        <p className="mb-4 text-xl">Are you sure you want to log out?</p>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
        >
          Logout
        </Button>
        <Snackbar
          open={snackbar.open} // Control Snackbar visibility
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })} // Close Snackbar on timeout
          message={snackbar.message}
        />
      </div>
    </div>
  );
};

export default Logout;
