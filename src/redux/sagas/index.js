import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import carSaga from './carSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    carSaga(),
    // watchIncrementAsync()
  ]);
}
