import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Bookshelf from './Bookshelf';
import { SearchButton } from './styles';
import bookProps from '../Book/props';

class BookshelfView extends Component {
  adjustBooksData = (rawData) => {
    // initialize empty arrays for all shelves
    const adjustedData = {};
    Object.keys(this.props.shelves).forEach((shelf) => {
      adjustedData[shelf] = [];
    });
    // file each book from the raw data into its appropriate shelf
    rawData.forEach((book) => {
      if (adjustedData.hasOwnProperty(book.shelf)) {
        adjustedData[book.shelf].push(book);
      }
    });
    // adjusted data used for rendering shelves dynamically
    return adjustedData;
  }

  render() {
    const { allBooks, ...restProps } = this.props;
    if (!allBooks.length) return <span />;
    const organizedBooks = this.adjustBooksData(allBooks);
    return (
      <div className="list-books">
        <Bookshelf
          organizedBooks={organizedBooks}
          {...restProps}
        />
        <Link to="/search">
          <SearchButton>
            <ContentAdd />
          </SearchButton>
        </Link>
      </div>
    );
  }
}

BookshelfView.propTypes = {
  allBooks: PropTypes.arrayOf(bookProps),
  onBookReshelved: PropTypes.func,
  openSnackbar: PropTypes.func,
};

export default BookshelfView;
