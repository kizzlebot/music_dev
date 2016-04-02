var express = require('express');
var router = express.Router();

var LastfmAPI = require('lastfmapi');


// var key = '7b3fb0efdb5cd66aebcab7230be6aeb6';

var _lastfm = new LastfmAPI({
  'api_key': process.env.LASTFM_KEY,
  'secret':process.env.LASTFM_SECRET
});



// module.exports = _lastfm;

exports.index = function(req, res, next){
	if (req.users){
		var session = req.user.tokens.reduce((prev, curr) => {
			if (prev) return prev;
			if (curr.type == 'lastfm') return curr;
			return prev;
		}, null);
		if (session){
			_lastfm.setSessionCredentials(session.username, session.key);
			_lastfm.user.getInfo((err, data) => res.render('index', {title:'expressf', lastfm:data}))
		}
	}
	else res.render('index', {title:'express'});



}