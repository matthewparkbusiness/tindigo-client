import React from 'react';
import { withRouter, Link } from 'react-router-dom'

import { AppBar, Toolbar, IconButton, Typography, InputBase,
         Badge, MenuItem, Menu, Button, Drawer, List,
         ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    mobileMenuLink: {
      color: 'black',
      textDecoration: 'none'
    },
    desktopMenuLink: {
      color: 'white',
      textDecoration: 'none'
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  }));

function Header(props) {
  const classes = useStyles();
  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [sideBar, setSideBar] = React.useState(false)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLoggedIn = Boolean(window.sessionStorage.username)

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSideBar(open);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link className={classes.mobileMenuLink} to='/'>
          <ListItem button key='Home'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </Link>
        {
          isLoggedIn ? (
            <Link className={classes.mobileMenuLink} to='/profile'>
              <ListItem button key='Profile'>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary='Profile' />
              </ListItem>
            </Link>
          ) : ''
        } {
          isLoggedIn ? (
            <Link className={classes.mobileMenuLink} to='/post/create'>
              <ListItem button key='Create Posts'>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText primary='Create Posts' />
              </ListItem>
            </Link>
          ) : ''
        }
      </List>
    </div>
  );

  const renderSideBar = () => {
    return (
      <div>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={sideBar} onClose={toggleDrawer(false)}>
          {sideList()}
        </Drawer>
      </div>
    )
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const redirectToTarget = (path) => {
    props.history.push(path);
  }

  const handleLogout = () => {
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('username')
    redirectToTarget('/')
  }

  const renderMobileMenu = () => {
    if (isLoggedIn) {
      return (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={handleLogout}>
            <IconButton color="inherit">
              <Badge color="secondary">
                <ExitToAppIcon />
              </Badge>
            </IconButton>
            <p>Logout</p>
          </MenuItem>
        </Menu>
      )
    }
    else {
      return (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <Link className={classes.mobileMenuLink} to='/login'>
            <MenuItem>
              <IconButton color="inherit">
                <Badge color="secondary">
                  <ExitToAppIcon />
                </Badge>
              </IconButton>
              <p>Login</p>
            </MenuItem>
          </Link>
          <Link className={classes.mobileMenuLink} to='/signup'>
            <MenuItem>
              <IconButton color="inherit">
                <Badge color="secondary">
                  <PersonAddIcon />
                </Badge>
              </IconButton>
              <p>Sign Up</p>
            </MenuItem>
          </Link>
        </Menu>
      )
    }
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          
          {renderSideBar()}

          <Typography className={classes.title} variant="h6" noWrap>
            Tindigo
          </Typography>
          <div className={classes.search}>
          <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                    window.location.href="/search?query=" + ev.target.value
                }
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={classes.grow} />

          {isLoggedIn ? (

            <div className={classes.sectionDesktop}>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </div>

          ) : (

            <div className={classes.sectionDesktop}>
              <Link className={classes.desktopMenuLink} to='/login'>
                <Button color="inherit">
                    Login
                </Button>
              </Link>

              <Link className={classes.desktopMenuLink} to='/signup'>
                <Button color="inherit">
                    Sign Up
                </Button>
              </Link>
            </div>

          )}

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu()}
    </div>
  );
}

export default withRouter(Header);