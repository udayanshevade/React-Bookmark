import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Searchbar from './searchBar';
import SearchTermsTray from './searchTermsTray';
import SearchResults from './searchResults';
import { fetchSearchTerms, search } from '../../BooksAPI';

class SearchView extends Component {
  state = {
    query: '',
    searchTerms: [],
    results: [],
    queryTimeoutId: null,
    QUERY_TIMEOUT: 750,
    loading: true,
  }

  async componentDidMount() {
    if (!this.state.searchTerms.length) {
      let newState = { loading: false };
      try {
        const searchTerms = await fetchSearchTerms();
        newState.searchTerms = searchTerms;
      } catch (e) {
        this.props.openSnackbar('Search terms could not be located.');
      }
      this.setState(newState);
    }
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
      loading: false,
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
          loading: true,
        });
        this.search(val);
      }, QUERY_TIMEOUT),
    });
  }

  onSelectSearchTerm = (e) => {
    this.updateQuery(e, e.target.innerHTML);
  }

  render() {
    const { shelves, onBookReshelved } = this.props;
    const { query, results, loading, searchTerms } = this.state;
    return (
      <div className="search-books">
        <Searchbar query={query} updateQuery={this.updateQuery} />
        {
          loading || results.length
            ? <SearchResults
                books={results}
                shelves={shelves}
                onBookReshelved={onBookReshelved}
                loading={loading}
              />
            : <SearchTermsTray searchTerms={searchTerms} onSelectSearchTerm={this.onSelectSearchTerm} />
        }
      </div>
    );
  }
}

SearchView.propTypes = {
  shelves: PropTypes.shape({ currentlyReading: PropTypes.string }),
  onBookReshelved: PropTypes.func,
};

export default SearchView;
