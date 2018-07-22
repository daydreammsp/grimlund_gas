import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import driverIdGetReducer from './driverIdReducer';
import carsGetReducer from './carsReducer';

const store = combineReducers({
  user,
  login,
  driverIdGetReducer,
  carsGetReducer
});

export default store;
