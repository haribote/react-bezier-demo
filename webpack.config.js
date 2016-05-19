// import modules
var path    = require('path');
var webpack = require('webpack');

module.exports = {
  entry  : [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/main.js'
  ],
  output : {
    path      : path.resolve(__dirname, 'dist'),
    filename  : 'bundle.js',
    publicPath: '/assets/'
  },
  module : {
    loaders: [
      {
        test  : /\.jsx?$/,
        loader: 'babel-loader',
        query : {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'eval-source-map'
};
