import React from 'react';
import { Route } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar'
import Navbar from './components/Navbar';
import BookshelfView from './components/Bookshelf';
import SearchView from './components/SearchView';
import BookDetailsView from './components/BookDetails';
import { getAll } from './BooksAPI';
import findIndex from 'core-js/library/fn/array/find-index';
import './App.css';

class BooksApp extends React.Component {
  // readable aliases for the shelves
  shelves = {
    currentlyReading: 'Now Reading',
    wantToRead: 'Read Later',
    read: 'Completed',
  }

  state = {
    allBooks: [],
    snackbarOpen: false,
    snackbarMessage: '',
  }

  componentDidMount() {
    this.updateData();
  }

  componentWillReceiveProps() {
    // rerequest data if it is somehow missing
    if (!this.state.allBooks.length) {
      this.updateData();
    }
  }
  
  updateData = async() => {
    try {
      const allBooks = await this.getData();
      this.setState({ allBooks });
    } catch (e) {
      this.openSnackbar('Bookshelf did not load. Refresh app or return later.')
    }
  }

  getData = async() => {
    const allBooks = await getAll();
    return allBooks;
  }

  updateBookShelf = (newBook) => {
    // updates the shelf value of a book in state
    const { allBooks } = this.state;
    // finds the book object0
    const indexOfUpdated = findIndex(allBooks, book => book.id === newBook.id);
    const updatedBooks = [...allBooks];
    // splices the new book data into the array
    updatedBooks.splice(indexOfUpdated, 1, newBook);
    this.setState({
      allBooks: updatedBooks,
    });
  }

  openSnackbar = (message) => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: message,
    })
  }

  closeSnackbar = () => {
    this.setState({
      snackbarOpen: false,
      snackbarMessage: '',
    });
  }

  render() {
    const { allBooks } = this.state;
    return (
      <div className="app">
        <Route path="/" component={Navbar} />
        <Route exact path="/" render={() => (
          <BookshelfView
            allBooks={allBooks}
            shelves={this.shelves}
            onBookReshelved={this.updateBookShelf}
            openSnackbar={this.openSnackbar}
          />
        )} />
        <Route path="/search" render={() => (
          <SearchView
            allBooks={allBooks}
            shelves={this.shelves}
            onBookReshelved={this.updateBookShelf}
            openSnackbar={this.openSnackbar}
          />
        )} />
        <Route path="/books/:id" render={(routeProps) => (
          <BookDetailsView
            match={routeProps.match}
            openSnackbar={this.openSnackbar}
          />
        )} />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    )
  }
}

export default BooksApp;
