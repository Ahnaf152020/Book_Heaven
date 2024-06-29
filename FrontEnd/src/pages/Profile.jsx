import React from 'react';
import image1 from '../assets/image1.jpg'; // Replace with your image paths
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const Profile = () => {
  // Define the keyframes for the background animation
  const keyframes = `
    @keyframes moveBackground {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-100%); }
    }
  `;

  // Inject the keyframes into a style tag
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = keyframes;
  document.head.appendChild(styleSheet);

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
        width: '400%', // Adjust the width to include all the images and duplicates
        height: '100%',
        display: 'flex',
        animation: 'moveBackground 21s linear infinite'
      }}>
        <div style={{ width: '25%', height: '100%' }}>
          <img src={image1} alt="Background 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '25%', height: '100%' }}>
          <img src={image2} alt="Background 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '25%', height: '100%' }}>
          <img src={image3} alt="Background 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '25%', height: '100%' }}>
          <img src={image1} alt="Background 1 Duplicate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '25%', height: '100%' }}>
          <img src={image2} alt="Background 2 Duplicate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '25%', height: '100%' }}>
          <img src={image3} alt="Background 3 Duplicate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Nickname container */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
      }}>
       

       
      </div>

      {/* Main content */}
      <div style={{ zIndex: 1 }}>
        


      </div>
    </div>
  );
}

export default Profile;
