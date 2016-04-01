var LastfmAPI = require('lastfmapi');


var key = '7b3fb0efdb5cd66aebcab7230be6aeb6';

var _lastfm = new LastfmAPI({
  'api_key': process.env.LASTFM_KEY,
  'secret':process.env.LASTFM_SECRET
});

_lastfm.setSessionCredentials('phatboyslikepk', key);

module.exports = _lastfm;
