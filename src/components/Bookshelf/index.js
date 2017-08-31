import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import ContentAdd from 'material-ui-icons/Add';
import PropTypes from 'prop-types';
import Books from '../Books';
import { SearchButton } from './styles';

class Bookshelf extends Component {
  state = {
    slideIndex: 0,
  };
  handleSlideChange = (e, val) => {
    this.setState({
      slideIndex: val,
    });
  }
  render() {
    return (
      <div className="list-books">
        <div className="list-books-content">
          <AppBar position="static">
            <Tabs
              onChange={this.handleSlideChange}
              value={this.state.slideIndex}
              centered
            >
              {
                this.props.books.map((shelf, i) => (
                  <Tab
                    label={shelf.label}
                    value={i}
                    className="bookshelf-books"
                    key={shelf.label.split(' ').join('-')}
                  />
                ))
              }
            </Tabs>
          </AppBar>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleSlideChange}
          >
            {
              this.props.books.map(shelf => (
                <Books
                  books={shelf.books}
                  key={shelf.label.split(' ').join('-')}
                />
              ))
            }
          </SwipeableViews>
        </div>
        <SearchButton fab href="/search">
          <ContentAdd />
        </SearchButton>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  books: PropTypes.array,
};

export default Bookshelf;
