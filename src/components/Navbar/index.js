import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Book from 'material-ui/svg-icons/action/book';

const Navbar = () => (
    <AppBar
      iconElementLeft={
        <Link to={`${process.env.PUBLIC_URL}/`}>
          <IconButton>
            <Book color="#fff" />
          </IconButton>
        </Link>
      }
      title={<Link to={`${process.env.PUBLIC_URL}/`}>Bookmark</Link>}
    />
);

export default Navbar;
