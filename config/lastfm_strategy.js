var util = require('util');
var Strategy = require('passport-strategy');
var LastfmAPI = require('lastfmapi');


function LastfmStrategy(options, verify){
	if (!options.api_key)  { throw new TypeError('LastfmStrategy requires a api_key option'); }
	if (!options.secret)  { throw new TypeError('LastfmStrategy requires a secret option'); }
	if (!options.callbackURL)  { throw new TypeError('LastfmStrategy requires a callbackURL option'); }
	if (!verify)  { throw new TypeError('LastfmStrategy requires verify callback'); }

	Strategy.call(this);

	this.name = 'lastfm';
	this.api_key = options.api_key;
	this.secret = options.secret;
	this.callbackURL= options.callbackURL;



	this._verify = verify;
	this._lastfm = new LastfmAPI({
		'api_key': this.api_key,
		'secret':this.secret
	});
}


LastfmStrategy.prototype.authenticate = function(req, options){
	var self = this;
	var authUrl = self._lastfm.getAuthenticationUrl() + `&cb=${this.callbackURL}`;


	if (req.query && req.query.token){
    var token = req.query.token;

		this._lastfm.authenticate(req.query.token, function(er, session){
			if (!session) self.fail(session, 403);


			// Build the done() function called by the verify function
			function verified(err, user, session){

        if (err)  self.error(err);
        else if (!user) self.fail(user, session);
        else self.success(user, session);
			}

			self._verify(req, session, verified);
		});
	}
	else{
		self.redirect(authUrl);
	}
}







util.inherits(LastfmStrategy, Strategy);



module.exports = exports = LastfmStrategy;