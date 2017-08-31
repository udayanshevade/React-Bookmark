import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Books from '../Books';

class Bookshelf extends Component {
  state = {
    slideIndex: 0,
  }

  shelves = {
    currentlyReading: 'Now Reading',
    wantToRead: 'Read Later',
    read: 'Completed',
  }

  handleSlideChange = (e, val) => {
    this.setState({
      slideIndex: val,
    });
  }

  render() {
    const { slideIndex } = this.state;
    const { books } = this.props;
    return (
      <div className="list-books-content">
        <AppBar position="static">
          <Tabs
            onChange={this.handleSlideChange}
            value={slideIndex}
            centered
          >
            {
              Object.keys(this.shelves).map((s, i) => (
                <Tab
                  label={this.shelves[s]}
                  value={i}
                  className="bookshelf-books"
                  key={`${s}Tab`}
                />
              ))
            }
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={slideIndex}
          onChangeIndex={this.handleSlideChange}
        >
          {
            Object.keys(books).map(shelf => (
              <Books
                books={books[shelf]}
                shelves={this.shelves}
                key={shelf.split(' ').join('-')}
              />
            ))
          }
        </SwipeableViews>
      </div>
    );
  }
}

export default Bookshelf;
