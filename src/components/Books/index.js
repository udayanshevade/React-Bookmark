import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book';

const Books = ({ books, shelves, onBookReshelved }) => (
  <div className="grid">
    {
      books.map(book => (
        <div key={book.title.toUpperCase().split(' ').join('-')}>
          <Book book={book} shelves={shelves} onBookReshelved={onBookReshelved} />
        </div>
      ))
    }
  </div>
);

Books.propTypes = {
  books: PropTypes.array,
  shelves: PropTypes.object,
  onBookReshelved: PropTypes.func,
};

export default Books;
