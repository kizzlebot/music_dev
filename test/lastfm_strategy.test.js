var path = require('path');
var LastFmStrategy = require(path.join(process.cwd(), 'src/server/config/lastfm_strategy'));


var strategy;


describe('lastfm strategy constructor', function(){
  it('should be a function', function(){
    expect(LastFmStrategy).to.be.a('function');
  });


  it('should be named lastfm', function(){
    strategy = new LastFmStrategy({
      'api_key':'abcd',
      'secret':'abcd',
      callbackURL:'http://localhost:4000'
    }, () => {});

    expect(strategy.name).to.equal('lastfm');
  });


  it('should have an authenticate function on .prototype', function(){
    expect(LastFmStrategy.prototype.authenticate).to.be.defined;
  });

  it('should throw if api_key not specified', function(){
    expect(function(){
      var s = new LastFmStrategy({}, () => {});
    }).to.throw(TypeError)
  });

})
