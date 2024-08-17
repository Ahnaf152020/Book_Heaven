import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Avatar, Grid } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import image1 from '../assets/image1.jpg'; // Replace with your image paths
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router

const Profile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (!role) {
      alert('Please log in to view your profile.');
      navigate('/login'); // Redirect to login page
      return;
    }

    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const address = localStorage.getItem('address');

    if (userId) {
      setUserData({ userId, username, email, address });
    }
  }, [navigate]);

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden', // To hide overflow of moving images
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Background container */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '500%', // Adjust the width to include all the images
        height: '100%',
        display: 'flex',
        animation: 'moveBackground 60s linear infinite' // Slower animation
      }}>
        <div style={{ width: '20%', height: '100%' }}>
          <img src={image1} alt="Background 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '20%', height: '100%' }}>
          <img src={image2} alt="Background 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '20%', height: '100%' }}>
          <img src={image3} alt="Background 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '20%', height: '100%' }}>
          <img src={image4} alt="Background 4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '20%', height: '100%' }}>
          <img src={image5} alt="Background 5" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Main content */}
      <div style={{ zIndex: 1 }}>
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            padding: 3,
            color: '#fff',
          }}
        >
          <Paper 
            elevation={6} 
            sx={{
              padding: 4, 
              maxWidth: 500, 
              width: '100%', 
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
            }}
          >
            {userData.username ? (
              <Box textAlign="center">
                <Avatar 
                  sx={{ 
                    bgcolor: deepPurple[500], 
                    width: 80, 
                    height: 80, 
                    margin: 'auto',
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography variant="h4" component="h1" sx={{ marginTop: 2, marginBottom: 4 }}>
                  {userData.username}'s Profile
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>User ID:</strong> {userData.userId}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Email:</strong> {userData.email || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Address:</strong> {userData.address || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Typography variant="h6" color="inherit" textAlign="center">
                Please log in to view your profile.
              </Typography>
            )}
          </Paper>
        </Box>
      </div>
    </div>
  );
}

export default Profile;
