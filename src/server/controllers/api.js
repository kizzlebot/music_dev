var router = require('express').Router();
var _ = require('lodash');




var api = {
	lastfm : function(req, res, next){

		var session = _.find(req.user.tokens, {type:'lastfm'});

		if (session){
			// req.lastfm.setSessionCredentials(session.username, session.key);
			req.lastfm.user.getTopTracks( {user:session.username}, (err, data) => {
				if (err) next(err);
				res.send({lastfm:data});
			});
		}
		else next();
	}
};





router.get('/lastfm/:action?', function(req, res, next){
	if (req.params.action){
		var session = _.find(req.user.tokens, {type:'lastfm'});
		if (session){
			switch(req.params.action){
				case 'topTracks':
					req.lastfm.user.getTopTracks( {user:session.username}, (err, data) => {
						if (err) next(err);
						res.send(data);
					});
					break;
				case 'topArtists':
					req.lastfm.user.getTopArtists( {user:session.username}, (err, data) => {
						if (err) next(err);
						res.send(data);
					});
					break;

				default:
					req.lastfm.user.getInfo( session.username, (err, data) => {
						if (err) next(err);
						res.send(data);
					});
					break;
			}
		}
	}
	else {
		var actions = {
			topTracks:'/topTracks',
			topArtists:'/topArtists'
		}
		res.send(actions);
	}
});

router.get('/callback?', function(req, res, next){
	console.log(req.query);
	res.cookie('accessToken', req.query.code)
	res.status(200).send()
});


module.exports = router;