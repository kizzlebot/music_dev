
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import ActionTypes from '../../redux/constants';
import combination from '../../redux/reducers';








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

    it(`RECEIVE_SEARCH with payload values for query and type:'album' and artists results mutates state`, function() {
      var beforeState = {
        "oauth_token": null,
        "current": { "artist": null, "album": null, "track": null },
        "search": {
          "query": "Jay-Z",      // this value is updated
          "type": "artist",       // this value is updated
          "tracks": [], "artists": {}, "albums": []
        }
      };
      var payload = {
        "type": "artist",
        "query": "Jay-Z",
        "artists":{
          "href": "https://api.spotify.com/v1/search?query=Jay-Z&offset=0&limit=20&type=artist",
          "items": [{
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/5K0Dyig2SjsxkatS63G4Eq"
            },
            "followers": {
              "href": null,
              "total": 2
            },
            "genres": [],
            "href": "https://api.spotify.com/v1/artists/5K0Dyig2SjsxkatS63G4Eq",
            "id": "5K0Dyig2SjsxkatS63G4Eq",
            "images": [],
            "name": "St-Saoul, webster, Ob-One, Frekent, Z, Jay Price, Shoddy, Seif, Fresh, Fou Furieux, Gld & Taktika",
            "popularity": 4,
            "type": "artist",
            "uri": "spotify:artist:5K0Dyig2SjsxkatS63G4Eq"
          },
        ],
          "limit": 20,
          "next": null,
          "offset": 0,
          "previous": null,
          "total": 16
        }
      }
      var afterState = {
        "oauth_token": null,
        "current": { "artist": null, "album": null, "track": null },
        "search": {
          "query": "Jay-Z",
          "type": "artist",
          "tracks": [], "artists": payload.artists, "albums":[]
        }
      }


      var action = {
        "type": "RECEIVE_SEARCH",
        payload
      };

      var spotifyState = combination({spotify: beforeState}, action).spotify;
      expect(spotifyState).toEqual(afterState);
    });
});
