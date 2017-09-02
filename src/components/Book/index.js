import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'material-ui/Card';
import CardTop from './cardTop';
import BookDetails from './details';
import { update } from '../../BooksAPI';
import bookProps from './props';

class Book extends Component {
  state = {
    shelf: '',
  }

  componentDidMount() {
    // forks book data within component for immediate gratification
    // when a user selects a new shelf value
    this.setState({
      shelf: this.props.book.shelf,
    });
  }

  updateBook = async(shelf) => {
    const { onBookReshelved, book, openSnackbar } = this.props;
    // preserve old shelf value in case update fails
    const { shelf: oldShelfValue } = book;
    const updatedBook = { ...book, shelf };
    try {
      await update(book, shelf);
      // update state to reflect persisted data
      onBookReshelved(updatedBook);
    } catch (e) {
      // revert to old value
      this.setState({
        shelf: oldShelfValue,
      });
      // alert user
      openSnackbar('Book was not updated. Please try again.');
    }
  }

  handleShelfSelect = (e, shelf) => {
    // sets local value first for immediate gratification
    this.setState({
      shelf,
    }, () => this.updateBook(shelf));
  }

  render() {
    const { book, shelves } = this.props;
    const { shelf } = this.state;
    const { imageLinks, title, authors, id } = book;
    return (
      <Card className="book">
        <Link to={`/books/${id}`}>
          <CardTop
            shelf={shelf}
            shelves={shelves}
            title={title}
            images={imageLinks}
            onShelfSelect={this.handleShelfSelect}        
          />
          <BookDetails
            title={title}
            authors={authors}
          />
        </Link>
      </Card>
    );
  }
}

Book.propTypes = {
  book: bookProps,
  shelves: PropTypes.shape({
    currentlyReading: PropTypes.string,
  }),
  onBookReshelved: PropTypes.func,
  openSnackbar: PropTypes.func,
};

export default Book;
