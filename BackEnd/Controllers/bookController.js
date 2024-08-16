const Book = require('../models/Book');

// Controller to handle fetching all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to handle adding a new book
const addBook = async (req, res) => {
  const { title, author, language, category, description, image } = req.body; // Include new fields
  const newBook = new Book({ title, author, language, category, description, image }); // Add new fields
  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to handle editing an existing book
const editBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, language, category, description, image } = req.body; // Include new fields
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, language, category, description, image }, { new: true }); // Add new fields
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to handle deleting a book
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  addBook,
  editBook,
  deleteBook,
};
