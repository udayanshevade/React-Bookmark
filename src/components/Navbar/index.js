import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';

const Navbar = () => (
    <AppBar iconElementLeft={<IconButton><BookmarkBorder /></IconButton>} title="Bookmarks" />
);

export default Navbar;
