import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Grid from 'material-ui/Grid';
import ContentAdd from 'material-ui-icons/Add';
import PropTypes from 'prop-types';
import Book from '../Book';
import { PaddedGrid, SearchButton } from './styles';

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
                <PaddedGrid
                  container
                  key={shelf.label.split(' ').join('-')}
                >
                  {
                    shelf.books.map(book => (
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={3}
                        lg={2}
                        key={book.title.toUpperCase().split(' ').join('-')}
                      >
                        <Book {...book} />
                      </Grid>
                    ))
                  }
                </PaddedGrid>
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
