import React from 'react';
import { Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Bookshelf from './components/Bookshelf';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    allBooks: [],
  }

  async componentDidMount() {
    const allBooks = await BooksAPI.getAll();
    this.setState({ allBooks });
  }

  updateBookShelf = (newBook) => {
    const { allBooks } = this.state;
    const indexOfUpdated = allBooks.findIndex(book => book.id === newBook.id);
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
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp;
