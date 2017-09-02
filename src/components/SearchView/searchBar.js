import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import TextField from 'material-ui/TextField';

const Searchbar = ({ query, updateQuery }) => (
  <Toolbar>
    <ToolbarGroup>
      <Link to="/"><IconButton><ArrowBack color="#00bcd4" /></IconButton></Link>
    </ToolbarGroup>
    <ToolbarGroup style={{ width: '100%' }}>
      <TextField
        hintText="Enter a name or a keyword."
        id="search-books-input"
        fullWidth
        value={query}
        onChange={updateQuery}
      />
    </ToolbarGroup>
  </Toolbar>
);

Searchbar.propTypes = {
  query: PropTypes.string,
  updateQuery: PropTypes.func,
};

export default Searchbar;
