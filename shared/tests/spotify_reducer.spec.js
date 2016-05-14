
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import ActionTypes from '../redux/constants';
import combination from '../redux/reducers';








describe('spotify reducer', () => {
    it('SEARCH_ARTIST returns correct mutation', function() {
      var beforeState = {
        "oauth_token": null,
        "current": {
          "artist": null,
          "album": null,
          "track": null
        },
        "search": {
          "query": "2 chainz",
          "type": "artist",
          "tracks": [],
          "artists": {
            "href": "https://api.spotify.com/v1/search?query=2+chainz&offset=0&limit=20&type=artist",
            "items": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/17lzZA2AlOHwCwFALHttmp"
                },
                "followers": {
                  "href": null,
                  "total": 731435
                },
                "genres": [
                  "deep trap",
                  "trap music"
                ],
                "href": "https://api.spotify.com/v1/artists/17lzZA2AlOHwCwFALHttmp",
                "id": "17lzZA2AlOHwCwFALHttmp",
                "images": [
                  {
                    "height": 1000,
                    "url": "https://i.scdn.co/image/03c8ffa01ce66c2ab342ef3d0ce96b4ae12ec068",
                    "width": 1000
                  },
                  {
                    "height": 640,
                    "url": "https://i.scdn.co/image/74287301eb49fa9da7bf2b8487f9991fac744349",
                    "width": 640
                  },
                  {
                    "height": 200,
                    "url": "https://i.scdn.co/image/3ab656d8a3e4ca39a7f0d48a29a012c1d876ccab",
                    "width": 200
                  },
                  {
                    "height": 64,
                    "url": "https://i.scdn.co/image/83abeb31fb7f03005f3d2f249c056ebb0a8dd3ca",
                    "width": 64
                  }
                ],
                "name": "2 Chainz",
                "popularity": 84,
                "type": "artist",
                "uri": "spotify:artist:17lzZA2AlOHwCwFALHttmp"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/6kNfTPAMTJL2HvPaEKaxKL"
                },
                "followers": {
                  "href": null,
                  "total": 40
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/6kNfTPAMTJL2HvPaEKaxKL",
                "id": "6kNfTPAMTJL2HvPaEKaxKL",
                "images": [],
                "name": "2 Chainz ft. Kreayshawn",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:6kNfTPAMTJL2HvPaEKaxKL"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/7k2cSYTcBFxw5aeMih6oT5"
                },
                "followers": {
                  "href": null,
                  "total": 79
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/7k2cSYTcBFxw5aeMih6oT5",
                "id": "7k2cSYTcBFxw5aeMih6oT5",
                "images": [],
                "name": "Young Fame Ft 2 Chainz",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:7k2cSYTcBFxw5aeMih6oT5"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/4ogagqTvlscAE5f4UzRhS7"
                },
                "followers": {
                  "href": null,
                  "total": 6
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/4ogagqTvlscAE5f4UzRhS7",
                "id": "4ogagqTvlscAE5f4UzRhS7",
                "images": [
                  {
                    "height": 640,
                    "url": "https://i.scdn.co/image/d04e9c27a18a32015927070ada21e75df4ff7933",
                    "width": 640
                  },
                  {
                    "height": 300,
                    "url": "https://i.scdn.co/image/516a197b5ef14b069e66be7eecad10aeb8f2f9c7",
                    "width": 300
                  },
                  {
                    "height": 64,
                    "url": "https://i.scdn.co/image/75df2303dd49a5b40581787435a9d342015d3956",
                    "width": 64
                  }
                ],
                "name": "Natalia Damini feat. 2 Chainz",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:4ogagqTvlscAE5f4UzRhS7"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/04dlz6CZCHGQ9CZg2CZnqz"
                },
                "followers": {
                  "href": null,
                  "total": 24
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/04dlz6CZCHGQ9CZg2CZnqz",
                "id": "04dlz6CZCHGQ9CZg2CZnqz",
                "images": [
                  {
                    "height": 640,
                    "url": "https://i.scdn.co/image/629e60b296b5fc94c5043651993603a537b0d2d1",
                    "width": 640
                  },
                  {
                    "height": 300,
                    "url": "https://i.scdn.co/image/27072170507648233cf0261429a44874b0f30672",
                    "width": 300
                  },
                  {
                    "height": 64,
                    "url": "https://i.scdn.co/image/edbff6a9c422a9c6d9eb42b863ae69fa907feace",
                    "width": 64
                  }
                ],
                "name": "2 Chainz Tribute Team",
                "popularity": 1,
                "type": "artist",
                "uri": "spotify:artist:04dlz6CZCHGQ9CZg2CZnqz"
              }
            ],
            "limit": 20,
            "next": null,
            "offset": 0,
            "previous": null,
            "total": 5
          },
          "albums": []
        }
      };
      var afterState = {
        "oauth_token": null,
        "current": {
          "artist": null,
          "album": null,
          "track": null
        },
        "search": {
          "query": "2 chainz",
          "type": "artist",
          "tracks": [],
          "artists": {
            "href": "https://api.spotify.com/v1/search?query=2+chainz&offset=0&limit=20&type=artist",
            "items": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/17lzZA2AlOHwCwFALHttmp"
                },
                "followers": {
                  "href": null,
                  "total": 731435
                },
                "genres": [
                  "deep trap",
                  "trap music"
                ],
                "href": "https://api.spotify.com/v1/artists/17lzZA2AlOHwCwFALHttmp",
                "id": "17lzZA2AlOHwCwFALHttmp",
                "images": [
                  {
                    "height": 1000,
                    "url": "https://i.scdn.co/image/03c8ffa01ce66c2ab342ef3d0ce96b4ae12ec068",
                    "width": 1000
                  },
                  {
                    "height": 640,
                    "url": "https://i.scdn.co/image/74287301eb49fa9da7bf2b8487f9991fac744349",
                    "width": 640
                  },
                  {
                    "height": 200,
                    "url": "https://i.scdn.co/image/3ab656d8a3e4ca39a7f0d48a29a012c1d876ccab",
                    "width": 200
                  },
                  {
                    "height": 64,
                    "url": "https://i.scdn.co/image/83abeb31fb7f03005f3d2f249c056ebb0a8dd3ca",
                    "width": 64
                  }
                ],
                "name": "2 Chainz",
                "popularity": 84,
                "type": "artist",
                "uri": "spotify:artist:17lzZA2AlOHwCwFALHttmp"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/6kNfTPAMTJL2HvPaEKaxKL"
                },
                "followers": {
                  "href": null,
                  "total": 40
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/6kNfTPAMTJL2HvPaEKaxKL",
                "id": "6kNfTPAMTJL2HvPaEKaxKL",
                "images": [],
                "name": "2 Chainz ft. Kreayshawn",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:6kNfTPAMTJL2HvPaEKaxKL"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/7k2cSYTcBFxw5aeMih6oT5"
                },
                "followers": {
                  "href": null,
                  "total": 79
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/7k2cSYTcBFxw5aeMih6oT5",
                "id": "7k2cSYTcBFxw5aeMih6oT5",
                "images": [],
                "name": "Young Fame Ft 2 Chainz",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:7k2cSYTcBFxw5aeMih6oT5"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/4ogagqTvlscAE5f4UzRhS7"
                },
                "followers": {
                  "href": null,
                  "total": 6
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/4ogagqTvlscAE5f4UzRhS7",
                "id": "4ogagqTvlscAE5f4UzRhS7",
                "images": [
                  {
                    "height": 640,
                    "url": "https://i.scdn.co/image/d04e9c27a18a32015927070ada21e75df4ff7933",
                    "width": 640
                  },
                  {
                    "height": 300,
                    "url": "https://i.scdn.co/image/516a197b5ef14b069e66be7eecad10aeb8f2f9c7",
                    "width": 300
                  },
                  {
                    "height": 64,
                    "url": "https://i.scdn.co/image/75df2303dd49a5b40581787435a9d342015d3956",
                    "width": 64
                  }
                ],
                "name": "Natalia Damini feat. 2 Chainz",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:4ogagqTvlscAE5f4UzRhS7"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/04dlz6CZCHGQ9CZg2CZnqz"
                },
                "followers": {
                  "href": null,
                  "total": 24
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/04dlz6CZCHGQ9CZg2CZnqz",
                "id": "04dlz6CZCHGQ9CZg2CZnqz",
                "images": [
                  {
                    "height": 640,
                    "url": "https://i.scdn.co/image/629e60b296b5fc94c5043651993603a537b0d2d1",
                    "width": 640
                  },
                  {
                    "height": 300,
                    "url": "https://i.scdn.co/image/27072170507648233cf0261429a44874b0f30672",
                    "width": 300
                  },
                  {
                    "height": 64,
                    "url": "https://i.scdn.co/image/edbff6a9c422a9c6d9eb42b863ae69fa907feace",
                    "width": 64
                  }
                ],
                "name": "2 Chainz Tribute Team",
                "popularity": 1,
                "type": "artist",
                "uri": "spotify:artist:04dlz6CZCHGQ9CZg2CZnqz"
              }
            ],
            "limit": 20,
            "next": null,
            "offset": 0,
            "previous": null,
            "total": 5
          },
          "albums": []
        }
      }
      var action = {
        "type": "REQUEST_SEARCH",
        "payload": {
          "type": "artist",
          "query": "2 chainz"
        }
      };

      expect(combination({spotify: beforeState}, action).spotify).toEqual(afterState);
    });
    it('SEARCH_ARTIST returns correct mutation', function() {
      var beforeState = {
        "oauth_token": null,
        "current": {
          "artist": null,
          "album": null,
          "track": null
        },
        "search": {
          "query": "2 chainz",
          "type": "artist",
          "tracks": [],
          "artists": {
            "href": "https://api.spotify.com/v1/search?query=2+chainz&offset=0&limit=20&type=artist",
            "items": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/17lzZA2AlOHwCwFALHttmp"
                },
                "followers": {
                  "href": null,
                  "total": 731435
                },
                "genres": [
                  "deep trap",
                  "trap music"
                ],
                "href": "https://api.spotify.com/v1/artists/17lzZA2AlOHwCwFALHttmp",
                "id": "17lzZA2AlOHwCwFALHttmp",
                "images": [
                  {
                    "height": 1000,
                    "url": "https://i.scdn.co/image/03c8ffa01ce66c2ab342ef3d0ce96b4ae12ec068",
                    "width": 1000
                  },
                  {
                    "height": 640,
                    "url": "https://i.scdn.co/image/74287301eb49fa9da7bf2b8487f9991fac744349",
                    "width": 640
                  },
                  {
                    "height": 200,
                    "url": "https://i.scdn.co/image/3ab656d8a3e4ca39a7f0d48a29a012c1d876ccab",
                    "width": 200
                  },
                  {
                    "height": 64,
                    "url": "https://i.scdn.co/image/83abeb31fb7f03005f3d2f249c056ebb0a8dd3ca",
                    "width": 64
                  }
                ],
                "name": "2 Chainz",
                "popularity": 84,
                "type": "artist",
                "uri": "spotify:artist:17lzZA2AlOHwCwFALHttmp"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/6kNfTPAMTJL2HvPaEKaxKL"
                },
                "followers": {
                  "href": null,
                  "total": 40
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/6kNfTPAMTJL2HvPaEKaxKL",
                "id": "6kNfTPAMTJL2HvPaEKaxKL",
                "images": [],
                "name": "2 Chainz ft. Kreayshawn",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:6kNfTPAMTJL2HvPaEKaxKL"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/7k2cSYTcBFxw5aeMih6oT5"
                },
                "followers": {
                  "href": null,
                  "total": 79
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/7k2cSYTcBFxw5aeMih6oT5",
                "id": "7k2cSYTcBFxw5aeMih6oT5",
                "images": [],
                "name": "Young Fame Ft 2 Chainz",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:7k2cSYTcBFxw5aeMih6oT5"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/4ogagqTvlscAE5f4UzRhS7"
                },
                "followers": {
                  "href": null,
                  "total": 6
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/4ogagqTvlscAE5f4UzRhS7",
                "id": "4ogagqTvlscAE5f4UzRhS7",
                "images": [
                  {
                    "height": 640,
                    "url": "https://i.scdn.co/image/d04e9c27a18a32015927070ada21e75df4ff7933",
                    "width": 640
                  },
                  {
                    "height": 300,
                    "url": "https://i.scdn.co/image/516a197b5ef14b069e66be7eecad10aeb8f2f9c7",
                    "width": 300
                  },
                  {
                    "height": 64,
                    "url": "https://i.scdn.co/image/75df2303dd49a5b40581787435a9d342015d3956",
                    "width": 64
                  }
                ],
                "name": "Natalia Damini feat. 2 Chainz",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:4ogagqTvlscAE5f4UzRhS7"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/04dlz6CZCHGQ9CZg2CZnqz"
                },
                "followers": {
                  "href": null,
                  "total": 24
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/04dlz6CZCHGQ9CZg2CZnqz",
                "id": "04dlz6CZCHGQ9CZg2CZnqz",
                "images": [
                  {
                    "height": 640,
                    "url": "https://i.scdn.co/image/629e60b296b5fc94c5043651993603a537b0d2d1",
                    "width": 640
                  },
                  {
                    "height": 300,
                    "url": "https://i.scdn.co/image/27072170507648233cf0261429a44874b0f30672",
                    "width": 300
                  },
                  {
                    "height": 64,
                    "url": "https://i.scdn.co/image/edbff6a9c422a9c6d9eb42b863ae69fa907feace",
                    "width": 64
                  }
                ],
                "name": "2 Chainz Tribute Team",
                "popularity": 1,
                "type": "artist",
                "uri": "spotify:artist:04dlz6CZCHGQ9CZg2CZnqz"
              }
            ],
            "limit": 20,
            "next": null,
            "offset": 0,
            "previous": null,
            "total": 5
          },
          "albums": []
        }
      };
      var afterState = {
        "oauth_token": null,
        "current": {
          "artist": null,
          "album": null,
          "track": null
        },
        "search": {
          "query": "2 chainz",
          "type": "artist",
          "tracks": [],
          "artists": {
            "href": "https://api.spotify.com/v1/search?query=2+chainz&offset=0&limit=20&type=artist",
            "items": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/17lzZA2AlOHwCwFALHttmp"
                },
                "followers": {
                  "href": null,
                  "total": 731435
                },
                "genres": [
                  "deep trap",
                  "trap music"
                ],
                "href": "https://api.spotify.com/v1/artists/17lzZA2AlOHwCwFALHttmp",
                "id": "17lzZA2AlOHwCwFALHttmp",
                "images": [
                  {
                    "height": 1000,
                    "url": "https://i.scdn.co/image/03c8ffa01ce66c2ab342ef3d0ce96b4ae12ec068",
                    "width": 1000
                  },
                  {
                    "height": 640,
                    "url": "https://i.scdn.co/image/74287301eb49fa9da7bf2b8487f9991fac744349",
                    "width": 640
                  },
                  {
                    "height": 200,
                    "url": "https://i.scdn.co/image/3ab656d8a3e4ca39a7f0d48a29a012c1d876ccab",
                    "width": 200
                  },
                  {
                    "height": 64,
                    "url": "https://i.scdn.co/image/83abeb31fb7f03005f3d2f249c056ebb0a8dd3ca",
                    "width": 64
                  }
                ],
                "name": "2 Chainz",
                "popularity": 84,
                "type": "artist",
                "uri": "spotify:artist:17lzZA2AlOHwCwFALHttmp"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/6kNfTPAMTJL2HvPaEKaxKL"
                },
                "followers": {
                  "href": null,
                  "total": 40
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/6kNfTPAMTJL2HvPaEKaxKL",
                "id": "6kNfTPAMTJL2HvPaEKaxKL",
                "images": [],
                "name": "2 Chainz ft. Kreayshawn",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:6kNfTPAMTJL2HvPaEKaxKL"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/7k2cSYTcBFxw5aeMih6oT5"
                },
                "followers": {
                  "href": null,
                  "total": 79
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/7k2cSYTcBFxw5aeMih6oT5",
                "id": "7k2cSYTcBFxw5aeMih6oT5",
                "images": [],
                "name": "Young Fame Ft 2 Chainz",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:7k2cSYTcBFxw5aeMih6oT5"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/4ogagqTvlscAE5f4UzRhS7"
                },
                "followers": {
                  "href": null,
                  "total": 6
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/4ogagqTvlscAE5f4UzRhS7",
                "id": "4ogagqTvlscAE5f4UzRhS7",
                "images": [
                  {
                    "height": 640,
                    "url": "https://i.scdn.co/image/d04e9c27a18a32015927070ada21e75df4ff7933",
                    "width": 640
                  },
                  {
                    "height": 300,
                    "url": "https://i.scdn.co/image/516a197b5ef14b069e66be7eecad10aeb8f2f9c7",
                    "width": 300
                  },
                  {
                    "height": 64,
                    "url": "https://i.scdn.co/image/75df2303dd49a5b40581787435a9d342015d3956",
                    "width": 64
                  }
                ],
                "name": "Natalia Damini feat. 2 Chainz",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:4ogagqTvlscAE5f4UzRhS7"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/04dlz6CZCHGQ9CZg2CZnqz"
                },
                "followers": {
                  "href": null,
                  "total": 24
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/04dlz6CZCHGQ9CZg2CZnqz",
                "id": "04dlz6CZCHGQ9CZg2CZnqz",
                "images": [
                  {
                    "height": 640,
                    "url": "https://i.scdn.co/image/629e60b296b5fc94c5043651993603a537b0d2d1",
                    "width": 640
                  },
                  {
                    "height": 300,
                    "url": "https://i.scdn.co/image/27072170507648233cf0261429a44874b0f30672",
                    "width": 300
                  },
                  {
                    "height": 64,
                    "url": "https://i.scdn.co/image/edbff6a9c422a9c6d9eb42b863ae69fa907feace",
                    "width": 64
                  }
                ],
                "name": "2 Chainz Tribute Team",
                "popularity": 1,
                "type": "artist",
                "uri": "spotify:artist:04dlz6CZCHGQ9CZg2CZnqz"
              }
            ],
            "limit": 20,
            "next": null,
            "offset": 0,
            "previous": null,
            "total": 5
          },
          "albums": []
        }
      }
      var action = {
        "type": "REQUEST_SEARCH",
        "payload": {
          "type": "artist",
          "query": "2 chainz"
        }
      };

      expect(combination({spotify: beforeState}, action).spotify).toEqual(afterState);
    });


  // it('action LOGIN_USER_REQUEST is working', () => {
  // });
});
