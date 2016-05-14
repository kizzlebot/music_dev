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
      state.search.query = action.payload.query ;
      return Object.assign({}, state, {
        search: {
          artists:action.payload.artists,
          query:action.payload.query
        }
      });
    case ActionTypes.spotify.REQUEST_SEARCH:
      console.log(action.payload);
      const rnt = Object.assign({}, state, {
        search:Object.assign({}, state.search, {
          ...action.payload
        })
      });
      rnt.search.query = action.payload.query ;
      console.log(rnt);


      return rnt ;
    case ActionTypes.spotify.RECEIVE_SEARCH:
      state.search.query = action.payload.query ;
      return Object.assign({}, state, {
        search: {
          artists:action.payload.results.artists
        }
      });
      var rtn = Object.assign({}, state, {search:newObj});
      console.log(rtn);
      // return rtn ;
  }
  return state ;
}
export default SpotifyReducer;
