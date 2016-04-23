import Cookies from 'js-cookies';
import ActionTypes from '../constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';


const qs = require('query-string');
var SC = null ;

if (process.env.CLIENT){
  SC = require('soundcloud');
}


const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : ``;
const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_ID || 'c3fdaf167c793c07c25d1144ec80a483'
const COOKIE_PATH = 'soundcloud_token';



export function soundcloud_nextPage(curPage){
  return {
    type: ActionTypes.soundcloud.SOUNDCLOUD_NEXTPAGE,
    payload:{
      page:curPage + 1
    }
  }
}

export function soundcloud_prevPage(curPage){
  return {
    type: ActionTypes.soundcloud.SOUNDCLOUD_PREVPAGE,
    payload: {
      page: (curPage-1 >= 0) ? curPage - 1 : 0
    }
  }
}


export function soundcloud_authUser(oauth_token, shouldShowStream) {
  return {
    type: ActionTypes.soundcloud.SOUNDCLOUD_LOGIN,
    payload: {
      oauth_token: oauth_token,
      shouldShowStream: shouldShowStream
    }
  };
}

function soundcloudFetch_success(d) {
  return {
    type: ActionTypes.soundcloud.SOUNDCLOUD_FETCH_SUCCESS,
    payload: {
      collection: d.collection,
      next_href: d.next_href
    }
  };
}

function soundcloudFetch_fail(d) {
  return {
    type: ActionTypes.soundcloud.SOUNDCLOUD_FETCH_FAIL,
    payload: {
      isFetching: false,
      fetch_success:false
    }
  };
}

var defCnt = 50;
function soundcloudFetching(){
  return {
    type: ActionTypes.soundcloud.SOUNDCLOUD_FETCHING,
    payload:{
      isFetching: true,
      fetch_success: null
    }
  }
}

export function soundcloudFetch(tags = '', cnt = defCnt, skip = 0) {
  var query = {
    linked_partitioning:1,
    client_id:SOUNDCLOUD_CLIENT_ID,
    limit:cnt,
    offset:skip,
    tags:tags
  };
  return (dispatch, getState) => {
    soundcloudFetching();
    return fetch(`https://api.soundcloud.com/tracks?${qs.stringify(query)}`)
      .then(d => d.json())
      .then(d => dispatch(soundcloudFetch_success(d)))
      // .then(d => dispatch(soundcloud_nextPage(getState().soundcloud.page)))
      // .catch(err => dispatch(soundcloudFetch_fail(err)));
  };
}

function soundcloudFetchMore_success(d) {
  return {
    type: ActionTypes.soundcloud.SOUNDCLOUD_FETCH_MORE_SUCCESS,
    payload: {
      collection: d.collection,
      next_href: d.next_href,
      fetch_success: true,
      isFetching: false
    }
  };
}

function soundcloudFetchMore_fail(d, page) {
  return {
    type: ActionTypes.soundcloud.SOUNDCLOUD_FETCH_MORE_FAIL,
    payload: {
      isFetching: false,
      fetch_success:false
    }
  };
}

export function soundcloudFetchMore(tags = '', cnt = defCnt, page) {
  var query = {
    linked_partitioning:1,
    client_id:SOUNDCLOUD_CLIENT_ID,
    limit:cnt,
    offset:page*cnt,
    tags:tags
  };

  return (dispatch, getState) => {
    soundcloudFetching();
    return fetch(`https://api.soundcloud.com/tracks?${qs.stringify(query)}`)
      .then(d => d.json())
      .then(d => dispatch(soundcloudFetchMore_success(d, page)))
      .then(d => dispatch(soundcloud_nextPage(getState().soundcloud.page)))
      .catch(err => dispatch(soundcloudFetchMore_fail(err)));
  };
}

export function soundcloudLogin(shouldShowStream = true) {
  return (dispatch, getState) => {
    if (SC != null && SC != undefined) {

      SC.initialize({
        client_id: SOUNDCLOUD_CLIENT_ID,
        redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/auth/soundcloud`,
      });

      SC.connect().then(authObj => {
        console.log('inside then');
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



export function soundcloudLoginCallback(service, location, router) {
  var query = qs.parse(location.hash);
  return (dispatch, getState) => {
    if (query.access_token){
      return dispatch(soundcloudStoreOauthToken(service, query.access_token));
    }
  }
}



export function soundcloudStoreOauthToken(service, token){
  if (typeof localStorage != 'undefined'){
    localStorage.setItem('soundcloud', token);
  }
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.soundcloud.SOUNDCLOUD_STORE_OAUTH,
      payload: {
        token: token
      }
    })
  }
}
