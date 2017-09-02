import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Sort from 'material-ui/svg-icons/content/sort';

const ShelfSelect = ({ shelf, shelves, title, onShelfSelect }) => (
  <IconMenu
    iconButtonElement={
      <IconButton style={styles.organizeButton}>
        <Sort color="#fff" />
      </IconButton>}
    value={shelf}
    onChange={onShelfSelect}
    style={{ margin: 0 }}
  >
    <MenuItem value={null} disabled>Move to:</MenuItem>
    {
      Object.keys(shelves).map(s => (
        <MenuItem
          value={s}
          selected={shelf === s}
          key={`${title}-menu-${s}`}
          primaryText={shelves[s]}
        />
      ))
    }
  </IconMenu>
);

ShelfSelect.propTypes = {
  shelf: PropTypes.string,
  shelves: PropTypes.shape({
    shelf: PropTypes.string,
  }),
  title: PropTypes.string,
  onShelfSelect: PropTypes.func,
};

const styles = {
  organizeButton: {
    background: '#00bcd4',
    width: '4.8rem',
    height: '4.8rem',
    borderRadius: '50%',
    left: '1.5rem',
    top: '1.5rem',
  },
};

export default ShelfSelect;
