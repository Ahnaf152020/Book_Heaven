import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import image5 from '../assets/image5.jpg'; // Import your local image
import axios from 'axios'; // Make sure to install axios

const Chart = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/books'); // Replace with your API endpoint
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books data.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const normalizeName = (name) => name.trim().toLowerCase();

  const calculateDistribution = (books, key) => {
    const distribution = books.reduce((acc, book) => {
      const name = normalizeName(book[key]);
      if (name) { // Check if the key exists
        acc[name] = (acc[name] || 0) + 1;
      }
      return acc;
    }, {});
    return Object.entries(distribution).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));
  };

  const categoriesDistribution = calculateDistribution(books, 'category');
  const authorsDistribution = calculateDistribution(books, 'author');

  const containerStyle = {
    backgroundImage: `url(${image5})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '2rem',
    color: 'white' // Ensures text is visible against the background
  };

  return (
    <div style={containerStyle}>
      <h1 className="mb-4 text-3xl font-bold">Charts</h1>
      {loading && <Typography variant="h6" style={{ color: 'white' }}>Loading...</Typography>}
      {error && <Typography variant="h6" style={{ color: 'red' }}>{error}</Typography>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: '12px', backgroundColor: '#333' }}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                style={{ color: 'white', fontWeight: 'bold', marginBottom: '1rem' }}
              >
                Categories Distribution
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <BarChart width={400} height={300} data={categoriesDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </Box>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: '#444',
                  borderRadius: '8px',
                  color: 'white'
                }}
              >
                <Typography variant="body2">
                  Additional information about Categories Distribution.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: '12px', backgroundColor: '#333' }}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                style={{ color: 'white', fontWeight: 'bold', marginBottom: '1rem' }}
              >
                Authors Distribution
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <BarChart width={400} height={300} data={authorsDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </Box>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: '#444',
                  borderRadius: '8px',
                  color: 'white'
                }}
              >
                <Typography variant="body2">
                  Additional information about Authors Distribution.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chart;
