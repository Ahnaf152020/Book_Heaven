import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { CircularProgress, CardContent, Typography, CardMedia, Grid, Container, Paper, Button } from '@mui/material'; 
 
const BookDetails = () => { 
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [book, setBook] = useState(null); 
  const [loading, setLoading] = useState(true); 
 
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
            </CardContent> 
          </Grid> 
        </Grid> 
        <Container sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}> 
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')} 
            sx={{ 
              borderRadius: '30px', // Rounded corners 
              padding: '10px 20px', // Add padding 
              fontSize: '16px', // Increase font size 
              fontWeight: 'bold', // Make font bold 
              textTransform: 'none', // Remove uppercase transformation 
              background: 'linear-gradient(45deg, #6a1b9a 30%, #ab47bc 90%)', // Gradient background 
              boxShadow: '0 3px 5px 2px rgba(106, 27, 154, .3)', // Shadow effect 
              '&:hover': { 
                background: 'linear-gradient(45deg, #ab47bc 30%, #6a1b9a 90%)', // Change gradient on hover 
              }, 
            }} 
          > 
            Back to Home 
          </Button> 
        </Container> 
      </Paper> 
    </Container> 
  ); 
}; 
 
export default BookDetails;