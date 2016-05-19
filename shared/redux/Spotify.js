var fetch = require('isomorphic-fetch');

/**
 * Internal method for creating response hollabacks, should not be used on
 * its own
 */
function Spotify(){
  this.validLookupTypes = ['artist', 'track', 'album', 'albums'];
  this.validSearchTypes = ['artist', 'track', 'album'];
  this.oauth_token = null ;

  this.setOAuth = function(token){
    this.oauth_token = token;
  }
  this.getOAuth = function(token){
    return this.oauth_token ;
  }
}


//Spotify.prototype.browse = function(opts){
//  if (!opts.type && !opts.id) throw new Error('option.type & option.id are missing');
//  else if (!opts.type) throw new Error('option.type is missing');
//  else if (!opts.id) throw new Error('option.id is missing');
//  else if (this.validLookupTypes.indexOf(opts.type) == -1) throw new Error('invalid lookup type');
//}

var serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

/*
* Lookup by artist ID requires 3 ajax calls
*  1. Get artist info
*  2. Get list of 20 ids of artists albums
*  3. Get list of albums
*/
Spotify.prototype.lookup = function(opts, queryExtras){
  if (!opts.type && !opts.id) throw new Error('option.type & option.id are missing');
  else if (!opts.type) throw new Error('option.type is missing');
  else if (!opts.id) throw new Error('option.id is missing');
  else if (this.validLookupTypes.indexOf(opts.type) == -1) throw new Error('invalid lookup type');


  var query ;
  // if plural
  if (opts.type[opts.type.length-1] == 's'){
    var q = null;
    if (queryExtras && typeof queryExtras == 'object'){
      q = `${'?' + serialize(queryExtras)}`;
    }
    query = (opts.type == 'albums') ? `/v1/artists/${opts.id}/albums${q || ''}` : `/v1/${opts.type}/${opts.id}`;
    console.log(query);
    return this.get(query);
  }
  else{
    query = `/v1/${opts.type}s/${opts.id}?album_type=album`;
    var artist = null ;
    return this.get(query).then(e => {
      var basicAlbums = `/v1/${opts.type}s/${opts.id}/albums?album_type=album&available_markets=US`;
      artist = Object.assign({}, e) ;
      return this.get(basicAlbums).then(k => {
        var newQuery = `/v1/albums/?ids=${k.items.map(m => m.id).join(',')}`;
        return this.get(newQuery).then(p => {
          return Object.assign({}, artist, p);
        })
      })
    })
  }
}


Spotify.prototype.search = function(opts){
  if (!opts.type && !opts.query) throw new Error('option.type & option.query are missing');
  else if (!opts.type) throw new Error('option.type is missing');
  else if (!opts.query) throw new Error('option.query is missing');
  else if (this.validSearchTypes.indexOf(opts.type) == -1) throw new Error('invalid search type');

  var query = `/v1/search?type=${opts.type}&q=${opts.query}&limit=${opts.limit||20}`;
  return this.get(query);
}


Spotify.prototype.get = function(query){
  var opts = {
      host: "api.spotify.com",
      path: encodeURI(query)
  }
  var config = {
      method: "GET",
      headers: { "Accept": "application/json" }
  }
  return fetch(`https://${opts.host}${opts.path}`, config).then(d => d.json());
}


module.exports = new Spotify();
