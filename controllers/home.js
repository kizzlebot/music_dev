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
	var lastfm_sessionkey = req.user.tokens.filter((e) => e.type == 'lastfm');
	if (lastfm_sessionkey.length > 0) {
		lastfm_sessionkey = lastfm_sessionkey[0];

	}

	// console.log(lastfm_sessionkey);
	res.render('index', {title:'express'});

}