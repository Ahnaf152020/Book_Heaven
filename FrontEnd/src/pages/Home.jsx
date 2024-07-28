import React, { useState, useEffect } from 'react';
import { CircularProgress, TextField, Autocomplete } from '@mui/material';

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
  const [originalBook, setOriginalBook] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uniqueAuthors, setUniqueAuthors] = useState([]);
  const [titles, setTitles] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchBooks();
    const storedBorrowedBooks = localStorage.getItem('borrowedBooks');
    if (storedBorrowedBooks) {
      setBorrowedBooks(JSON.parse(storedBorrowedBooks));
    }
  }, []);

  useEffect(() => {
    const authorsSet = new Set(books.map(book => book.author));
    setUniqueAuthors([...authorsSet]);

    const titlesSet = new Set(books.map(book => book.title));
    setTitles([...titlesSet]);

    const languagesSet = new Set(books.map(book => book.language));
    setLanguages([...languagesSet]);

    const categoriesSet = new Set(books.map(book => book.category));
    setCategories([...categoriesSet]);
  }, [books]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://book-heaven-28r-api.vercel.app/api/v1/books');
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
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
    setOriginalBook({ ...filteredBooks[index] });
  };

  const saveEdit = async (index) => {
    setLoading(true);
    try {
      const updatedBook = { ...filteredBooks[index] };
      const response = await fetch(`https://book-heaven-28r-api.vercel.app/api/v1/books/${updatedBook._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });
      if (response.ok) {
        const updatedBooks = [...filteredBooks];
        updatedBooks[index] = updatedBook;
        setFilteredBooks(updatedBooks);
        setBooks(updatedBooks);

        // Update borrowed books if the edited book is in the borrowed list
        const updatedBorrowedBooks = borrowedBooks.map(b => b._id === updatedBook._id ? updatedBook : b);
        setBorrowedBooks(updatedBorrowedBooks);
        localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks));

        setEditIndex(null);
        setMessage('Book details have been edited!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        console.error('Error updating book:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating book:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    if (originalBook) {
      const updatedBooks = [...filteredBooks];
      updatedBooks[editIndex] = originalBook;
      setFilteredBooks(updatedBooks);
    }
    setEditIndex(null);
    setOriginalBook(null);
  };

  const handleDelete = async (index) => {
    setLoading(true);
    try {
      const bookToDelete = filteredBooks[index];
      const response = await fetch(`https://book-heaven-28r-api.vercel.app/api/v1/books/${bookToDelete._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedBooks = filteredBooks.filter((_, i) => i !== index);
        setFilteredBooks(updatedBooks);
        setBooks(updatedBooks);

        // Remove deleted book from borrowed books
        const updatedBorrowedBooks = borrowedBooks.filter(b => b._id !== bookToDelete._id);
        setBorrowedBooks(updatedBorrowedBooks);
        localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks));

        setMessage('Book has been deleted!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        console.error('Error deleting book:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    } finally {
      setLoading(false);
    }
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
    const updatedBorrowedBooks = borrowedBooks.filter((b) => b._id !== book._id);
    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks));
    setMessage('Book unborrowed successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const isBookBorrowed = (book) => {
    return borrowedBooks.some(borrowedBook => borrowedBook._id === book._id);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedBooks = [...filteredBooks];
    updatedBooks[index] = { ...updatedBooks[index], [field]: value };
    setFilteredBooks(updatedBooks);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Book List</h1>

      <div className="flex flex-wrap w-full mx-auto mb-8 md:w-3/4 lg:w-1/2">
        <Autocomplete
          options={uniqueAuthors}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
        </button>
      </div>

      {message && <p className="mb-4 text-green-500">{message}</p>}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <CircularProgress />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Author</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Language</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={book._id} className="border-t">
                  <td className="px-4 py-2 border">
                    {editIndex === index ? (
                      <TextField
                        value={book.author}
                        onChange={(e) => handleFieldChange(index, 'author', e.target.value)}
                      />
                    ) : (
                      book.author
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editIndex === index ? (
                      <TextField
                        value={book.title}
                        onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                      />
                    ) : (
                      book.title
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editIndex === index ? (
                      <TextField
                        value={book.language}
                        onChange={(e) => handleFieldChange(index, 'language', e.target.value)}
                      />
                    ) : (
                      book.language
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editIndex === index ? (
                      <TextField
                        value={book.category}
                        onChange={(e) => handleFieldChange(index, 'category', e.target.value)}
                      />
                    ) : (
                      book.category
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editIndex === index ? (
                      <>
                        <button
                          onClick={() => saveEdit(index)}
                          className="px-2 py-1 text-white bg-green-500 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-2 py-1 ml-2 text-white bg-gray-500 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-2 py-1 text-white bg-blue-500 rounded"
                      >
                        Edit
                      </button>
                    )}
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
                        className="px-2 py-1 ml-2 text-white bg-gray-500 rounded"
                      >
                        Borrow
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="mb-4 text-2xl font-bold">Book Cards</h2>
      <div className="flex flex-wrap">
        {books.map((book) => (
          <div key={book._id} className="w-full p-2 mb-4 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="p-4 bg-gray-100 rounded shadow-md">
              <h3 className="mb-2 text-xl font-semibold">{book.title}</h3>
              <p className="mb-1"><strong>Author:</strong> {book.author}</p>
              <p className="mb-1"><strong>Language:</strong> {book.language}</p>
              <p className="mb-1"><strong>Category:</strong> {book.category}</p>
              {isBookBorrowed(book) && (
                <button
                  onClick={() => handleUnborrow(books.findIndex(b => b.title === book.title))}
                  className="px-2 py-1 mt-2 text-white bg-yellow-500 rounded"
                >
                  Unborrow
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
