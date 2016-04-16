

import ActionTypes from '../redux/constants';
import combination from '../redux/reducers';







var auth = {
  token:null,
  username:null,
  isAuthenticated:false,
  isAuthenticating:false,
  statusText:null
 };

describe('authReducer', () => {
  describe('possible exceptions', () => {
    it('returns default when reducer passed nothing', function(){
      expect(combination()).to.be.an('object');
    });
    it('returns default when reducer passed one empty object argument', function(){
      expect(combination({})).to.be.an('object');
    });
    it('returns default when reducer passed empty objects arguments', function(){
      expect(combination({}, {})).to.be.an('object');
    });

    describe('ActionType LOGIN_USER_FAILURE', function(){
      var beforeState = {
        posts:{}
      }
    })
  });


  // it('action LOGIN_USER_REQUEST is working', () => {
  // });
});
