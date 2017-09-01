import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Sort from 'material-ui/svg-icons/content/sort';
import Card, { CardTitle, CardMedia } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { RightAlignedActions } from './styles';

class Book extends Component {
  state = {
    open: false,
    shelf: '',
  }

  handleStatusSelect = (e, val) => {
    this.setState({
      shelf: val,
    });
  } 

  render() {
    const { imageLinks, title, author, shelf, shelves } = this.props;
    return (
      <Card className="book">
        <CardMedia>
          <img src={imageLinks.thumbnail || imageLinks.smallThumbnail} alt={`Book cover for ${title}`} />
        </CardMedia>
        <CardTitle title={title} subtitle={author} />
        <RightAlignedActions>
          <div>
            <IconMenu
              iconButtonElement={<IconButton><Sort /></IconButton>}
              value={this.state.shelf}
              onChange={this.handleStatusSelect}
            >
              <MenuItem value={null} disabled>Move to:</MenuItem>
              {
                Object.keys(shelves).map(s => (
                  <MenuItem
                    value={s}
                    onClick={this.handleRequestClose}
                    selected={shelf === s}
                    key={`${title}-menu-${s}`}
                    primaryText={shelves[s]}
                  />
                ))
              }
            </IconMenu>
          </div>
        </RightAlignedActions>
      </Card>
    );
  }
}

Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string,
  }),
};

export default Book;
