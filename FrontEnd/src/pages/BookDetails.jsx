import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, CardContent, Typography, CardMedia, Grid, Container, Paper, Button, Snackbar, Alert } from '@mui/material';
import { AuthContext } from '../components/context/authcontext'; // Import AuthContext

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://book-heaven-28r-api.vercel.app/api/v1/books/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data);
        } else {
          console.error('Error fetching book details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBorrow = () => {
    // Logic to borrow the book
    const updatedBook = { ...book, isBorrowed: true };
    setBook(updatedBook);
    localStorage.setItem('borrowedBooks', JSON.stringify([...JSON.parse(localStorage.getItem('borrowedBooks') || '[]'), updatedBook]));
    setSnackbarMessage('Book borrowed successfully!');
    setSnackbarOpen(true);
  };

  const handleReturn = () => {
    // Logic to return the book
    const updatedBook = { ...book, isBorrowed: false };
    setBook(updatedBook);
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks') || '[]');
    const updatedBorrowedBooks = borrowedBooks.filter(b => b.id !== book.id);
    localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks));
    setSnackbarMessage('Book returned successfully!');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isBookBorrowed = (book) => {
    return book && book.isBorrowed;
  };

  const canBorrowOrReturn = () => {
    // Check if user is logged in and not an admin
    return user && user.role !== 'admin';
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!book) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Book not found</Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 2,
        background: 'linear-gradient(to right, #74ebd5, #ACB6E5)', // Gradient background
      }}
    >
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CardMedia
              component="img"
              alt={book.title}
              height="400"
              image={book.image} // Displaying book image
              title={book.title}
              sx={{ borderRadius: '4px', width: '100%', objectFit: 'contain' }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                by {book.author}
              </Typography>
              <Typography variant="body1" paragraph>
                {book.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <em>Language:</em> {book.language}
              </Typography>

              {/* Borrow/Return button */}
              {canBorrowOrReturn() && (
                isBookBorrowed(book) ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleReturn}
                    disabled={loading} // Disable during loading
                  >
                    {loading ? <CircularProgress size={24} /> : 'Return'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleBorrow}
                    disabled={loading} // Disable during loading
                  >
                    {loading ? <CircularProgress size={24} /> : 'Borrow'}
                  </Button>
                )
              )}
            </CardContent>
          </Grid>
        </Grid>
        <Container sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={{
              borderRadius: '30px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'none',
              background: 'linear-gradient(45deg, #6a1b9a 30%, #ab47bc 90%)',
              boxShadow: '0 3px 5px 2px rgba(106, 27, 154, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #ab47bc 30%, #6a1b9a 90%)',
              },
            }}
          >
            Back to Home
          </Button>
        </Container>
      </Paper>

      {/* Snackbar for displaying borrow/return messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookDetails;
