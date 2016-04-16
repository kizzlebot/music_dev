import ActionTypes from '../constants';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    username: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};


const authReducer = (state = initialState, action) => {
  if (!action || !action.type) return state ;

  var {payload} = action;

  switch(action.type){
    case ActionTypes.LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
          'isAuthenticating': true,
          'isAuthenticated': false
      });
    case ActionTypes.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
          'isAuthenticating': false,
          'isAuthenticated': true,
          'token': payload.token,
          'username': jwtDecode(payload.token).username,
          'statusText': 'You have been successfully logged in.'
      });
    case ActionTypes.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
          'isAuthenticating': false,
          'isAuthenticated': false,
          'token': null,
          'username': null,
          'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
      });
    case ActionTypes.LOGOUT_USER_REQUEST:
      return Object.assign({}, state, {
          'isAuthenticated': false,
          'isAuthenticating':false,
          'token': null,
          'username': null
      });
    case ActionTypes.LOGOUT_USER:
      return Object.assign({}, state, {
          'isAuthenticated': false,
          'token': null,
          'username': null,
          'statusText': 'You have been successfully logged out.'
      });
    case ActionTypes.REGISTER_USER_REQUEST:
      return state ;
    case ActionTypes.REGISTER_USER_SUCCESS:
      return state ;
    case ActionTypes.REGISTER_USER_FAILURE:
      return state ;
    default:
      return state ;
  }

  return state;
}


export default authReducer  ;
