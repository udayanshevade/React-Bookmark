import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book';

const Books = ({ books, shelves }) => (
  <div className="grid">
    {
      books.map(book => (
        <div key={book.title.toUpperCase().split(' ').join('-')}>
          <Book {...book} shelves={shelves} />
        </div>
      ))
    }
  </div>
);

Books.propTypes = {
  books: PropTypes.array,
};

export default Books;
