import ActionTypes from '../constants';
import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
var spotify = require('isomorphic-spotify');


export function search(query='', type='album'){
  // return (dispatch, getState) => {
  // dispatch(requestSearch({type,query}));
  return spotify.search({type:type, query:query});
    // .then(results => dispatch(receiveSearch({type:type, results})))
  // }
}
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
    return spotify.search({type:'artist', query:artistName})
                  .then(results => dispatch(receiveSearch({type:'artist', artists:results.artists})));
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
