import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';

const Navbar = () => (
    <AppBar iconElementLeft={<IconButton href="/"><BookmarkBorder /></IconButton>} title={<Link to="/">Bookmarks</Link>} />
);

export default Navbar;
