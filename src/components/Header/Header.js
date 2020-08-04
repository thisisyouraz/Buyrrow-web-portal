import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import { Menu as MenuIcon } from '@material-ui/icons';
import { update } from '../../store/actions/sideNavActions';
import { SIDENAV_WIDTH as drawerWidth } from '../../config';


const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
}));

const Header = ({open, update, user}) => {
  const classes = useStyles();
  console.log(user)
  return ( 
    <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => update(open)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {"Dashboard"}
          </Typography>
        </Toolbar>
      </AppBar>
  );
}

const mapStateToProps = state => ({
  open: state.sideNav.open,
  user: state.auth.user
})

export default connect(mapStateToProps, {update})(Header);