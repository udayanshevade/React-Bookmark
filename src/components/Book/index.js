import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardTop from './cardTop';
import CardDetails from './details';
import * as BooksAPI from '../../BooksAPI';
import PropTypes from 'prop-types';

class Book extends Component {
  state = {
    open: false,
    shelf: '',
  }

  componentDidMount() {
    this.setState({
      shelf: this.props.book.shelf,
    });
  }

  updateBook = async(shelf) => {
    const { onBookReshelved, book } = this.props;
    const updatedBook = { ...book, shelf };
    BooksAPI.update(book, shelf)
      .then(() => {
        onBookReshelved(updatedBook);
      });
  }

  handleShelfSelect = (e, shelf) => {
    this.setState({
      shelf,
    }, () => this.updateBook(shelf));
  }

  render() {
    const { book, shelves } = this.props;
    const { shelf } = this.state;
    const { imageLinks, title, authors } = book;
    return (
      <Card className="book">
        <CardTop
          shelf={shelf}
          shelves={shelves}
          title={title}
          images={imageLinks}
          onShelfSelect={this.handleShelfSelect}          
        />
        <CardDetails
          title={title}
          authors={authors}
        />
      </Card>
    );
  }
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  }),
  shelves: PropTypes.shape({
    nowReading: PropTypes.string,
  }),
  onBookReshelved: PropTypes.func,
};

export default Book;
