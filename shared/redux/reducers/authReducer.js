import ActionTypes from '../constants';


const initialState = {
    token: null,
    username: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};


const authReducer = (state = initialState, action) => {

  var funcs = {
    LOGIN_USER_REQUEST: (state, payload) => {
      return Object.assign({}, state, {
          'isAuthenticating': true,
          'statusText': null
      });
    },
    LOGIN_USER_SUCCESS: (state, payload) => {
      return Object.assign({}, state, {
          'isAuthenticating': false,
          'isAuthenticated': true,
          'token': payload.token,
          'username': jwtDecode(payload.token).username,
          'statusText': 'You have been successfully logged in.'
      });
    },
    LOGIN_USER_FAILURE: (state, payload) => {
      return Object.assign({}, state, {
          'isAuthenticating': false,
          'isAuthenticated': false,
          'token': null,
          'username': null,
          'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
      });
    },
    LOGOUT_USER: (state, payload) => {
      return Object.assign({}, state, {
          'isAuthenticated': false,
          'token': null,
          'username': null,
          'statusText': 'You have been successfully logged out.'
      });
    }
  };

  return (action && action.type in funcs) ? funcs[action.type](state, action.payload) : state ;

}


export default authReducer  ;
