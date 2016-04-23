import ActionTypes from '../constants';
import Config from '../../../server/config';
import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-fetch';


const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';



export function restoreLoginStatus() {
  var token = localStorage.getItem('token');
  return {
    type: ActionTypes.auth.RESTORE_LOGIN_STATUS,
    payload: {
      token: token
    }
  };
}



export function registerUserSuccess(responseData) {
  localStorage.setItem('token', responseData.auth_token);
  return {
    type: ActionTypes.auth.LOGIN_USER_SUCCESS,
    payload: {
      // TODO: Either rename token or authToken
      token: responseData.auth_token,
      message: responseData.message,
      reason: responseData.reason
    }
  };
}
export function registerUserFailure(responseData) {
  return {
    type: ActionTypes.auth.REGISTER_USER_FAILURE,
    payload: {
      token: responseData.auth_token,
      status: responseData.success,
      reason: responseData.reason
    }
  };
}

export function registerUser(username, password, confirmPassword) {
  return (dispatch) => {
    fetch(`${baseURL}/api/users/register`, {
      method: 'post',
      body: JSON.stringify({
        username: username,
        password: password,
        confirmPassword: confirmPassword
      }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    .then((res) => res.json())
    .then((res) => dispatch((res.success) ? registerUserSuccess(res) :registerUserFailure(res)))
    .catch(error => {
        dispatch(registerUserFailure(error));
      });
  };
}

export function loginUserSuccess(responseData) {
  localStorage.setItem('token', responseData.auth_token);
  return {
    type: ActionTypes.auth.LOGIN_USER_SUCCESS,
    payload: {
      // TODO: Either rename token or authToken
      token: responseData.auth_token,
      message: responseData.message,
      reason: responseData.reason,
      username: jwtDecode(responseData.auth_token).username
    }
  };
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: ActionTypes.auth.LOGIN_USER_FAILURE,
    payload: {
      status: error.success,
      statusText: error.message,
      reason: error.reason
    }
  };
}

export function loginUserRequest() {
  return {
    type: ActionTypes.auth.LOGIN_USER_REQUEST,
  };
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
        dispatch(loginUserFailure(error)); });
  };
}





export function logout() {
  localStorage.removeItem('token');
  return {
      type: ActionTypes.auth.LOGOUT_USER,
    };
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
      dispatch(logout());
    };
}












export function receiveProtectedData(data) {
  return {
    type: ActionTypes.auth.RECEIVE_PROTECTED_DATA,
    payload: {
      data: data
    }
  };
}

export function fetchProtectedDataRequest() {
  return {
    type: ActionTypes.auth.FETCH_PROTECTED_DATA_REQUEST,
  };
}

export function fetchProtectedData(token) {
  return (dispatch, state) => {
    dispatch(fetchProtectedDataRequest());
    return fetch(`${baseURL}/api/auth/user`, {
      credentials: 'include',
      headers: {
          Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
      dispatch(receiveProtectedData(response.data));
    })
    .catch(error => {
      if(error.response.status === 401) {
        dispatch(loginUserFailure(error));
      }
    });
  };
}
