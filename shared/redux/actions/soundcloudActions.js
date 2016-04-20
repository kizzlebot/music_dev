import Cookies from 'js-cookies';
import ActionTypes from '../constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';



const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';
const CLIENT_ID = process.env.SOUNDCLOUD_ID || 'c3fdaf167c793c07c25d1144ec80a483';
const COOKIE_PATH = 'soundcloud_token';

export function soundcloud_authUser(oauth_token, shouldShowStream) {
  return {
    type: ActionTypes.SOUNDCLOUD_LOGIN,
    payload: {
      oauth_token: oauth_token,
      shouldShowStream: shouldShowStream
    }
  };
}

function soundcloudFetch_success(d) {
  return {
    type: ActionTypes.SOUNDCLOUD_FETCH_SUCCESS,
    payload: {
      collection: d.collection,
      next_href: d.next_href
    }
  };
}


var defCnt = 50;

export function soundcloudFetch(tags = '', cnt = defCnt, skip = 0) {
  return dispatch => {
    fetch(`https://api.soundcloud.com/tracks?linked_partitioning=1&client_id=e582b63d83a5fb2997d1dbf2f62705da&limit=${cnt}&offset=${skip}&tags=${tags}`)
      .then(d => d.json())
      .then(d => dispatch(soundcloudFetch_success(d)));
  };
}

function soundcloudFetchMore_success(d, page) {
  return {
    type: ActionTypes.SOUNDCLOUD_FETCH_MORE_SUCCESS,
    payload: {
      collection: d.collection,
      next_href: d.next_href,
      page: page
    }
  };
}
export function soundcloudFetchMore(tags = '', cnt = defCnt, page) {
  return dispatch => {
    fetch(`https://api.soundcloud.com/tracks?linked_partitioning=1&client_id=e582b63d83a5fb2997d1dbf2f62705da&limit=${cnt}&offset=${page*cnt}&tags=${tags}`)
      .then(d => d.json())
      .then(d => dispatch(soundcloudFetchMore_success(d, page)));
  };
}

export function soundcloudLogin(shouldShowStream = true) {
  return dispatch => {
    if (process.env.CLIENT) {
      var SC =  require('soundcloud');
      SC.initialize({
        client_id: CLIENT_ID,
        redirect_uri: `${baseURL}/auth/soundcloud/callback`,
      });

      SC.connect().then(authObj => {
        Cookies.set(COOKIE_PATH, authObj.oauth_token);
        dispatch(soundcloud_authUser(authObj.oauth_token, shouldShowStream));
      })
      .catch(err => {
        console.log(err);

        throw err;
      });
    }
  };
}
