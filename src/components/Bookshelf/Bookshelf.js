import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import Books from '../Books';
import { EmptyShelf, EmptyShelfText } from '../styles';

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
    const { organizedBooks, onBookReshelved, shelves } = this.props;
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
        >
          {
            Object.keys(organizedBooks).map(shelf => (
              organizedBooks[shelf].length
                ? <Books
                  books={organizedBooks[shelf]}
                  shelves={shelves}
                  onBookReshelved={onBookReshelved}
                  key={`${shelf}Swipeable`}
                />
                : (
                  <EmptyShelf key={`${shelf}Swipeable`}>
                    <BookmarkBorder style={styles.emptyIcon}/>
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
    shelf: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ),
  }),
  onBookReshelved: PropTypes.func,
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
