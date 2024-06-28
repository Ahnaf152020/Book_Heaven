
import React from 'react';

const BorrowedBooksPage = ({ borrowedBooks }) => {
  return (
    <div>
      <h1>Borrowed Books</h1>
      <ul>
        {borrowedBooks.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowedBooksPage;
