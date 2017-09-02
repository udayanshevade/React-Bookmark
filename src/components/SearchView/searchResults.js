import React from 'react';
import Books from '../Books';

const SearchResults = props => (
  <div className="search-books-results">
    <Books {...props} />
  </div>
);

export default SearchResults;
