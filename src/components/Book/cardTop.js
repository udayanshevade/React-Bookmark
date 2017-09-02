import React from 'react';
import PropTypes from 'prop-types';
import { CardMedia } from 'material-ui/Card';
import ShelfSelect from './shelfSelect';
import { RightAlignedActions } from './styles';

const CardTop = ({ images, title, ...restProps }) => (
  <CardMedia
    overlay={
      <RightAlignedActions>
        <ShelfSelect {...restProps} />
      </RightAlignedActions>
    }
    overlayContentStyle={{ background: 'none' }}
  >
    <img src={images.thumbnail || images.smallThumbnail} alt={`Book cover for ${title}`} />
  </CardMedia>
);

CardTop.propTypes = {
  images: PropTypes.shape({
    thumbnail: PropTypes.string,
  }),
  title: PropTypes.string,
  onShelfSelect: PropTypes.func,
  shelves: PropTypes.shape({
    currentlyReading: PropTypes.string,
  }),
};

export default CardTop;
