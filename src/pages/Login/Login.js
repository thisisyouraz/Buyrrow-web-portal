import React, {useState, useEffect} from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { login, setUser } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  Typography, 
  TextField, 
  CssBaseline, 
  Button, 
  Avatar, 
  Container 
} from '@material-ui/core'
import { Alert } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const classes = useStyles();

  useEffect(() => {
    if(!props.user){
      props.setUser()
    }
  },[])

  const signIn = (event) => {
    event.preventDefault()
    props.login(user.email, user.password);
  }

  if(localStorage.getItem('user')){
    return <Redirect to='/'/>
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {(props.err) ? 
          <Alert severity="error" style={{ width: '100%' }}>{props.err}</Alert>:null
        }
        <form className={classes.form} noValidate onSubmit={signIn}>
          <TextField
            variant="outlined"
            margin="normal"
            value={user.email}
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value
              })
            }}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={user.password}
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value
              })
            }}
            id="password"
            autoComplete="current-password"
          />  
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
  err: state.auth.loginErr
})

export default connect( mapStateToProps, {login, setUser})(Login)