import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
var spotify = require('../Spotify');

// worker Saga: will be fired on ARTIST_FETCH_REQUESTED actions
function* searchArtist(action) {
   try {
      const user = yield call(spotify.search, {...action.payload});
      yield put({type: "ARTIST_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "ARTIST_FETCH_FAILED", message: e.message});
   }
}



/*
  Alternatively you may use takeLatest.
  Does not allow concurrent fetches of user. If "ARTIST_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/

function* mySaga() {
  yield* takeLatest("ARTIST_FETCH_REQUESTED", searchArtist);
}
