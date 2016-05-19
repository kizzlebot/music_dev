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

Spotify.prototype.lookup = function(opts, queryExtras){
  // if (!opts.type && !opts.id) throw new Error('option.type & option.id are missing');
  // else if (!opts.type) throw new Error('option.type is missing');
  // else if (!opts.id) throw new Error('option.id is missing');
  // else if (this.validLookupTypes.indexOf(opts.type) == -1) throw new Error('invalid lookup type');


  var query ;
  // if plural
  if (opts.type= 'albums'){
    var q = null;
    if (queryExtras && typeof queryExtras == 'object'){
      q = `${'?' + serialize(queryExtras)}`;
    }
    // query = (opts.type == 'albums') ? `/v1/albums/?ids=${opts.ids.join(',')}` : `/v1/${opts.type}/${opts.id}`;
    query = (opts.type == 'albums') ? `/v1/artists/${opts.id}/albums${q || ''}` : `/v1/${opts.type}/${opts.id}`;
    return this.get(query).then((e) => this.get(`/v1/albums/?ids=${e.items.map(f => f.id).join(',')}`).then(k => {e.albums = k.albums; return e;}))
  }
  else{
    query = `/v1/${opts.type}s/${opts.id}${queryExtras || ''}`;
    return this.get(query);
  }
}
Spotify.prototype.lookupArtistAlbums = function(){

}


Spotify.prototype.search = function(opts){
  if (!opts.type && !opts.query) throw new Error('option.type & option.query are missing');
  else if (!opts.type) throw new Error('option.type is missing');
  else if (!opts.query) throw new Error('option.query is missing');
  // else if (this.validSearchTypes.indexOf(opts.type) == -1) throw new Error('invalid search type');

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


var spotify = new Spotify();
export default spotify ;
