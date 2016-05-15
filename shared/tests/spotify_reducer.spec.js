
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import ActionTypes from '../redux/constants';
import combination from '../redux/reducers';








describe('spotify reducer', () => {
    it(`REQUEST_SEARCH with payload values for query and type:'album' mutates state`, function() {
      var beforeState = {
        "oauth_token": null,
        "current": { "artist": null, "album": null, "track": null },
        "search": {
          "query": "",      // this value is updated
          "type": "",       // this value is updated
          "tracks": [], "artists": {}, "albums": []
        }
      };
      var afterState = {
        "oauth_token": null,
        "current": { "artist": null, "album": null, "track": null },
        "search": {
          "query": "2 chainz",
          "type": "artist",
          "tracks": [],
          "artists": {},
          "albums":[]
        }
      }
      var action = {
        "type": "REQUEST_SEARCH",
        "payload": {
          "type": "artist",
          "query": "2 chainz"
        }
      };

      var spotifyState = combination({spotify: beforeState}, action).spotify;

      expect(spotifyState).toEqual(afterState);
    });


  // it('action LOGIN_USER_REQUEST is working', () => {
  // });
});
