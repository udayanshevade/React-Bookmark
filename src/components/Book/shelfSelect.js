import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Reorder from 'material-ui/svg-icons/action/reorder';

const ShelfSelect = ({ shelf, shelves, title, onShelfSelect }) => (
  <IconMenu
    iconButtonElement={
      <IconButton style={styles.organizeButton}>
        <Reorder color="#fff" />
      </IconButton>}
    value={shelf}
    onClick={(e) => { e.preventDefault(); }}
    onChange={onShelfSelect}
    style={styles.iconMenuStyle}
    selectedMenuItemStyle={styles.selectedMenuItem}
  >
    <MenuItem value={null} disabled>Move to...</MenuItem>
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
    <MenuItem value="None" selected={shelf === 'None'} primaryText="None" />
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
    left: '2rem',
    top: '1.5rem',
  },
  iconMenuStyle: { margin: 0 },
  selectedMenuItem: { background: 'rgba(150, 150, 150, 0.3)' }
};

export default ShelfSelect;
