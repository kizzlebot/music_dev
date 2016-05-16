import ActionTypes from '../constants';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    username: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    reason: []
  };


const authReducer = (state = initialState, action) => {
  if (!action || !action.type) return state ;

  var {payload} = action;
  // if (typeof payload == 'undefined') return state ;

  switch(action.type){
    case ActionTypes.auth.RESTORE_LOGIN_STATUS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: !!payload.token,
        token: payload.token
      });

    case ActionTypes.auth.LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isAuthenticating: true
      });

    case ActionTypes.auth.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
          isAuthenticating: false,
          isAuthenticated: true,
          token: payload.token,
          username: jwtDecode(payload.token).username,
          statusText: 'You have been successfully logged in.',
          reason: payload.reason
        });

    case ActionTypes.auth.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
          isAuthenticating: false,
          isAuthenticated: false,
          token: null,
          username: null,
          statusText: `Authentication Error: ${payload.status} ${payload.statusText}`,
          reason: payload.reason
        });

    case ActionTypes.auth.REGISTER_USER_REQUEST:
      return Object.assign({}, state, {
          isAuthenticating: true,
          isAuthenticated: false
        });

    case ActionTypes.auth.REGISTER_USER_SUCCESS:
      return Object.assign({}, state, {
          isAuthenticating: false,
          isAuthenticated: true,
          token: payload.token,
          username: jwtDecode(payload.token).username,
          statusText: 'You have been successfully registered.',
          reason: payload.reason
        });

    case ActionTypes.auth.REGISTER_USER_FAILURE:
      return Object.assign({}, state, {
          isAuthenticating: false,
          isAuthenticated: false,
          token: null,
          username: null,
          statusText: `Authentication Error: ${payload.status} ${payload.statusText}`,
          reason: payload.reason
        });

    case ActionTypes.auth.LOGOUT_USER_REQUEST:
      return Object.assign({}, state, {
          isAuthenticated: false,
          isAuthenticating: false,
          token: null,
          username: null
        });

    case ActionTypes.auth.LOGOUT_USER:
      return Object.assign({}, state, {
          isAuthenticated: false,
          token: null,
          username: null,
          statusText: 'You have been successfully logged out.'
        });

    default:
      return state ;
  }

  return state;
};


export default authReducer  ;
