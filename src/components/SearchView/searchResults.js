import React from 'react';
import Books from '../Books';
import { Loading } from '../styles';

const SearchResults = props => (
  props.loadingResults
    ? <Loading />
    : <div className="search-books-results">
      <Books {...props} />
    </div>
);

export default SearchResults;
