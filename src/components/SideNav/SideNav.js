import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  ListSubheader
} from '@material-ui/core'
import { connect } from 'react-redux';
import { update } from '../../store/actions/sideNavActions';
import { logout } from '../../store/actions/authActions';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExitToApp as SignOutIcon,
  LockOpen as LockOpenIcon,
  Home as HomeIcon
} from '@material-ui/icons';
import { SIDENAV_WIDTH as drawerWidth } from '../../config'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
}));

const SideNav = ({ open, update, logout }) => {
  const classes = useStyles();
  const theme = useTheme();


  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => update(open)}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link to="/">
          <ListItem>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
        <Link to='/dashboard/approval'>
          <ListItem button>
            <ListItemIcon><LockOpenIcon /></ListItemIcon>
            <ListItemText primary={"Approve Ads"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Logout Options
        </ListSubheader>
      }>
        <ListItem onClick={() => logout()} button>
          <ListItemIcon><SignOutIcon /></ListItemIcon>
          <ListItemText primary={"Sign Out"} />
        </ListItem>
      </List>
    </Drawer>
  );
}

const mapStateToProps = state => ({
  open: state.sideNav.open,
})

export default connect(mapStateToProps, { update, logout })(SideNav);