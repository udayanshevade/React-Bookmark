import PropTypes from 'prop-types';

const bookProps = PropTypes.shape({
  title: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string),
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string,
  }),
  previewLink: PropTypes.string,
  description: PropTypes.description,
});

export default bookProps;
