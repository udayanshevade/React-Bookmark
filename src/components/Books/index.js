import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Book from '../Book';
import { PaddedGrid } from './styles';

const Books = ({ books }) => (
  <PaddedGrid container>
    {
      books.map(book => (
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          lg={2}
          key={book.title.toUpperCase().split(' ').join('-')}
        >
          <Book {...book} />
        </Grid>
      ))
    }
  </PaddedGrid>
);

Books.propTypes = {
  books: PropTypes.array,
};

export default Books;
