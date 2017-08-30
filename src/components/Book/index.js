import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle, CardText, CardMedia, CardActions } from 'material-ui/Card';
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
        <CardMedia className="book-top">
          <div className="book-cover" style={{ width: 140, height: 193, backgroundImage: `url("${image}")` }}></div>
        </CardMedia>
        <CardTitle>{title}</CardTitle>
        <CardText>{author}</CardText>
        <CardActions>
          <div>
            <RaisedButton onClick={this.handleTouchTap} label="Status" />
            <Popover
              open={open}
              anchorEl={anchorEl}
              onRequestClose={this.handleRequestClose}
            >
              <Menu>
                <MenuItem value="none" disabled>Move to...</MenuItem>
                <MenuItem value="currentlyReading">Currently Reading</MenuItem>
                <MenuItem value="wantToRead">Want to Read</MenuItem>
                <MenuItem value="read">Read</MenuItem>
                <MenuItem value="none">None</MenuItem>
              </Menu>
            </Popover>
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
