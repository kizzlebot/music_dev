


var webpack       = require("webpack");
var nodeExternals = require("webpack-node-externals");
var path          = require("path");
var fs            = require("fs");
var dotenv = require('dotenv');
var pkg = require('../package.json');
var path = require('path');

// dotenv.config({path: path.join(process.cwd(), '.env.example')});
var eenv = {};

// var env = (fs.existsSync(path.join(process.cwd(), '.env.example'))) ? dotenv.parse(fs.readFileSync(path.join(process.cwd(), '.env.example'))) : {};
// var jenv = (fs.existsSync(path.join(process.cwd(), '.env'))) ? dotenv.parse(fs.readFileSync(path.join(process.cwd(), '.env'))) : {};

// eenv['process.env'] = env;



fs.readFile(path.resolve(path.join(process.cwd(), '.env.example')), function(err, data){
  eenv['process.env'] = dotenv.parse(data);
  eenv['process.env'] = Object.keys(eenv['process.env']).reduce((prev, curr) => {
    if (process.env[curr]){
      prev[curr] = process.env[curr];
    }
    else{
      prev[curr] = eenv['process.env'];
    }
    return prev ;
  }, {});

});








module.exports = {
  target:  "node",
  cache:   false,
  context: process.cwd(),
  debug:   false,
  // devtool: "source-map",
  entry:   ["./src/server.js"],
  output:  {
    path:          path.join(process.cwd(), "/dist"),
    filename:      "server.js"
  },
  plugins: [
    new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false, __PKG__:`"${pkg.name}"`, NODE_ENV:`"${process.env.NODE_ENV}"`}),
    new webpack.DefinePlugin(eenv)
  ],
  module:  {
    loaders: [
      { test: /\.json$/, 																				loaders: ["json"]},
      { test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/, 						loaders: ["file?context=static&name=/[path][name].[ext]"], exclude: /node_modules/},
      { test: /\.js$/, 																					loaders: ["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"], exclude: /node_modules/},
      { test: /\.jade?$/,              													loader: 'jade', exclude: /node_modules/},
      { test: /\.woff(\?\S*)?$/,                               	loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?\S*)?$/,                               loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,           loader: 'file-loader' }
      // { test: /\.scss$/,                                        loaders: ['raw', 'css', 'sass'] }
      // { test: /\.css$/,                                         loaders: ['raw']}
    ],
    postLoaders: [],
    noParse: /\.min\.js/
  },
  externals: [nodeExternals({
    whitelist: ["webpack/hot/poll?1000"]
  })],
  resolve: {
    modulesDirectories: ["src", "node_modules", "static"],
    extensions: ["", ".json", ".js"]
  },
  node:    {
    __dirname: true,
    fs:        "empty"
  }
};
