import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import image2 from '../assets/image2.jpg'; // Import your local image

const Borrow = () => {
  const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

  const containerStyle = {
    backgroundImage: `url(${image2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '2rem',
    color: 'white', // Ensures text is visible against the background
  };

  const handleUnborrow = (index) => {
    const updatedBorrowedBooks = borrowedBooks.filter((_, i) => i !== index);
    localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks));
    window.location.reload(); // Reload the page to update the list
  };

  const userRole = localStorage.getItem('role'); // Retrieve the user role from localStorage

  return (
    <div style={containerStyle}>
      <h1 className="mb-4 text-3xl font-bold">Borrowed Books</h1>
      {borrowedBooks.length === 0 ? (
        <Typography variant="h6" style={{ color: 'white' }}>
          No books borrowed.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {borrowedBooks.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} sx={{ height: '100%', backgroundColor: 'orange' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom style={{ color: 'zinc' }}>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" style={{ color: 'zinc' }}>
                    Author: {book.author}
                  </Typography>
                  <Typography variant="body2" style={{ color: 'zinc' }}>
                    Language: {book.language}
                  </Typography>
                  <Typography variant="body2" style={{ color: 'zinc' }}>
                    Category: {book.category}
                  </Typography>
                  
                  {/* Conditionally render the Unborrow button based on user roles */}
                  {userRole && userRole !== 'admin' && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleUnborrow(index)}
                      style={{ marginTop: '1rem' }}
                    >
                      Unborrow
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Borrow;
