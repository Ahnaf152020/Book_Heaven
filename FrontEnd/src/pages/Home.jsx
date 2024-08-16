import React, { useState, useEffect } from 'react';
import { CircularProgress, TextField, Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Link } from 'react-router-dom';
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
  
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newBook, setNewBook] = useState({
    author: '',
    title: '',
    language: '',
    category: '',
    image: '', // Add image field
    description: '' // Add description field
  });

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

  const handleReset = () => {
    setSearchCriteria({
      author: '',
      title: '',
      language: '',
      category: ''
    });
    setFilteredBooks(books); // Reset filtered books to original list
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

  const handleAddBook = async () => {
    setLoading(true);
    console.log('Adding book:', newBook); // Check what data is being sent
    try {
      const response = await fetch('https://book-heaven-28r-api.vercel.app/api/v1/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      
      if (response.ok) {
        const addedBook = await response.json();
        setBooks([...books, addedBook]);
        setFilteredBooks([...filteredBooks, addedBook]);
        setOpenAddDialog(false);
        setNewBook({ author: '', title: '', language: '', category: '', image: '', description: '' }); // Reset the form
        setMessage('Book added successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        console.error('Error adding book:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setLoading(false);
    }
  };


  const [searchButtonColor, setSearchButtonColor] = useState('black'); 
  const [resetButtonColor, setResetButtonColor] = useState('red');
  
  
  const handleSearchClick = () => {
    handleSearch(); // Call the search function
    setSearchButtonColor('black'); // Change search button color to red
    setResetButtonColor('red'); // Change reset button color to blue
  };
  
  const handleResetClick = () => {
    // Reset your search criteria here
    setSearchCriteria({
      author: '',
      title: '',
      language: '',
      category: ''
    });
    setFilteredBooks(books); // Reset filtered books
    setSearchButtonColor('blue'); // Change reset button color to blue
    setResetButtonColor('black'); // Change search button color to red
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
            <TextField {...params} label="Category" variant="outlined" fullWidth sx={{ minWidth: 300 }} />
          )}
        />
      </div>
  
      






      <div className="flex justify-center mb-4">
  <Button 
    variant="contained" 
    onClick={handleSearchClick} 
    disabled={loading} 
    sx={{ 
      backgroundColor: searchButtonColor, 
      color: 'white', 
      fontWeight: 'bold', 
      height: '50px', 
      width: '140px', 
      marginRight: '2.6cm' // Distance between buttons
    }} 
  >
    {loading ? <CircularProgress size={24} /> : 'Search'}
  </Button>

  <Button 
    variant="contained" 
    onClick={handleResetClick} 
    disabled={loading} 
    sx={{ 
      backgroundColor: resetButtonColor, 
      color: 'white', 
      fontWeight: 'bold', 
      height: '50px', 
      width: '140px' 
    }} 
  >
    Reset
  </Button>
</div>







  
      {message && (
        <div className="p-4 mb-4 text-sm text-white bg-blue-500 rounded">{message}</div>
      )}
  
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Author</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Language</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {editIndex === index ? (
                  <>
                    <td className="px-6 py-4">
                      <TextField
                        value={book.author}
                        onChange={(e) => handleFieldChange(index, 'author', e.target.value)}
                        variant="outlined"
                        fullWidth
                      />
                    </td>
                    <td className="px-6 py-4">
                      <TextField
                        value={book.title}
                        onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                        variant="outlined"
                        fullWidth
                      />
                    </td>
                    <td className="px-6 py-4">
                      <TextField
                        value={book.language}
                        onChange={(e) => handleFieldChange(index, 'language', e.target.value)}
                        variant="outlined"
                        fullWidth
                      />
                    </td>
                    <td className="px-6 py-4">
                      <TextField
                        value={book.category}
                        onChange={(e) => handleFieldChange(index, 'category', e.target.value)}
                        variant="outlined"
                        fullWidth
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">{book.author}</td>
                    <td className="px-6 py-4">{book.title}</td>
                    <td className="px-6 py-4">{book.language}</td>
                    <td className="px-6 py-4">{book.category}</td>
                  </>
                )}
                <td className="px-6 py-4">
                  {editIndex === index ? (
                    <>
                      <Button variant="contained" onClick={() => saveEdit(index)} disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Save'}
                      </Button>
                      <Button variant="contained" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="contained" onClick={() => handleEdit(index)} disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Edit'}
                      </Button>
                      <Button variant="contained" onClick={() => handleDelete(index)} disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Delete'}
                      </Button>
                      {isBookBorrowed(book) ? (
                        <Button variant="contained" onClick={() => handleUnborrow(index)} disabled={loading}>
                          {loading ? <CircularProgress size={24} /> : 'Unborrow'}
                        </Button>
                      ) : (
                        <Button variant="contained" onClick={() => handleBorrow(index)} disabled={loading}>
                          {loading ? <CircularProgress size={24} /> : 'Borrow'}
                        </Button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  




      <div className="flex justify-center mt-4">
        <Button variant="contained" onClick={() => setOpenAddDialog(true)} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Add Book'}
        </Button>
      </div>
  
    
  
  
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
  <DialogTitle>Add New Book</DialogTitle>
  <DialogContent>
    <TextField
      label="Author"
      value={newBook.author}
      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
      variant="outlined"
      fullWidth
      margin="normal"
    />
    <TextField
      label="Title"
      value={newBook.title}
      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
      variant="outlined"
      fullWidth
      margin="normal"
    />
    <TextField
      label="Language"
      value={newBook.language}
      onChange={(e) => setNewBook({ ...newBook, language: e.target.value })}
      variant="outlined"
      fullWidth
      margin="normal"
    />
    <TextField
      label="Category"
      value={newBook.category}
      onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
      variant="outlined"
      fullWidth
      margin="normal"
    />

    {/* This is where you need to add the missing part */}
    <TextField
      label="Image URL"
      value={newBook.image}
      onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
      variant="outlined"
      fullWidth
      margin="normal"
    />
    <TextField
      label="Description"
      value={newBook.description}
      onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
      variant="outlined"
      fullWidth
      margin="normal"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenAddDialog(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleAddBook} color="primary">
      Add Book
    </Button>
  </DialogActions>
</Dialog>



{/* Book Cards Section */}
<div className="mt-8">
  <h2 className="mb-4 text-2xl font-bold">Book Cards</h2>
 


  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {filteredBooks.map((book, index) => (
    <Link to={`/books/${book._id}`} key={index} className="p-4 bg-white border rounded shadow-md book-card">
      <h3 className="mb-2 text-xl font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-700">Author: {book.author}</p>
      <p className="text-sm text-gray-700">Language: {book.language}</p>
      <p className="text-sm text-gray-700">Category: {book.category}</p>
      <div className="mt-4">
        {isBookBorrowed(book) ? (
          <Button variant="contained" onClick={() => handleUnborrow(index)} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Unborrow'}
          </Button>
        ) : (
          <Button variant="contained" onClick={() => handleBorrow(index)} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Borrow'}
          </Button>
        )}
      </div>
    </Link>
  ))}
</div>







</div>

</div>
  );
};

export default Home;
