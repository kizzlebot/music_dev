import ActionTypes from '../constants';
import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
var spotify = require('isomorphic-spotify');


const search = ({query='', type='album'}) => spotify.search({type:type, query:query});
const lookup = ({id='', type='album'}) => spotify.lookup({type:type, id:id});

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
function requestLookup(opt){
  return {
    type: ActionTypes.spotify.REQUEST_LOOKUP,
    payload:{
      ...opt
    }
  }
}
function receiveLookup(d){
  return {
    type: ActionTypes.spotify.RECEIVE_LOOKUP,
    payload:{
      ...d
    }
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

export function searchArtist(artistName){
  return (dispatch, getState) => {
    dispatch(requestSearch({type:'artist', query:artistName}));
    return search({type:'artist', query:artistName})
                  .then(results => dispatch(receiveSearch({type:'artist', artists:results.artists})))
                  .then(e => dispatch({type:ActionTypes.spotify.SEARCH_ARTIST}))
                  .catch(err => dispatch(fetch_fail(err)));
  }
}
export function searchAlbum(albumName){
  return (dispatch, getState) =>{
    dispatch(requestSearch({type:'album', query:albumName}));
    return spotify.search({type:'album', query:albumName})
                  .then(results => dispatch(receiveSearch({type:'album', albums:results.albums})))
                  .then(e => dispatch({type:ActionTypes.spotify.SEARCH_ALBUM}))
                  .catch(err => dispatch(fetch_fail(err)));
  }
}
export function searchTrack(trackName){
  return (dispatch, getState) => {
    dispatch(requestSearch({type:'track', query:trackName}));
    return search({type:'track', query:trackName})
                .then(results => dispatch(receiveSearch({type:'track', tracks:results.tracks})))
                .then(e =>       dispatch({type:ActionTypes.spotify.SEARCH_TRACK}))
                .catch(err =>    dispatch(fetch_fail(err)));
  }
}


export function lookupArtist(artistID){
  return (dispatch, getState) => {
    dispatch(requestLookup({type:'artist', id:artistID}));
    return lookup({type:'artist', id:artistID})
                .then(results => dispatch(receiveLookup({type:'artist', ...results})))
                .then(e =>       dispatch({type:ActionTypes.spotify.LOOKUP_ARTIST}))
                .catch(err =>    dispatch(fetch_fail(err)));
  }
}
export function lookupAlbum(albumID){
  return (dispatch, getState) => {
    dispatch(requestLookup({type:'album', id:albumID}));
    return lookup({type:'album', id:albumID})
                .then(results => dispatch(receiveLookup({type:'album', ...results})))
                .then(e =>       dispatch({type:ActionTypes.spotify.LOOKUP_ALBUM}))
                .catch(err =>    dispatch(fetch_fail(err)));
  }
}
