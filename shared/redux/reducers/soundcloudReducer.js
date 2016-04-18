import ActionTypes from '../constants';

const initialState = {
  oauth_token:null,
  shouldShowStream:false
}



const SoundcloudReducer = (state = initialState, action) => {
  if (!action || !action.type) return state;
  switch(action.type){
    case ActionTypes.SOUNDCLOUD_LOGIN:
      return Object.assign({}, state, {
        oauth_token: action.payload.oauth_token,
        shouldShowStream:action.payload.shouldShowStream
      });
    case ActionTypes.SOUNDCLOUD_FETCH_SUCCESS:
      return Object.assign({}, state, {
        collection: action.payload.collection,
        next_href: action.payload.next_href
      })
    default:
      return state ;
  }
}

export default SoundcloudReducer;
