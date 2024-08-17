import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  TextField,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const [userRole, setUserRole] = useState('user'); 
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    author: '',
    title: '',
    language: '',
    category: '',
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
    image: '',
    description: '',
  });

  const [openEditDialog, setOpenEditDialog] = useState(false); // State for the edit dialog
  const [editedBook, setEditedBook] = useState({}); // State for the edited book


  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      setUserRole(role);
    }
    fetchBooks();
    const storedBorrowedBooks = localStorage.getItem('borrowedBooks');
    if (storedBorrowedBooks) {
      setBorrowedBooks(JSON.parse(storedBorrowedBooks));
    }
  }, []);

  useEffect(() => {
    const authorsSet = new Set(books.map((book) => book.author));
    setUniqueAuthors([...authorsSet]);

    const titlesSet = new Set(books.map((book) => book.title));
    setTitles([...titlesSet]);

    const languagesSet = new Set(books.map((book) => book.language));
    setLanguages([...languagesSet]);

    const categoriesSet = new Set(books.map((book) => book.category));
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
      const filtered = books.filter((book) =>
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
      category: '',
    });
    setFilteredBooks(books);
  };


  const handleInputChange = (e, value, name) => {
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

 

  
  const handleEdit = (index) => {
    setEditIndex(index);
    setOriginalBook({ ...filteredBooks[index] });
    setEditedBook({ ...filteredBooks[index] }); // Set the book to be edited
    setOpenEditDialog(true); // Open the edit dialog
  };


  const saveEdit = async () => {
    setLoading(true);
    try {
      
      const response = await fetch(`https://book-heaven-28r-api.vercel.app/api/v1/books/${editedBook._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBook),
      });
      if (response.ok) {
        const updatedBooks = [...filteredBooks];
        const updatedBookIndex = filteredBooks.findIndex(book => book._id === editedBook._id); // Find the index of the updated book
      updatedBooks[updatedBookIndex] = editedBook; // Replace the original book with the edited book
      setFilteredBooks(updatedBooks);
      setBooks(updatedBooks);

      const updatedBorrowedBooks = borrowedBooks.map(b => b._id === editedBook._id ? editedBook : b);
      setBorrowedBooks(updatedBorrowedBooks);
      localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks));

      setOpenEditDialog(false); // Close the dialog after saving
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
      updatedBooks[editIndex] = originalBook; // Revert the book to the original state
      setFilteredBooks(updatedBooks);
    }
    setOpenEditDialog(false); // Close the dialog
    setEditIndex(null);
    setOriginalBook(null); // Clear original book data
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

  const handleFieldChange = (field, value) => {
    setEditedBook({ ...editedBook, [field]: value }); // Update the edited book state
  };

  
  /*const handleAddBook = async () => {
    setLoading(true);
    console.log('Adding book:', newBook);
    if (!newBook.author || !newBook.title || !newBook.language || !newBook.category) {
      console.error('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:1000/api/v1/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        const addedBook = await response.json();
        console.log('Book added successfully:', addedBook);
        setBooks([...books, addedBook]);
        setFilteredBooks([...filteredBooks, addedBook]);
        setOpenAddDialog(false);
        setNewBook({ author: '', title: '', language: '', category: '', image: '', description: '' });
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
  };*/

  const handleAddBook = async () => {
    setLoading(true);
    console.log('Adding book:', newBook);
    if (!newBook.author || !newBook.title || !newBook.language || !newBook.category) {
      console.error('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://book-heaven-28r-api.vercel.app/api/v1/books/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        const addedBook = await response.json();
        console.log('Book added successfully:', addedBook);
        setBooks([...books, addedBook]);
        setFilteredBooks([...filteredBooks, addedBook]);
        setOpenAddDialog(false);
        setNewBook({ author: '', title: '', language: '', category: '', image: '', description: '' });
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
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Language</th>
            <th className="px-4 py-2">Category</th>
            {userRole === 'admin' && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={book._id}>
              <td className="px-4 py-2 border">{book.author}</td>
              <td className="px-4 py-2 border">{book.title}</td>
              <td className="px-4 py-2 border">{book.language}</td>
              <td className="px-4 py-2 border">{book.category}</td>
              {userRole === 'admin' && (
                <td className="px-4 py-2 border">
                {userRole === 'admin' && (
                  <>
                    <Button onClick={() => handleEdit(index)} color="primary">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(index)} color="secondary">
                      Delete
                    </Button>
                  </>
                )}
                
                {userRole === 'user' && ( // Assuming 'user' is the role for regular users
                  <>
                    {isBookBorrowed(book) ? (
                      <Button onClick={() => handleUnborrow(index)} color="error">
                        Return
                      </Button>
                    ) : (
                      <Button onClick={() => handleBorrow(index)} color="success">
                        Borrow
                      </Button>
                    )}
                  </>
                )}
              </td>
              
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
      <div className="flex justify-center mt-4">
         <Button 
  onClick={() => setOpenAddDialog(true)} 
  variant="contained" 
  color="primary"
  style={{ display: userRole === 'admin' ? 'block' : 'none' }} 
>
  Add Book
</Button>
      </div>
  
    
  
  
      


<div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Book Cards</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book, index) => (
          <Link to={`/books/${book._id}`} key={index} className="p-4 bg-white border rounded shadow-md book-card">
            <h3 className="mb-2 text-xl font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-700">Author: {book.author}</p>
            <p className="text-sm text-gray-700">Language: {book.language}</p>
            <p className="text-sm text-gray-700">Category: {book.category}</p>
            
            {/* Conditionally render buttons only if the user is not an admin and userRole is defined */}
            {(userRole && userRole !== 'admin') && (
              <div className="mt-4">
                {isBookBorrowed(book) ? (
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleUnborrow(index)} 
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Return'}
                  </Button>
                ) : (
                  <Button 
                    variant="contained" 
                    color="success" 
                    onClick={() => handleBorrow(index)} 
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Borrow'}
                  </Button>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>


      
   
  
          <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogContent>
              <TextField
                label="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Language"
                value={newBook.language}
                onChange={(e) => setNewBook({ ...newBook, language: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Category"
                value={newBook.category}
                onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Image URL"
                value={newBook.image}
                onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Description"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                fullWidth
                multiline
                rows={4}
                sx={{ marginBottom: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
              <Button onClick={handleAddBook} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>

      {/* Edit Book Dialog */}
      <Dialog open={openEditDialog} onClose={cancelEdit}>
        <DialogTitle>Edit Book Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Author"
            value={editedBook.author || ''}
            onChange={(e) => handleFieldChange('author', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Title"
            value={editedBook.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Language"
            value={editedBook.language || ''}
            onChange={(e) => handleFieldChange('language', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            value={editedBook.category || ''}
            onChange={(e) => handleFieldChange('category', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={editedBook.image || ''}
            onChange={(e) => handleFieldChange('image', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={editedBook.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={saveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
