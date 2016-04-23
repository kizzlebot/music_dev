
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import ActionTypes from '../redux/constants';
import combination from '../redux/reducers';







var auth = {
  token: null,
  username: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};

describe('authReducer', () => {
  describe('possible exceptions', () => {
    it('returns default when reducer passed nothing', function() {
      expect(typeof combination()).toEqual('object');
    });
    it('returns default when reducer passed one empty object argument', function() {
      expect(typeof combination({})).toEqual('object');
    });
    it('returns default when reducer passed empty objects arguments', function() {
      expect(typeof combination({}, {})).toEqual('object');
    });

    describe('login reducers', function() {
      it('returns correct mutation for LOGIN_USER_REQUEST', function() {
        var beforeState = Object.assign({}, { token: null, username: null, isAuthenticated: false, isAuthenticating: false, statusText: null });
        var afterState = {
          auth: {
            token: null,
            username: null,
            isAuthenticated: false,
            isAuthenticating: true,
            statusText: null
          }
        };

        var action = {
          type: ActionTypes.auth.LOGIN_USER_REQUEST
        };

        expect(combination({auth: beforeState}, action).auth).toEqual(afterState.auth);
      });



    });
  });


  // it('action LOGIN_USER_REQUEST is working', () => {
  // });
});
