import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import driverIdGetReducer from './driverIdReducer';
import carsGetReducer from './carsReducer';
import toggleInfoReducer from './toggleInfo';

const store = combineReducers({
  user,
  login,
  driverIdGetReducer,
  carsGetReducer,
  toggleInfoReducer
});

export default store;
