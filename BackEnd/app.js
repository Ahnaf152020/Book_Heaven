require('dotenv').config(); 
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const userRoutes = require('./routes/user'); // Ensure this path is correct 
const bookRoutes = require('./routes/books'); 
 
const app = express(); 
 
app.use(express.json()); 
app.use(cors()); 
 
// Connect to MongoDB 
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(() => console.log('Connected to MongoDB')) 
  .catch(err => console.error('Error connecting to MongoDB:', err)); 
 
// Define Routes 
app.use('/api/v1', userRoutes); // User routes 
app.use('/api/v1/books', bookRoutes); // Book routes 
 
// Error handling middleware 
app.use((err, req, res, next) => { 
  console.error(err.stack); 
  res.status(500).send('Something broke!'); 
}); 
 
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { 
  console.log(`Server started at http://localhost:${PORT}`); 
});