import { combineReducers } from 'redux';
import authReducer from './authReducer';
import sideNavReducer from './sideNavReducer';
import adReducer from './adReducer';

export default combineReducers({
  auth: authReducer,
  sideNav: sideNavReducer,
  ad: adReducer
})