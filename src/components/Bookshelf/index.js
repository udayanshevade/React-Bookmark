import React, { Component } from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';
import { SearchButton } from './styles';

class BookshelfView extends Component {
  adjustBooksData = (rawData) => {
    const adjustedData = {};
    rawData.forEach((book) => {
      if (adjustedData.hasOwnProperty(book.shelf)) {
        adjustedData[book.shelf].push(book);
      } else {
        adjustedData[book.shelf] = [book];
      }
    })
    return adjustedData;
  }

  render() {
    // placeholder for loading indicator
    if (!this.props.allBooks.length) return <span />;
    const organizedBooks = this.adjustBooksData(this.props.allBooks);
    return (
      <div className="list-books">
        <Bookshelf
          organizedBooks={organizedBooks}
            onBookReshelved={this.props.onBookReshelved}
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
