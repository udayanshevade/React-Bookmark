import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Sort from 'material-ui/svg-icons/content/sort';
import Card, { CardTitle, CardMedia } from 'material-ui/Card';
import * as BooksAPI from '../../BooksAPI';
import PropTypes from 'prop-types';
import { RightAlignedActions } from './styles';

class Book extends Component {
  state = {
    open: false,
    shelf: '',
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.shelf !== nextProps.book.shelf) {
      this.setState({
        shelf: nextProps.book.shelf,
      });
    }
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
        <CardMedia
          overlay={
            <RightAlignedActions>
              <IconMenu
                iconButtonElement={
                  <IconButton style={styles.organizeButton}>
                    <Sort color="#fff" />
                  </IconButton>}
                value={shelf}
                onChange={this.handleShelfSelect}
                style={{ margin: 0 }}
              >
                <MenuItem value={null} disabled>Move to:</MenuItem>
                {
                  Object.keys(shelves).map(s => (
                    <MenuItem
                      value={s}
                      selected={shelf === s}
                      key={`${title}-menu-${s}`}
                      primaryText={shelves[s]}
                    />
                  ))
                }
              </IconMenu>
            </RightAlignedActions>
          }
          overlayContentStyle={{ background: 'none' }}
        >
          <img src={imageLinks.thumbnail || imageLinks.smallThumbnail} alt={`Book cover for ${title}`} />
        </CardMedia>
        <CardTitle
          title={title}
          titleStyle={styles.title}
          subtitle={
            !authors || !authors.length
              ? null
              : (
                <ul className="authors-list">
                  {
                    authors.map((author, i) => <li key={`${title}-author-${i}`}>{author}</li>)
                  }
                </ul>
              )
          }
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

const styles = {
  title: {
    fontSize: '2rem',
  },
  organizeButton: {
    background: '#00bcd4',
    width: '5rem',
    height: '5rem',
    borderRadius: '50%',
    left: '1.5rem',
    top: '1.5rem',
  },
};

export default Book;
