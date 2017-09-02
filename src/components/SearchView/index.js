import React, { Component } from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import TextField from 'material-ui/TextField';
import SearchTermsTray from './searchTermsTray';
import SearchResults from './searchResults';
import { search } from '../../BooksAPI';

class SearchView extends Component {
  state = {
    query: '',
    results: [],
    queryTimeoutId: null,
    QUERY_TIMEOUT: 1500,
  }

  search = async(q) => {
    const { allBooks } = this.props;
    const results = q.length ? await search(q) : [];
    for (var result of results) {
      let isMatch;
      for (var b of allBooks) {
        isMatch = b.id === result.id;
        if (isMatch) {
          result.shelf = b.shelf;
          break;
        }
      }
    }
    this.setState({
      results,
    });
  }

  updateQuery = (e, val) => {
    const { QUERY_TIMEOUT, queryTimeoutId } = this.state;
    clearTimeout(queryTimeoutId);
    this.setState({
      query: val,
      queryTimeoutId: setTimeout(() => {
        this.search(val);
      }, QUERY_TIMEOUT),
    });
  }

  render() {
    const { searchTerms = [], shelves, onBookReshelved } = this.props;
    const { query, results } = this.state;
    return (
      <div className="search-books">
        <Toolbar>
          <ToolbarGroup>
            <IconButton href="/"><ArrowBack color="#00bcd4" /></IconButton>
          </ToolbarGroup>
          <ToolbarGroup style={{ width: '100%' }}>
            <TextField
              hintText="Enter a name or a keyword."
              id="search-books-input"
              fullWidth
              value={query}
              onChange={this.updateQuery}
            />
          </ToolbarGroup>
        </Toolbar>
        {
          results.length
            ? <SearchResults
                books={results}
                shelves={shelves}
                onBookReshelved={onBookReshelved}
              />
            : <SearchTermsTray searchTerms={searchTerms} />
        }
      </div>
    );
  }
}

export default SearchView;
