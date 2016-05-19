import expect from 'expect';
import deepFreeze from 'deep-freeze';

import ActionTypes from '../../redux/constants';
import combination from '../../redux/reducers';
import SpotifyReducer from '../../redux/reducers/SpotifyReducer';








describe('spotify reducer', () => {
    it(`REQUEST_SEARCH with payload.query and payload.type = 'album' replaces state.spotify.search.query and state.spotify.search.type values`, function() {
      var beforeState = { "oauth_token": null, "current": { "artist": null, "album": null, "track": null }, "search": { "query": "", "type": "", "tracks": [], "artists": {}, "albums": [] } };
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

      var action = { "type": "REQUEST_SEARCH", "payload": { "type": "artist", "query": "2 chainz" } };
      var spotifyState = SpotifyReducer(beforeState, action);



      deepFreeze(beforeState);
      deepFreeze(afterState);
      deepFreeze(action);
      deepFreeze(spotifyState);

      expect(spotifyState).toEqual(afterState);
    });

    it(`RECEIVE_SEARCH with values for payload.artists replaces state.spotify.search.artists with payload.artists value`, function() {
      var beforeState = { "oauth_token": null, "current": { "artist": null, "album": null, "track": null }, "search": { "query": "2 chainz", "type": "artist", "tracks": [], "artists": {}, "albums": [] } };
      var action = {
        "type": "RECEIVE_SEARCH",
        "payload": { "type": "artist", artists: {href:'abcd', items:[], limit:20, next:null, offset:0, previous:null, total:9} }
      };


      var afterState = {
        "oauth_token": null,
        "current": { "artist": null, "album": null, "track": null },
        "search": {
          "query": "2 chainz",
          "type": "artist",
          "tracks": [],
          "artists": {...action.payload.artists},
          "albums":[]
        }
      }

      var spotifyState = SpotifyReducer(beforeState, action);

      deepFreeze(beforeState);
      deepFreeze(afterState);
      deepFreeze(action);
      deepFreeze(spotifyState);
      expect(spotifyState).toEqual(afterState);
    });
});
