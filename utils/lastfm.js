var LastfmAPI = require('lastfmapi');


// var key = '7b3fb0efdb5cd66aebcab7230be6aeb6';

var _lastfm = new LastfmAPI({
  'api_key': process.env.LASTFM_KEY,
  'secret':process.env.LASTFM_SECRET
});




function lastfm_api(username, sessionKey){
	this.username = username ;
	this.sessionKey = sessionKey;
}

lastfm_api.prototype.getUser = function(cb){
	_lastfm.setSessionCredentials(this.username, this.sessionKey);
	_lastfm.user.getInfo(cb);
}

// _lastfm.setSessionCredentials('phatboyslikepk', key);

module.exports = _lastfm;
