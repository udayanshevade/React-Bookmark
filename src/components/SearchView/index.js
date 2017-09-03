import React, { Component } from 'react';
import Searchbar from './searchBar';
import SearchTermsTray from './searchTermsTray';
import SearchResults from './searchResults';
import { search } from '../../BooksAPI';

class SearchView extends Component {
  state = {
    query: '',
    results: [],
    queryTimeoutId: null,
    QUERY_TIMEOUT: 750,
    loadingResults: false,
  }

  search = async(q) => {
    const { allBooks } = this.props;
    let results;
    try {
      results = q.length ? await search(q) : [];
      // default empty data if there was an error with the request
      if (results.error) results = [];
      for (var result of results) {
        let isMatch;
        for (var b of allBooks) {
          isMatch = b.id === result.id;
          if (isMatch) {
            // include shelf value for any saved book
            result.shelf = b.shelf;
            break;
          }
        }
      }
    } catch (e) {
      results = [];
    }
    this.setState({
      results,
      loadingResults: false,
    });
  }

  updateQuery = (e, val) => {
    // performs query on a delay to prevent overloading requests
    // gives user time to finish typing
    const { QUERY_TIMEOUT, queryTimeoutId } = this.state;
    // cancel existing query timeout
    clearTimeout(queryTimeoutId);
    this.setState({
      query: val,
      queryTimeoutId: setTimeout(() => {
        // activate new timeout for loading results
        this.setState({
          loadingResults: true,
        });
        this.search(val);
      }, QUERY_TIMEOUT),
    });
  }

  render() {
    const { searchTerms = [], shelves, onBookReshelved } = this.props;
    const { query, results, loadingResults } = this.state;
    return (
      <div className="search-books">
        <Searchbar query={query} updateQuery={this.updateQuery} />
        {
          loadingResults || results.length
            ? <SearchResults
                books={results}
                shelves={shelves}
                onBookReshelved={onBookReshelved}
                loadingResults={loadingResults}
              />
            : <SearchTermsTray searchTerms={searchTerms} />
        }
      </div>
    );
  }
}

export default SearchView;
