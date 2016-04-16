import {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA} from '../constants';
// import { pushState } from 'redux-router';
import Config from '../../../server/config';
import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-fetch';


const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';






export function registerUser(formData) {
  return {
    type: 'CHECK_EXISTING',
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
    type: 'LOGIN_USER_SUCCESS',
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
    type: 'LOGIN_USER_FAILURE',
    payload: {
      status: error.success,
      statusText: error.message
    }
  }
}

export function loginUserRequest() {
  return {
    type: 'LOGIN_USER_REQUEST'
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: 'LOGOUT_USER'
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        // dispatch(pushState(null, '/login'));
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
          console.log(res);
          if (res.success){
            dispatch(loginUserSuccess(res));
          }
          else{
            dispatch(loginUserFailure(res));
          }
        })
        .catch(error => {
            dispatch(loginUserFailure(error));
        })
        // return fetch(`${baseURL}/api/users/login`, {
        //     method: 'post',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //         body: JSON.stringify({username: username, password: password})
        //     })
        //     .then(checkHttpStatus)
        //     .then(parseJSON)
        //     .then(response => {
        //         try {
        //             let decoded = jwtDecode(response.token);
        //             dispatch(loginUserSuccess(response.token));
        //         } catch (e) {
        //             dispatch(loginUserFailure({
        //                 response: {
        //                     status: 403,
        //                     statusText: 'Invalid token'
        //                 }
        //             }));
        //         }
        //     })
        //     .catch(error => {
        //       console.log(error);
        //       dispatch(loginUserFailure(error));
        //     })
    }
}

export function receiveProtectedData(data) {
    return {
        type: 'RECEIVE_PROTECTED_DATA',
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
  return {
    type: 'FETCH_PROTECTED_DATA_REQUEST'
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
