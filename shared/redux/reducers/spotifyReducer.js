import ActionTypes from '../constants';

var initialState = {
  "oauth_token": null,
  "currentArtist": {
  },
  "current": {
    artist:{},
    album:{},
    track: {}
  },
  "search": {
    query:'',
    tracks: [],
    artists: [],
    albums: []
  }
}


const SpotifyReducer = (state = initialState, action) => {
  if (!action || !action.type) return state ;

  switch(action.type){
    case ActionTypes.spotify.SEARCH_ARTIST:
      return Object.assign({}, state, { search:Object.assign({}, state.search, { ...action.payload })});
    case ActionTypes.spotify.SEARCH_ALBUM:
      return Object.assign({}, state, { search:Object.assign({}, state.search, { ...action.payload })});
    case ActionTypes.spotify.SEARCH_TRACK:
      return Object.assign({}, state, { search:Object.assign({}, state.search, { ...action.payload })});
    case ActionTypes.spotify.REQUEST_SEARCH:
      return Object.assign({}, state, { search:Object.assign({}, state.search, { ...action.payload })});
    case ActionTypes.spotify.RECEIVE_SEARCH:
      return Object.assign({}, state, { search:Object.assign({}, state.search, { ...action.payload })});


    case ActionTypes.spotify.LOOKUP_ARTIST:
      return Object.assign({}, state, { current:Object.assign({}, state.current, { ...action.payload })});
    case ActionTypes.spotify.LOOKUP_ALBUM:
      return Object.assign({}, state, { current:Object.assign({}, state.current, { ...action.payload })});
      return Object.assign({}, state, { current: Object.assign({}, state.current, { ...action.payload }) });
    case ActionTypes.spotify.REQUEST_LOOKUP:
      return Object.assign({}, state, { current:Object.assign({}, state.current, { ...action.payload })});
    case ActionTypes.spotify.RECEIVE_LOOKUP:
      return Object.assign({}, state, { current: Object.assign({}, state.current, { ...action.payload }) });
    default:
      return state;
  }
  return state ;
}
export default SpotifyReducer;
