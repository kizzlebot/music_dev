// var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

// module.exports = {
//   devtool: 'source-map',

//   entry: __dirname + "/client/index.js",

//   output: {
//     path: __dirname + '/static/dist/',
//     filename: 'bundle.js',
//   },

//   resolve: {
//     extensions: ['', '.js', '.jsx'],
//   },

//   module: {
//     loaders: [
//       {
//         test: /\.css$/,
//         loader: ExtractTextPlugin.extract('style','css?modules'),
//       },
//       {
//         test: /\.jsx*$/,
//         exclude: /node_modules/,
//         loader: 'babel',
//       }
//     ],
//   },

//   plugins: [
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': JSON.stringify('production'),
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       compressor: {
//         warnings: false,
//       }
//     }),
//     new ExtractTextPlugin("app.css"),
//   ],
// };


/*eslint-disable */

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');



module.exports = {
  devtool: 'source-map',

  entry: `${process.cwd()}/client/index.js`,

  output: {
    path: `${process.cwd()}/static/dist/`,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [

      { test: /\.(js|jsx)*$/,                                   loader: 'babel', exclude: /node_modules/ },
      { test: /\.json?$/,        exclude: /node_modules/,       loader: 'json'},
      { test: /\.woff(\?\S*)?$/,                                loader: 'url',   query: { limit: 10000, mimetype:'application/font-woff'} },
      { test: /\.woff2(\?\S*)?$/,                               loader: 'url',   query: { limit: 10000, mimetype:'application/font-woff'} },
      { test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,           loader: 'file-loader' },
      { test: /\.less$/,                                        loader: ExtractTextPlugin.extract('style', 'css', 'less') },
      { test: /\.scss$/,                                        loader: ExtractTextPlugin.extract('style', 'css', 'sass') },
      { test: /\.css$/,                                         loader: ExtractTextPlugin.extract('style','css?modules'), },
      { test: require.resolve('jquery'),                        loader: 'expose?$!expose?jQuery' },
      { test: /bootstrap\/js\//,                                loader: 'imports?jQuery=jquery' }
    ],
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
    new ExtractTextPlugin("app.css"),
  ],
};



// /*eslint-enable */
