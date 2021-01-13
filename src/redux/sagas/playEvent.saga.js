import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

export default function* playEventSaga() {
    yield takeLatest('POST_PLAY_EVENT', postPlayEvent);
    yield takeLatest('FETCH_PLAY_EVENT', fetchPlayEvent);
    yield takeLatest('FETCH_ALL_PLAY_EVENTS', fetchAllPlayEvents);
    yield takeLatest('DELETE_PLAY_EVENT', deletePlayEvent);
    yield takeLatest('DELETE_TROUPE', deleteTroupe);
}

function* postPlayEvent (action) {
    try{ 
        yield call(axios.post, '/api/play-event', action.payload);
        yield put({type: 'FETCH_PLAY_EVENT', payload: action.payload});
    } catch(error) {
        console.log('error posting play event instance', error);
    }
}

function* deletePlayEvent(action) {
    try {
        yield call(axios.put, `/api/play-event`, action.payload);
    }catch(error){
        console.log('error deleting play event', error);
    }
}

function* deleteTroupe(action) {
    try {
        console.log('join_code=', action.payload.joinCode)
        yield call(axios.delete, `api/play-event/${action.payload.joinCode}`);
    }catch(error){
        console.log('error deleting play event', error);
    }
}

function* fetchPlayEvent (action) {
    try{
        const response = yield call(axios.get, `/api/play-event/${action.payload.joinCode}`);
        yield put({type: 'SET_PLAY_EVENT', payload: response.data});
    }  catch(error) {
        console.log('error retrieving play instance', error);
    }
}

function* fetchAllPlayEvents (action) {
    try {
        const response = yield call(axios.get, `/api/play-event`);
        yield put({type: 'SET_ALL_PLAY_EVENTS', payload: response.data});
    } catch(error) {
        console.log('error retrieving play instance', error);
    }
}