import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';

const Navbar = () => (
    <AppBar
      iconElementLeft={
        <Link to="/">
          <IconButton>
            <BookmarkBorder color="#fff" />
          </IconButton>
        </Link>
      }
      title={<Link to="/">Bookmark</Link>}
    />
);

export default Navbar;
