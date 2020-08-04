import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { update } from '../store/actions/sideNavActions';
import { setUser } from '../store/actions/authActions';
import { SideNav, Header } from '../components';
import { Redirect } from 'react-router-dom';
import { SIDENAV_WIDTH as drawerWidth } from '../config';
import Routes from '../routes';
import { CssBaseline } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Layout = ({open, user, setUser}) => {
  const classes = useStyles();

  if(JSON.parse(localStorage.getItem('user'))){
    if(!user){
      setUser();
    }
  }else{
    return <Redirect to="/login"/>
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header/>
      <SideNav/>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader}/>
        <Routes/>
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  open: state.sideNav.open,
  user: state.auth.user
})


export default connect(mapStateToProps, {update, setUser})(Layout);