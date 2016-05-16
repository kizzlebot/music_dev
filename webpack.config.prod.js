
/*eslint-disable */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');



module.exports = {
  devtool: 'source-map',

  entry: [
    // `bootstrap-webpack!${process.cwd()}/client/bootstrap.config.js`,
    `${process.cwd()}/client/index.js`
  ],

  output: {
    path: `${process.cwd()}/static/dist/`,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
    // alias:{
    //   bootstrap:`${__dirname}/node_modules/bootstrap`
    // }
  },


  module: {
    loaders: [
      { test: /\.(js|jsx)*$/,                                   loader: 'babel', exclude: /node_modules/ },
      { test: /\.json?$/,        exclude: /node_modules/,       loader: 'json'},
      { test: /\.woff(\?\S*)?$/,                                loader: 'url',   query: { limit: 10000, mimetype:'application/font-woff', name:'dist/[name].[ext]'} },
      { test: /\.woff2(\?\S*)?$/,                               loader: 'url',   query: { limit: 10000, mimetype:'application/font-woff', name:'dist/[name].[ext]'} },
      { test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,           loader: 'file-loader' },
      // { test: /\.less$/,                                        loader: ExtractTextPlugin.extract('style', 'css', 'less') },
      // { test: /\.scss$/,                                        loader: ExtractTextPlugin.extract('style', 'css', 'sass') },
      // { test: /\.css$/,                                         loader: ExtractTextPlugin.extract('style','css'), },
      { test: /\.less$/,                                        loaders: ['style', 'css', 'less'] },
      { test: /\.scss$/,                                        loaders: ['style', 'css', 'sass'] },
      { test: /\.css$/,                                         loader: 'style!css' },
  
      { test: require.resolve('jquery'),                        loader: 'expose?$!expose?jQuery' },
      { test: /bootstrap\/js\//,                                loader: 'imports?jQuery=jquery' }
    ],
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'CLIENT': JSON.stringify(true),
        'NODE_ENV': JSON.stringify('production')
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
