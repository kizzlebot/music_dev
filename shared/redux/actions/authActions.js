import ActionTypes from '../constants';
// import { pushState } from 'redux-router';
import Config from '../../../server/config';
import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-fetch';


const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';






export function registerUser(formData) {
  return {
    type: ActionTypes.CHECK_EXISTING,
    formData
  };
}

export function registerUserRequest(formData) {
  return (dispatch) => {
    fetch(`${baseURL}/api/users/register`, {
      method: 'post',
      body: JSON.stringify({
        username:formData.username,
        password: formData.password,
        confirmPassword:formData.confirmPassword
      }),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }),
    }).then((res) => res.json()).then(res => dispatch(registerUser(res.message)));
  }
}





export function loginUserSuccess(responseData) {
  localStorage.setItem('token', responseData.auth_token);
  return {
    type: ActionTypes.LOGIN_USER_SUCCESS,
    payload: {
      // TODO: Either rename token or authToken
      token: responseData.auth_token,
      message:responseData.message
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: ActionTypes.LOGIN_USER_FAILURE,
    payload: {
      status: error.success,
      statusText: error.message
    }
  }
}

export function loginUserRequest() {
  return {
    type: ActionTypes.LOGIN_USER_REQUEST,
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: ActionTypes.LOGOUT_USER,
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
    }
}

export function loginUser(username, password, redirect="/") {
  return (dispatch) => {
      dispatch(loginUserRequest());
      fetch(`${baseURL}/api/users/login`, {
        method: 'post',
        body: JSON.stringify({
          username: username, password: password
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        (res.success) ? dispatch(loginUserSuccess(res)) : dispatch(loginUserFailure(res));
      })
      .catch(error => {
          dispatch(loginUserFailure(error));
      })
  }
}











export function receiveProtectedData(data) {
    return {
        type: ActionTypes.RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
  return {
    type: ActionTypes.FETCH_PROTECTED_DATA_REQUEST,
  }
}

export function fetchProtectedData(token) {
  return (dispatch, state) => {
      dispatch(fetchProtectedDataRequest());
      return fetch(`${baseURL}/api/auth/user`, {
              credentials: 'include',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(response => {
              dispatch(receiveProtectedData(response.data));
          })
          .catch(error => {
              if(error.response.status === 401) {
                dispatch(loginUserFailure(error));
                dispatch(pushState(null, '/login'));
              }
          })
     }
}
