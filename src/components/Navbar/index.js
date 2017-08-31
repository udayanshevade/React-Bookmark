import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const Navbar = () => (
    <AppBar position="static">
        <Toolbar>
            <Typography type="title">Bookmarker</Typography>
        </Toolbar>
    </AppBar>
);

export default Navbar;
