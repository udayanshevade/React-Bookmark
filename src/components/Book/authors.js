import React from 'react';
import PropTypes from 'prop-types';

const AuthorsList = ({ authors, title }) => (
  authors && authors.length
    ? <ul className="authors-list">
        {authors.map((author, i) => <li key={`${title}-author-${i}`}>{author}</li>)}
      </ul>
    : <p>Authors unavailable.</p>
);

AuthorsList.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string),
};

export default AuthorsList;
