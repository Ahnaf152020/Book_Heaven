import React, { useState, useEffect } from 'react';
import { CircularProgress, TextField, Autocomplete } from '@mui/material';
import booksData from '../data/books.json'; 
const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    author: '',
    title: '',
    language: '',
    category: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
    const storedBorrowedBooks = localStorage.getItem('borrowedBooks');
    if (storedBorrowedBooks) {
      setBorrowedBooks(JSON.parse(storedBorrowedBooks));
    }
  }, []);

  const fetchBooks = () => {
    setLoading(true);
    setTimeout(() => {
      setBooks(booksData);
      setFilteredBooks(booksData);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const { author, title, language, category } = searchCriteria;
      const filtered = books.filter(book =>
        (author ? book.author.toLowerCase().includes(author.toLowerCase()) : true) &&
        (title ? book.title.toLowerCase().includes(title.toLowerCase()) : true) &&
        (language ? book.language.toLowerCase().includes(language.toLowerCase()) : true) &&
        (category ? book.category.toLowerCase().includes(category.toLowerCase()) : true)
      );
      setFilteredBooks(filtered);
      setLoading(false);
    }, 500);
  };

  const handleInputChange = (e, value, name) => {
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const saveEdit = (index, newTitle) => {
    setTimeout(() => {
      const updatedBooks = [...filteredBooks];
      updatedBooks[index] = { ...updatedBooks[index], title: newTitle };
      setFilteredBooks(updatedBooks);
      setEditIndex(null);
      saveBooksToLocalStorage(updatedBooks);
      setMessage('Book title has been edited!');
      setTimeout(() => setMessage(''), 3000);
    }, 500);
  };

  const saveBooksToLocalStorage = (books) => {
    localStorage.setItem('booksData', JSON.stringify(books));
  };

  const handleDelete = (index) => {
    const updatedBooks = [...filteredBooks];
    updatedBooks.splice(index, 1);
    setFilteredBooks(updatedBooks);
    saveBooksToLocalStorage(updatedBooks);
    setMessage('Book has been deleted!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleBorrow = (index) => {
    const book = filteredBooks[index];
    const updatedBorrowedBooks = [...borrowedBooks, book];
    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks));
    setMessage('Book borrowed successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleUnborrow = (index) => {
    const book = filteredBooks[index];
    const updatedBorrowedBooks = borrowedBooks.filter((b) => b.title !== book.title);
    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks));
    setMessage('Book unborrowed successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const isBookBorrowed = (book) => {
    return borrowedBooks.some(borrowedBook => borrowedBook.title === book.title);
  };

  const authors = [...new Set(books.map(book => book.author))];
  const titles = [...new Set(books.map(book => book.title))];
  const languages = [...new Set(books.map(book => book.language))];
  const categories = [...new Set(books.map(book => book.category))];

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Book List</h1>

      <div className="flex flex-wrap w-full mx-auto mb-8 md:w-3/4 lg:w-1/2">
        <Autocomplete
          options={authors}
          value={searchCriteria.author}
          onChange={(e, value) => handleInputChange(e, value, 'author')}
          renderInput={(params) => (
            <TextField {...params} label="Author" variant="outlined" fullWidth sx={{ minWidth: 300 }} className="mb-2 md:mb-0 md:mr-2" />
          )}
        />
        <Autocomplete
          options={titles}
          value={searchCriteria.title}
          onChange={(e, value) => handleInputChange(e, value, 'title')}
          renderInput={(params) => (
            <TextField {...params} label="Title" variant="outlined" fullWidth sx={{ minWidth: 300 }} className="mb-2 md:mb-0 md:mr-2" />
          )}
        />
        <Autocomplete
          options={languages}
          value={searchCriteria.language}
          onChange={(e, value) => handleInputChange(e, value, 'language')}
          renderInput={(params) => (
            <TextField {...params} label="Language" variant="outlined" fullWidth sx={{ minWidth: 300 }} className="mb-2 md:mb-0 md:mr-2" />
          )}
        />
        <Autocomplete
          options={categories}
          value={searchCriteria.category}
          onChange={(e, value) => handleInputChange(e, value, 'category')}
          renderInput={(params) => (
            <TextField {...params} label="Category" variant="outlined" fullWidth sx={{ minWidth: 300 }} className="mb-2 md:mb-0 md:mr-2" />
          )}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 text-white bg-blue-500 rounded"
          style={{ minWidth: '100px' }}
        >
          Search
        </button>
      </div>

      {message && (
        <div className="p-2 mb-4 text-white bg-green-500 rounded">
          {message}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center">
          <CircularProgress color="primary" />
        </div>
      )}

      {!loading && filteredBooks.length === 0 && (
        <p className="text-lg text-center">No books found.</p>
      )}

      {!loading && filteredBooks.length > 0 && (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full mb-4 table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border">Author</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Language</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-2 border">{book.author}</td>
                    <td className="px-4 py-2 border">
                      {editIndex === index ? (
                        <div className="flex items-center">
                          <TextField
                            type="text"
                            value={filteredBooks[index].title}
                            onChange={(e) => {
                              const updatedTitle = e.target.value;
                              const updatedBooks = [...filteredBooks];
                              updatedBooks[index] = { ...updatedBooks[index], title: updatedTitle };
                              setFilteredBooks(updatedBooks);
                            }}
                            fullWidth
                          />
                          <button
                            onClick={() => saveEdit(index, filteredBooks[index].title)}
                            className="px-2 py-1 ml-2 text-white bg-green-500 rounded"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        book.title
                      )}
                    </td>
                    <td className="px-4 py-2 border">{book.language}</td>
                    <td className="px-4 py-2 border">{book.category}</td>
                    <td className="px-4 py-2 border">
                      {editIndex === index ? (
                        <button
                          onClick={() => setEditIndex(null)}
                          className="px-2 py-1 text-white bg-red-500 rounded"
                        >
                          Cancel
                        </button>
                      ) : (
                        <div>
                          <button
                            onClick={() => handleEdit(index)}
                            className="px-2 py-1 text-white bg-blue-500 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="px-2 py-1 ml-2 text-white bg-red-500 rounded"
                          >
                            Delete
                          </button>
                          {isBookBorrowed(book) ? (
                            <button
                              onClick={() => handleUnborrow(index)}
                              className="px-2 py-1 ml-2 text-white bg-yellow-500 rounded"
                            >
                              Unborrow
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBorrow(index)}
                              className="px-2 py-1 ml-2 text-white bg-green-500 rounded"
                            >
                              Borrow
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mb-4 text-2xl font-bold">Books</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded shadow-md"
              >
                <h3 className="mb-2 text-lg font-bold">{book.title}</h3>
                <p className="mb-1 text-sm"><strong>Author:</strong> {book.author}</p>
                <p className="mb-1 text-sm"><strong>Language:</strong> {book.language}</p>
                <p className="mb-1 text-sm"><strong>Category:</strong> {book.category}</p>
                <div className="flex justify-between mt-4">
                  {isBookBorrowed(book) ? (
                    <button
                      onClick={() => handleUnborrow(index)}
                      className="px-2 py-1 text-white bg-yellow-500 rounded"
                    >
                      Unborrow
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBorrow(index)}
                      className="px-2 py-1 text-white bg-green-500 rounded"
                    >
                      Borrow
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
