var webpack = require("webpack");
var config = require("./webpack.server.js");
var pkg = require('../package.json');


var wds = {
	hostname: process.env.HOST || "localhost",
	port: process.env.WEBPACK_PORT || 8080
};




config.cache = true;
config.debug = true;

config.entry.unshift(
	"webpack/hot/poll?1000"
);

config.output.publicPath = "http://" + wds.hostname + ":" + wds.port + "/dist";

var env_variables = {
  __CLIENT__: false,
  __SERVER__: true,
  __PRODUCTION__: false,
  __DEV__: true,
  __PKG__:`"${pkg.name}"`,
  NODE_ENV:`"${process.env.NODE_ENV || 'production'}"`,
  PORT: process.env.PORT || 8000,
  WEBPACK_PORT: process.env.WEBPACK_PORT || 8080
}

config.plugins = [
	new webpack.DefinePlugin(env_variables),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];

module.exports = config;
