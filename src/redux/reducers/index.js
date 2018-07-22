import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import driverIdGetReducer from './driverIdReducer';

const store = combineReducers({
  user,
  login,
  driverIdGetReducer
});

export default store;
