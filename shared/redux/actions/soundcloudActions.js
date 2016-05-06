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



export function next_page(curPage){
  return {
    type: ActionTypes.soundcloud.NEXTPAGE,
    payload:{
      page: (curPage||0) + 1
    }
  }
}

export function prev_page(curPage){
  return {
    type: ActionTypes.soundcloud.PREVPAGE,
    payload: {
      page: (curPage-1 >= 0) ? curPage - 1 : 0
    }
  }
}


export function auth_user(oauth_token, shouldShowStream) {
  return {
    type: ActionTypes.soundcloud.LOGIN,
    payload: {
      oauth_token: oauth_token,
      shouldShowStream: shouldShowStream
    }
  };
}

function fetch_success(d) {
  return {
    type: ActionTypes.soundcloud.FETCH_SUCCESS,
    payload: {
      collection: d.collection,
      next_href: d.next_href
    }
  };
}

function fetch_fail(d) {
  return {
    type: ActionTypes.soundcloud.FETCH_FAIL,
    payload: {
      isFetching: false,
      fetch_success:false
    }
  };
}

var defCnt = 50;
function fetching(){
  return {
    type: ActionTypes.soundcloud.FETCHING,
    payload:{
      isFetching: true,
      fetch_success: null
    }
  }
}

export function fetch_data(tags = '', cnt = defCnt, skip = 0) {
  var query = {
    linked_partitioning:1,
    client_id:SOUNDCLOUD_CLIENT_ID,
    limit:cnt,
    offset:skip,
    tags:tags
  };
  return (dispatch, getState) => {
    fetching();
    return fetch(`https://api.soundcloud.com/tracks?${qs.stringify(query)}`)
      .then(d => d.json())
      .then(d => dispatch(fetch_success(d)))
      .then(d => dispatch(next_page(getState().soundcloud.page)))
      .catch(err => dispatch(fetch_fail(err)));
  };
}

function fetch_more_success(d) {
  return {
    type: ActionTypes.soundcloud.FETCH_MORE_SUCCESS,
    payload: {
      collection: d.collection,
      next_href: d.next_href,
      fetch_success: true,
      isFetching: false
    }
  };
}

function fetch_more_fail(d, page) {
  return {
    type: ActionTypes.soundcloud.FETCH_MORE_FAIL,
    payload: {
      isFetching: false,
      fetch_success:false
    }
  };
}

export function fetch_more(tags = '', cnt = defCnt, page = 1) {
  var query = {
    linked_partitioning:1,
    client_id:SOUNDCLOUD_CLIENT_ID,
    limit:cnt,
    offset:page*cnt,
    tags:tags
  };

  return (dispatch, getState) => {

    return fetch(`${getState().soundcloud.next_href}`)
      .then(d => d.json())
      .then(d => dispatch(fetch_more_success(d, page)))
      .then(d => dispatch(next_page(getState().soundcloud.page)))
      .catch(err => dispatch(fetch_more_fail(err)));
  };
}

export function login(shouldShowStream = true) {
  return (dispatch, getState) => {
    if (SC != null && SC != undefined) {

      SC.initialize({
        client_id: SOUNDCLOUD_CLIENT_ID,
        redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/auth/soundcloud`,
      });

      SC.connect().then(authObj => {
        console.log('inside then');
        alert(authObj);
        // Cookies.set(COOKIE_PATH, authObj.oauth_token);
        // dispatch(auth_user(authObj.oauth_token, shouldShowStream));
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
    }
  };
}



export function login_callback(service, location, router) {
  var query = qs.parse(location.hash);
  return (dispatch, getState) => {
    if (query.access_token){
      return dispatch(store_oauth(service, query.access_token));
    }
  }
}



export function store_oauth(service, token){
  if (typeof localStorage != 'undefined'){
    localStorage.setItem('soundcloud', token);
  }
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.soundcloud.STORE_OAUTH,
      payload: {
        token: token
      }
    })
  }
}
