var util = require('util');
var Strategy = require('passport-strategy');
var LastfmAPI = require('lastfmapi');


function LastfmStrategy(options, verify){
	if (!options.api_key)  { throw new TypeError('LastfmStrategy requires a api_key option'); }
	if (!verify)  { throw new TypeError('LastfmStrategy requires verify callback'); }

	Strategy.call(this);


	this.name = 'lastfm';
	this.api_root = 'http://ws.audioscrobbler.com/2.0/';
	this.api_key = options.api_key;
	this.secret = options.secret;

	this.token_callback_url = options.token_callback_url;
	this._verify = verify;
	this._lastfm = new LastfmAPI({
		'api_key': this.api_key,
		'secret':this.secret
	});
}


// app.get('/auth/lastfm', passport.authenticate('lastfm'))
// This needs to return a function(req, res, next){}
LastfmStrategy.prototype.authenticate = function(request, options){
	var self = this;
	var authUrl = self._lastfm.getAuthenticationUrl() + `&cb=http://localhost:${process.env.PORT || 3000}/auth/lastfm/callback`;

	// if (request.path.indexOf('callback') > 0){
	if (request.query && request.query.token){
    var token = request.query.token;
		console.log('in lastfm_strategy.authenticate');


		this._lastfm.authenticate(request.query.token, function(er, session){
			if (!session) self.fail(session, 403);

			function verified(err, user, session){
				console.log('in lastfm_strategy.verified');
        if (err) { self.error(err); }
        if (!user) { self.fail(user, session); }
        self.success(user, session);
			}

			return self._verify(request, session, verified);
		});

	}
 // user not loggedin
	else if (!request.user){
		return self.redirect('/login');
	}

	//
	else{
		return self.redirect(authUrl);
	}
}





		// if session key present
		// if (request.path == '/auth/lastfm/callback'){
		//  if (request.user.lastfm){
		// 	function verified(){
		// 		return (!request.query || !request.query.token) ? self.fail({}, 403) : self.success(request.query.token);
		// 	}
		// 	self._verify(request.user.lastfm, verified);
		// }

		// // if
		// else if (request.path == '/auth/lastfm/callback'){
		// 	function verified(){
		// 		return (!request.query || !request.query.token) ? self.fail({}, 403) : self.success(request.query.token);
		// 	}
		// 	self._verify(request.query.token, verified);
		// }
		// else {

		// }





	// If no token, then redirect to lastfm to get token
	// self.redirect(authUrl);
	// else if (req.path == '/auth/lastfm/callback' && req.query.token){
	// 	var params = {
	// 		api_key:this.api_key,
	// 		token:req.query.token,
	// 		api_sig:this.generate_api_sig(req.query.token)
	// 	};
	// }

// }


util.inherits(LastfmStrategy, Strategy);


LastfmStrategy.prototype.generate_api_sig = function(token){
	var raw = `api_key${this.api_key}methodauth.getSessiontoken${token}`;
	return md5(raw);
}
LastfmStrategy.prototype.generate_auth_url = function(req){
	return `http://last.fm/api/auth?api_key=${this.api_key}&cb=http://localhost:${process.env.PORT || 3000}/auth/lastfm`;
}


module.exports = exports = LastfmStrategy;