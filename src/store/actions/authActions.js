import { LOGIN, SETUSER, LOGOUT, LOGIN_FAILED } from './types';

import { auth } from '../../config/fbConfig'

export const login = (email, password) => dispatch => {
  auth.signInWithEmailAndPassword(email, password).then(res => {
    dispatch({
      type: LOGIN,
      payload: res
    })
  }).catch(e => {
    dispatch({
      type: LOGIN_FAILED,
      payload: e.message
    })
  })
}

export const logout = () => dispatch => {
  auth.signOut().then(res => {
    dispatch({
      type: LOGOUT,
      payload: null
    })
  })
}

export const setUser = () => dispatch => {
  let user = JSON.parse(localStorage.getItem('user'))
  dispatch({
    type: SETUSER,
    payload: (user) ? user : null 
  })
}

