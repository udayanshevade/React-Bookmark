import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import Book from '../Book';

const Books = ({ books, shelves, onBookReshelved }) => {
  const items = books.map((book, i) => (
    <CSSTransition
      key={i}
      classNames="popIn"
      timeout={{ enter: 150, exit: 150 }}
    >
      <Book
        book={book}
        shelves={shelves}
        onBookReshelved={onBookReshelved}
        key={book.title.toUpperCase().split(' ').join('-')}
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
  books: PropTypes.array,
  shelves: PropTypes.object,
  onBookReshelved: PropTypes.func,
};

export default Books;
