import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: "30px"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: "left"
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

export default function MenuAppBar({ isLoggedIn, setIsLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false)
    const classes = useStyles();

    const toggleDrawer = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsOpen(open)
    };

    const Pusher = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <List>
                <ListItem button>
                    <ListItemIcon>{2 % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary="test" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>{2 % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary="test" />
                </ListItem>
            </List>
        </div>
    );

    const handleLogout = e => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon onClick={e => setIsOpen(true)} />
                    </IconButton>
                    <div className={classes.title}>
                        <Link to="/" style={{ textDecoration: "none", color: "white" }} >
                            <img src={`${process.env.PUBLIC_URL}/cave-192.png`} width="35" height="35" alt="Pitch Black Logo" />
                        </Link>
                    </div>
                    {isLoggedIn ? (
                        <div>
                            <ButtonGroup color="secondary" variant="contained">
                                <Button color="secondary" onClick={handleLogout}>Log Out</Button>
                            </ButtonGroup>
                        </div>
                    ) : (
                            <ButtonGroup color="secondary" variant="contained">
                                <Button component={Link} to="/login">Log In</Button>
                                <Button component={Link} to="/signup">Sign Up</Button>
                            </ButtonGroup>
                        )}
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={isOpen} onClose={() => toggleDrawer(false)}>
                <Pusher />
            </Drawer>
        </div>
    );
}