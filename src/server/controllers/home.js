var express = require('express');
var router = express.Router();
var _ = require('lodash');
var LastfmAPI = require('lastfmapi');


// var key = '7b3fb0efdb5cd66aebcab7230be6aeb6';

var _lastfm = new LastfmAPI({
  'api_key': process.env.LASTFM_KEY,
  'secret':process.env.LASTFM_SECRET
});



// module.exports = _lastfm;

exports.index = function(req, res, next){
	if (req.users){
		var session = _.find(req.user.tokens, {type:'lastfm'});

		if (session){
			_lastfm.setSessionCredentials(session.username, session.key);
			_lastfm.user.getInfo((err, data) => res.render('index', {title:'expressf', lastfm:data}))
		}
	}
	else res.render('index', {title:'express'});
}
