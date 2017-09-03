import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import Book from '../Book';
import bookProps from '../Book/props';

const Books = ({ books, ...restProps }) => {
  const items = books.map((book, i) => (
    <CSSTransition
      key={i}
      classNames="popIn"
      timeout={{ enter: 150, exit: 150 }}
    >
      <Book
        book={book}
        key={book.title.toUpperCase().split(' ').join('-')}
        {...restProps}
      />
    </CSSTransition>
  ));
  return (
    <div className="books-list">
      <TransitionGroup appear className="grid">
        {items}
      </TransitionGroup>
    </div>
  );
};

Books.propTypes = {
  books: PropTypes.arrayOf(bookProps),
  shelves: PropTypes.shape({
    currentlyReading: PropTypes.string,
  }),
  onBookReshelved: PropTypes.func,
  openSnackbar: PropTypes.func,
};

export default Books;
