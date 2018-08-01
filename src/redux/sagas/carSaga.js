import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* carGet() {
  
     try {
          let cars = yield call(axios.get, '/api/car/cars');
        //   console.log('cars',cars.data)
         yield put({
             type: 'CAR_DISPLAY',
             payload: cars.data
             
         })
     } catch (error) {}
   }

function* driverGet(action) {
//    console.log(action.payload)
    try {
         let driverId = yield call(axios.post, '/api/car/driverId', action.payload);
        yield put({
            type: 'DRIVER_ID',
            payload: driverId.data
            
        })
        yield put({
            type: 'CAR_GET',
            
        })
    } catch (error) {}
  }

function* carPost(action) {
    console.log('car saga', action.payload)
    try {
         yield call(axios.post, '/api/car/post', action.payload);

        yield put({
            type: 'CAR_GET',
            
        })
    } catch (error) {}
  }

  function* transactionPost(action) {
    console.log('transactions saga', action.payload)
    try {
         yield call(axios.post, '/api/car/transactionpost', action.payload);

        // yield put({
        //     type: 'Cars_GET',
            
        // })
    } catch (error) {}
  }

  function* carSaga() {
    yield takeEvery('CAR_POST', carPost);
    yield takeEvery('TRANSACTION_POST', transactionPost);
    yield takeEvery('DRIVER_GET', driverGet);
    yield takeEvery('CAR_GET', carGet);
    
}
export default carSaga;