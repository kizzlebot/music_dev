import ActionTypes from '../constants';
import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
var spotify = require('../Spotify.js');


const search = ({query='', type='album'}) => spotify.search({type:type, query:query});
const lookup = ({id='', type='album', ids=[]}, queryEx) => spotify.lookup({type:type, id:id, ids:ids}, queryEx);


function requestSearch(opt){
  return {
    type: ActionTypes.spotify.REQUEST_SEARCH,
    payload:{
      ...opt
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

function receiveSearch(d){
  return {
    type: ActionTypes.spotify.RECEIVE_SEARCH,
    payload:{
      ...d
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
            .then(rec => {
              rec.albums = rec.albums.reduce((prev,curr,i,arr) => {
                if (prev.indexOf(curr) == -1) prev.push(curr);
                return prev ;
              }, []);
              return rec ;
            })
            .then(results => dispatch(receiveLookup({
              type:'artist',
              artist:Object.assign({}, {...results}),
            })))

            // .then(e =>       dispatch({type:ActionTypes.spotify.LOOKUP_ARTIST}))
            .catch(err =>    dispatch(fetch_fail(err)));
  }
}


export function lookupArtistAlbums(artistID){
  return (dispatch, getState) => {
    dispatch(requestLookup({type:'artist', id:artistID}));
    return lookup({type:'albums', id:artistID})
              .then(results => dispatch(receiveLookup({
                type:'artist_albums',
                artist: { ...getState().spotify.current.artist, albums:Object.assign({}, {...results})},
              })))
              .then(e =>       dispatch({type:ActionTypes.spotify.LOOKUP_ARTIST_ALBUMS}))
              .catch(err =>    dispatch(fetch_fail(err)));
  }
}



// export function lookupArtistAlbums(artistID){
//   return (dispatch, getState) => {
//     // dispatch(requestLookup({type:'artist', id:artistID}));
//     return lookupArtist(artistID)(dispatch, getState).then(() => {
//       return lookup({type:'albums', id:artistID}, {album_type:'album'})
//                 .then(results => dispatch(receiveLookup({
//                   type:'albums',
//                   artist: { ...getState().spotify.current.artist, albums:Object.assign({}, {...results})},
//                 })))
//                 .then(e =>       dispatch({type:ActionTypes.spotify.LOOKUP_ARTIST_ALBUMS}))
//                 .catch(err =>    dispatch(fetch_fail(err)));
//     })
//   }
// }

export function lookupAlbum(albumID){
  return (dispatch, getState) => {
    // dispatch(requestLookup({type:'album', id:albumID}));
    return lookup({type:'album', id:albumID})
                .then(results => dispatch(receiveLookup({type:'albums', albums:{...results}})))
                .then(e =>       dispatch({type:ActionTypes.spotify.LOOKUP_ARTIST_ALBUMS}))
                .catch(err =>    dispatch(fetch_fail(err)));
  }
}
export function lookupAlbums(albumID){
  return (dispatch, getState) => {
    dispatch(requestLookup({type:'albums', id:albumID}));
    return lookup({type:'albums', id:albumID})
                .then(results => dispatch(receiveLookup({type:'artist_albums', albums:{...results}})))
                .then(e =>       dispatch({type:ActionTypes.spotify.LOOKUP_ALBUM}))
                .catch(err =>    dispatch(fetch_fail(err)));
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
