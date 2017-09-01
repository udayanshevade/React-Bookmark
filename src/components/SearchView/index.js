import React, { Component } from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import TextField from 'material-ui/TextField';
import SearchTermsTray from './searchTermsTray';
import { EmptyShelf, EmptyShelfText } from '../Bookshelf/styles';

class SearchView extends Component {
  render() { 
    const { searchResults = [], searchTerms = [] } = this.props;
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
            />
          </ToolbarGroup>
        </Toolbar>
        {
          searchResults.length
            ? <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
            : <SearchTermsTray searchTerms={searchTerms} />
        }
      </div>
    );
  }
}

export default SearchView;
