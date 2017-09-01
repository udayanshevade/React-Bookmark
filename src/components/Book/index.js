import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Sort from 'material-ui-icons/Sort';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { RightAlignedActions } from './styles';

class Book extends Component {
  state = {
    open: false,
  }

  handleTouchTap = (e) => {
    e.preventDefault();
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const { open, anchorEl } = this.state;
    const { imageLinks, title, author, shelf, shelves } = this.props;
    return (
      <Card className="book">
        <CardMedia
          image={imageLinks.thumbnail || imageLinks.smallThumbnail}
          title={title}
          className="book-top"
        />
        <CardContent>
          <Typography type="headline" component="h2">{title}</Typography>
          <Typography component="p">{author}</Typography>
        </CardContent>
        <RightAlignedActions>
          <div>
            <IconButton onClick={this.handleTouchTap}>
              <Sort />
            </IconButton>
            <Menu
              open={open}
              anchorEl={anchorEl}
              onRequestClose={this.handleRequestClose}
            >
              <MenuItem value={null} disabled>Move to...</MenuItem>
              {
                Object.keys(shelves).map(s => (
                  <MenuItem
                    value={s}
                    onClick={this.handleRequestClose}
                    selected={shelf === s}
                    key={`${title}-menu-${s}`}
                  >
                    {shelves[s]}
                  </MenuItem>
                ))
              }
            </Menu>
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
