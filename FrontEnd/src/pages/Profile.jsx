import React, { useEffect, useState } from 'react';
import { Paper, Typography, Avatar, Grid } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (!role) {
      alert('Please log in to view your profile.');
      navigate('/login');
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
    <div className="relative h-screen w-screen overflow-hidden text-white text-2xl font-bold flex items-center justify-center">
      {/* Background container */}
      <div className="absolute top-0 left-0 w-[500%] h-full flex animate-moveBackground">
        <div className="w-[20%] h-full">
          <img src={image1} alt="Background 1" className="w-full h-full object-cover" />
        </div>
        <div className="w-[20%] h-full">
          <img src={image2} alt="Background 2" className="w-full h-full object-cover" />
        </div>
        <div className="w-[20%] h-full">
          <img src={image3} alt="Background 3" className="w-full h-full object-cover" />
        </div>
        <div className="w-[20%] h-full">
          <img src={image4} alt="Background 4" className="w-full h-full object-cover" />
        </div>
        <div className="w-[20%] h-full">
          <img src={image5} alt="Background 5" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Main content */}
      <div className="z-10">
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
            <div className="text-center">
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
            </div>
          ) : (
            <Typography variant="h6" color="inherit" textAlign="center">
              Please log in to view your profile.
            </Typography>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default Profile;
