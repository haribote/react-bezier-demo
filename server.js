// import modules
var WebpackDevServer = require("webpack-dev-server");
var webpack          = require("webpack");
var config           = require("./webpack.config.js");
var compiler         = webpack(config);

var server = new WebpackDevServer(compiler, {
  contentBase: './dist',
  hot        : true,
  publicPath : config.output.publicPath,
  stats      : {
    colors: true
  }
});
server.listen(8080);