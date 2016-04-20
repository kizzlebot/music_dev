import ActionTypes from '../constants';

const initialState = {
  "oauth_token": null,
  "shouldShowStream": false,
  "collection": [],
  "next_href": null,
  "page":0
};



const SoundcloudReducer = (state = initialState, action) => {
  if (!action || !action.type) return state;
  switch(action.type){

    case ActionTypes.SOUNDCLOUD_LOGIN:
      return Object.assign({}, state, {
        oauth_token: action.payload.oauth_token,
        shouldShowStream: action.payload.shouldShowStream
      });

    case ActionTypes.SOUNDCLOUD_FETCH_SUCCESS:
      return Object.assign({}, state, {
        collection: action.payload.collection,
        next_href: action.payload.next_href
      });
      
    case ActionTypes.SOUNDCLOUD_FETCH_MORE_SUCCESS:
      return Object.assign({}, {
        collection: state.collection.slice(0).concat(action.payload.collection),
        page: action.payload.page + 1
      });
    default:
      return state ;
  }
};

export default SoundcloudReducer;
