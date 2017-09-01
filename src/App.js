import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Bookshelf from './components/Bookshelf';
import SearchView from './components/SearchView';
import * as BooksAPI from './BooksAPI';
import findIndex from 'core-js/library/fn/array/find-index';
import './App.css';

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    searchTerms: [],
  }

  async componentDidMount() {
    const { fetchSearchTerms, getAll } = BooksAPI;
    const searchTerms = await fetchSearchTerms();
    const allBooks = await getAll();
    this.setState({ allBooks, searchTerms });
  }

  updateBookShelf = (newBook) => {
    const { allBooks } = this.state;
    const indexOfUpdated = findIndex(allBooks, book => book.id === newBook.id);
    const updatedBooks = [...allBooks];
    updatedBooks.splice(indexOfUpdated, 1, newBook);
    this.setState({
      allBooks: updatedBooks,
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/" component={Navbar} />
        <Route exact path="/" render={() => (
          <Bookshelf allBooks={this.state.allBooks} onBookReshelved={this.updateBookShelf} />
        )} />
        <Route path="/search" render={() => (
          <SearchView searchTerms={this.state.searchTerms} />
        )} />
      </div>
    )
  }
}

export default BooksApp;
