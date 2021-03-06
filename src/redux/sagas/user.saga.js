import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
    yield put({type:'FETCH_PLAY_META', payload: {joinCode: response.data.troupe_code}});
    yield put({type: 'FETCH_PLAYERS', payload: {joinCode: response.data.troupe_code}});
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* updateUser(action) {
  try {
    yield axios.put(`/api/user/${action.payload.userId}`, action.payload);
  } catch (error) {
    console.log('error updating actor\'s troupe membership', error);
  }
}

function* fetchPlayers(action) {
  try {
    const response = yield call(axios.get, `api/user/${action.payload.joinCode}`);
    yield put({type: 'SET_PLAYERS', payload:response.data});
  } catch(error) {
    console.log('error retrieving cast list', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UPDATE_USER', updateUser);
  yield takeLatest('FETCH_PLAYERS', fetchPlayers);
}

export default userSaga;
