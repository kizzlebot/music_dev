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

    case ActionTypes.soundcloud.LOGIN:
      return Object.assign({}, state, {
        oauth_token: action.payload.oauth_token,
        shouldShowStream: action.payload.shouldShowStream
      });

    case ActionTypes.soundcloud.FETCH_SUCCESS:
      return Object.assign({}, state, {
        collection: action.payload.collection,
        isFetching: false,
        fetch_success: action.payload.fetch_success,
        next_href: action.payload.next_href
      });

    case ActionTypes.soundcloud.FETCH_MORE_SUCCESS:
      return Object.assign({}, state, {
        collection: action.payload.collection.slice(0).concat(action.payload.collection),
        isFetching: action.payload.isFetching,
        fetch_success: action.payload.fetch_success,
        next_href: action.payload.next_href
      });

    case ActionTypes.soundcloud.FETCH_MORE_FAIL:
      return Object.assign({}, state, {
        isFetching: action.payload.isFetching,
        fetch_success: action.payload.fetch_success
      });

    case ActionTypes.soundcloud.FETCH_FAIL:
      return Object.assign({}, state, {
        isFetching: action.payload.isFetching,
        fetch_success: action.payload.fetch_success
      });

    case ActionTypes.soundcloud.NEXTPAGE:
      return Object.assign({}, state, {
        page: action.payload.page|| state.page
      });

    case ActionTypes.soundcloud.PREVPAGE:
      return Object.assign({}, state, {
        page: action.payload.page|| state.page
      });

    case ActionTypes.soundcloud.STORE_OAUTH:
      return Object.assign({}, state, {
        oauth_token: action.payload.token
      })

    default:
      return state ;
  }
};
// export const SOUNDCLOUD_NEXTPAGE = 'SOUNDCLOUD_NEXTPAGE';
// export const SOUNDCLOUD_PREVPAGE = 'SOUNDCLOUD_PREVPAGE';
// export const SOUNDCLOUD_FETCH_SUCCESS = 'SOUNDCLOUD_FETCH_SUCCESS';
// export const SOUNDCLOUD_FETCH_FAIL = 'SOUNDCLOUD_FETCH_FAIL';
// export const SOUNDCLOUD_FETCH_MORE_FAIL = 'SOUNDCLOUD_FETCH_MORE_FAIL';
// export const SOUNDCLOUD_FETCHING = 'SOUNDCLOUD_FETCHING';
//
export default SoundcloudReducer;
