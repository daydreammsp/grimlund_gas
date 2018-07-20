import { call,put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
function* carPost(action) {
    console.log('car saga', action.payload)
    try {
         yield call(axios.post, '/api/car/post', action.payload);

        // yield put({
        //     type: 'Cars_GET',
            
        // })
    } catch (error) {}
  }
  function* carSaga() {
    yield takeEvery('CAR_POST', carPost);
    
}
export default carSaga;