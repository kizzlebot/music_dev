/*eslint-disable */
var webpack = require('webpack');


var quiet = (process.env.NODE_ENV == 'test');




module.exports = {
  devtool: 'source-map',

  entry: [
    `webpack-hot-middleware/client`,
    // `bootstrap-webpack!${process.cwd()}/client/bootstrap.config.js`,
    `${process.cwd()}/client/index.js`,
  ],

  output: {
    path: `${__dirname}/dist/`,
    filename: 'bundle.js',
    publicPath: '/dist/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      { test: /\.js*$/,                                         loader: 'babel', query: { presets: ['react-hmre'] }, exclude: [/node_modules/, /.+\.config.js/] },
      { test: /\.jsx*$/,                                        loader: 'babel', query: { presets: ['react-hmre'] }, exclude: [/node_modules/, /.+\.config.js/] },
      { test: /\.json?$/,        exclude: /node_modules/,       loader: 'json'},
      { test: /\.woff(\?\S*)?$/,                                loader: 'url',   query: { limit: 10000, mimetype:'application/font-woff'} },
      { test: /\.woff2(\?\S*)?$/,                               loader: 'url',   query: { limit: 10000, mimetype:'application/font-woff'} },
      { test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,           loader: 'file-loader' },
      { test: /\.less$/,                                        loaders: ['style', 'css', 'less'] },
      { test: /\.scss$/,                                        loaders: ['style', 'css', 'sass'] },
      { test: /\.css$/,                                         loader: 'style!css' },
      { test: require.resolve('jquery'),                        loader: 'expose?$!expose?jQuery' },
      { test: /bootstrap\/js\//,                                loader: 'imports?jQuery=jquery' }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        PORT: JSON.stringify(process.env.PORT || 8000)
      }
    })
  ],
};

/*eslint-enable */
