import React, { Component } from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';
import { SearchButton } from './styles';

class BookshelfView extends Component {
  shelves = {
    currentlyReading: 'Now Reading',
    wantToRead: 'Read Later',
    read: 'Completed',
  }

  adjustBooksData = (rawData) => {
    // initialize empty arrays for all shelves
    const adjustedData = {};
    Object.keys(this.shelves).forEach((shelf) => {
      adjustedData[shelf] = [];
    });
    // file each book from the raw data into its appropriate shelf
    rawData.forEach((book) => {
      if (adjustedData.hasOwnProperty(book.shelf)) {
        adjustedData[book.shelf].push(book);
      }
    })
    return adjustedData;
  }

  render() {
    if (!this.props.allBooks.length) return <span />;
    const organizedBooks = this.adjustBooksData(this.props.allBooks);
    return (
      <div className="list-books">
        <Bookshelf
          organizedBooks={organizedBooks}
          onBookReshelved={this.props.onBookReshelved}
          shelves={this.shelves}
        />
        <SearchButton href="/search">
          <ContentAdd />
        </SearchButton>
      </div>
    );
  }
}

BookshelfView.propTypes = {
  allBooks: PropTypes.array,
  onBookReshelved: PropTypes.func,
};

export default BookshelfView;
