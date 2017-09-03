import React from 'react';
import PropTypes from 'prop-types';
import Books from '../Books';
import { Loading } from '../styles';

const SearchResults = ({ loading, ...restProps}) => (
  loading
    ? <Loading />
    : <div className="search-books-results">
      <Books {...restProps} />
    </div>
);

SearchResults.propTypes = {
  loading: PropTypes.bool,
};

export default SearchResults;
