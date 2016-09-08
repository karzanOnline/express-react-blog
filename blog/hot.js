/**
 * Created by caozheng on 2016/9/8.
 */
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require('./webpack.config');

var server = new WebpackDevServer(webpack(webpackConfig),{
    hot: true,
    historyApiFallback: false,
    compress: true,
    // proxy: {
    //     "**": "http://localhost:3000"
    // },
    quiet: false,
    noInfo: false,
    //lazy: true,
    //filename: "index.js",
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    //headers: { "X-Custom-Header": "yes" },
    stats: { colors: true }
});
server.listen(9090, "localhost", function() {});