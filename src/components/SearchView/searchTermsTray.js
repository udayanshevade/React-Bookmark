import React from 'react';
import Chip from 'material-ui/Chip';
import { EmptyShelf, EmptyShelfText } from '../styles';
import { SearchTermsContainer } from './styles';

const SearchTermsTray = ({ searchTerms }) => (
  !searchTerms.length
    ? <span />
    : <EmptyShelf>
      <EmptyShelfText spaced>Find a book to add to your collection.</EmptyShelfText>
      <EmptyShelfText>Use one of the search terms below.</EmptyShelfText>
      <SearchTermsContainer>
        {
          searchTerms.map((term, i) => (
            <Chip
              key={`search-term-${i}`}
              style={{ margin: '0.5rem' }}
              backgroundColor="#00bcd4"
              labelColor="#fff"
            >
              {term}
            </Chip>
          ))
        }
      </SearchTermsContainer>
    </EmptyShelf>
);

export default SearchTermsTray;
