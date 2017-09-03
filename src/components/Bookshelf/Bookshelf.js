import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Book from 'material-ui/svg-icons/action/book';
import Books from '../Books';
import { EmptyShelf, EmptyShelfText } from '../styles';
import bookProps from '../Book/props';

class Bookshelf extends Component {
  state = {
    slideIndex: 0,
  }

  emptyShelfText = {
    currentlyReading: 'You are not reading any books right now.',
    wantToRead: 'You have not saved any books to read later.',
    read: 'You have not read any books.',
  }

  handleSlideChange = (val) => {
    this.setState({
      slideIndex: val,
    });
  }

  render() {
    const { slideIndex } = this.state;
    const { organizedBooks, shelves, ...restProps } = this.props;
    return (
      <div className="list-books-content">
        <Tabs
          onChange={this.handleSlideChange}
          value={slideIndex}
        >
          {
            Object.keys(shelves).map((s, i) => (
              <Tab
                label={shelves[s]}
                value={i}
                className="bookshelf-books"
                key={`${s}Tab`}
              />
            ))
          }
        </Tabs>
        <SwipeableViews
          index={slideIndex}
          onChangeIndex={this.handleSlideChange}
          animateHeight
        >
          {
            Object.keys(organizedBooks).map(shelf => (
              organizedBooks[shelf].length
                ? (
                  <Books
                    books={organizedBooks[shelf]}
                    key={`${shelf}Swipeable`}
                    shelves={shelves}
                    {...restProps}
                  />
                )
                : (
                  <EmptyShelf key={`${shelf}Swipeable`}>
                    <Book style={styles.emptyIcon}/>
                    <EmptyShelfText spaced>{this.emptyShelfText[shelf]}</EmptyShelfText>
                    <EmptyShelfText spaced>Organize your bookshelf.</EmptyShelfText>
                    <EmptyShelfText><Link to="/search">Or browse new books</Link>.</EmptyShelfText>
                  </EmptyShelf>
                )
            ))
          }
        </SwipeableViews>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  organizedBooks: PropTypes.shape({
    shelf: PropTypes.arrayOf(bookProps),
  }),
  onBookReshelved: PropTypes.func,
  openSnackbar: PropTypes.func,
};

const styles = {
  emptyIcon: {
    color: '#fff',
    height: 48,
    width: 48,
    background: '#ccc',
    borderRadius: '50%',
    padding: '1rem',
  },
};

export default Bookshelf;
