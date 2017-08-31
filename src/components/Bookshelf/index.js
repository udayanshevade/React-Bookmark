import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import ContentAdd from 'material-ui-icons/Add';
import PropTypes from 'prop-types';
import Book from '../Book';

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
                <Grid
                  container
                  key={shelf.label.split(' ').join('-')}
                >
                  {
                    shelf.books.map(book => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={2}
                        key={book.title.toUpperCase().split(' ').join('-')}
                      >
                        <Book {...book} />
                      </Grid>
                    ))
                  }
                </Grid>
              ))
            }
          </SwipeableViews>
        </div>
        <Button fab href="/search">
          <ContentAdd />
        </Button>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  books: PropTypes.array,
};

export default Bookshelf;
