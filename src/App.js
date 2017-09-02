import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookshelfView from './components/Bookshelf';
import SearchView from './components/SearchView';
import BookDetailsView from './components/BookDetails';
import { fetchSearchTerms, getAll } from './BooksAPI';
import findIndex from 'core-js/library/fn/array/find-index';
import './App.css';

class BooksApp extends React.Component {
  shelves = {
    currentlyReading: 'Now Reading',
    wantToRead: 'Read Later',
    read: 'Completed',
  }

  state = {
    allBooks: [],
    searchTerms: [],
  }

  async componentDidMount() {
    this.updateData();
  }

  async componentWillReceiveProps() {
    if (!this.state.allBooks.length) {
      this.updateData();
    }
  }
  
  updateData = async() => {
    try {
      const [searchTerms, allBooks] = await this.getData();
      this.setState({ searchTerms, allBooks });
    } catch (e) {
      return;
    }
  }

  getData = async() => {
    const searchTerms = await fetchSearchTerms();
    const allBooks = await getAll();
    return [searchTerms, allBooks];
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
    const { allBooks, searchTerms } = this.state;
    return (
      <div className="app">
        <Route path="/" component={Navbar} />
        <Route exact path="/" render={() => (
          <BookshelfView allBooks={allBooks} shelves={this.shelves} onBookReshelved={this.updateBookShelf} />
        )} />
        <Route path="/search" render={() => (
          <SearchView allBooks={allBooks} searchTerms={searchTerms} shelves={this.shelves} onBookReshelved={this.updateBookShelf} />
        )} />
        <Route path="/books/:id" component={BookDetailsView} />
      </div>
    )
  }
}

export default BooksApp;
