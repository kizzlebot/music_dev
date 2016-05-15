import ActionTypes from '../constants';
import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
var spotify = require('isomorphic-spotify');


const search = ({query='', type='album'}) => spotify.search({type:type, query:query});

function requestSearch(opt){
  return {
    type: ActionTypes.spotify.REQUEST_SEARCH,
    payload:{
      ...opt
    }
  }
}

function receiveSearch(d){
  return {
    type: ActionTypes.spotify.RECEIVE_SEARCH,
    payload:{
      ...d
    }
  }
}

export function searchArtist(artistName){
  return (dispatch, getState) => {
    dispatch(requestSearch({type:'artist', query:artistName}));
    return search({type:'artist', query:artistName})
                  .then(results => dispatch(receiveSearch({type:'artist', artists:results.artists})))
                  .then(e => dispatch({type:ActionTypes.spotify.SEARCH_ARTIST, payload:{...getState()}}))
                  .catch(err => dispatch(fetch_fail(err)));
  }
}
export function searchAlbum(albumName){
  return (dispatch, getState) =>{
    dispatch(requestSearch({type:'album', query:albumName}));
    return spotify.search({type:'album', query:albumName})
                  .then(results => dispatch(receiveSearch({type:'album', albums:results.albums})))
                  .catch(err => dispatch(fetch_fail(err)));
  }
}
export function searchTrack(trackName){
  return (dispatch, getState) => {
    dispatch(requestSearch({type:'track', query:trackName}));
    return search({type:'track', query:trackName})
                .then(results => dispatch(receiveSearch({type:'track', tracks:results.tracks})))
                .catch(err => dispatch(fetch_fail(err)));
  }
}



function fetch_success(payload){
  return {
    type: ActionTypes.spotify.FETCH_SUCCESS,
    payload: payload
  }
}


function fetch_fail(error){
  return {
    type: ActionTypes.spotify.FETCH_FAIL,
    payload: {
      error: error
    }
  }
}
