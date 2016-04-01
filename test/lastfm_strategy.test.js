var lastfm_strategy = require('../config/lastfm_strategy');



describe('lastfm strategy constructor', function(){
	it('should be a function', function(){
		expect(lastfm_strategy).to.be.a('function');
	})



	it('should have an authenticate function on .prototype', function(){
		expect(lastfm_strategy.prototype.authenticate).to.be.defined;
	});

	it('should throw if clientid not specified', function(){
		expect(new lastfm_strategy()).to.throw(TypeError)
	});

})