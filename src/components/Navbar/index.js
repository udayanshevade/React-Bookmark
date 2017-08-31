import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import BookmarkBorder from 'material-ui-icons/BookmarkBorder';

const Navbar = () => (
    <AppBar position="static">
        <Toolbar>
            <BookmarkBorder style={{ marginRight: 10 }} /><Typography color="inherit" type="title">Bookmark</Typography>
        </Toolbar>
    </AppBar>
);

export default Navbar;
