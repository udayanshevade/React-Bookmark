import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'material-ui/Card';
import CardTop from './cardTop';
import BookDetails from './details';
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
