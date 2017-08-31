import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Sort from 'material-ui-icons/Sort';
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

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
    const { image, title, author } = this.props;
    return (
      <Card className="book">
        <CardMedia
          image={image}
          title={title}
          className="book-top"
        />
        <CardContent>
          <Typography type="headline" component="h2">{title}</Typography>
          <Typography component="p">{author}</Typography>
        </CardContent>
        <CardActions>
          <div>
            <Button fab onClick={this.handleTouchTap} dense>
              <Sort />
            </Button>
            <Menu
              open={open}
              anchorEl={anchorEl}
              onRequestClose={this.handleRequestClose}
            >
              <MenuItem value="none" disabled>Move to...</MenuItem>
              <MenuItem value="currentlyReading">Now Reading</MenuItem>
              <MenuItem value="wantToRead">Read Later</MenuItem>
              <MenuItem value="read">Completed</MenuItem>
            </Menu>
          </div>
        </CardActions>
      </Card>
    );
  }
}

Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
};

export default Book;
