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

export function soundcloudFetch_success(d) {
  return {
    type: ActionTypes.SOUNDCLOUD_FETCH_SUCCESS,
    payload: {
      collection: d.collection,
      next_href: d.next_href
    }
  };
}



export function soundcloudFetch(tags) {

  var page = 0 ;
  var skip = page * 100;
  var cnt = page * 100 + 100 ;
  return dispatch => {
    fetch(`https://api.soundcloud.com/tracks?linked_partitioning=1&client_id=e582b63d83a5fb2997d1dbf2f62705da&limit=${cnt}&offset=${skip}&tags=${tags}`)
      .then(d => d.json())
      .then(d => dispatch(soundcloudFetch_success(d)));
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
