const mongoose = require('mongoose'); 
 
const bookSchema = new mongoose.Schema({ 
  title: { type: String, required: true }, 
  author: { type: String, required: true }, 
  language: { type: String, required: true }, 
  category: { type: String, required: true }, 
  description: { type: String, required: true }, // Ensure this is included 
  image: { type: String, required: true }, // Ensure this is included 
}); 
 
module.exports = mongoose.model('Book', bookSchema);