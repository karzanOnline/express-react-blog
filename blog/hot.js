/**
 * Created by caozheng on 2016/9/8.
 */
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let webpackConfig = require('./webpack.config');

let server = new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    historyApiFallback: false,
    compress: true,
    // proxy: {
    //     "**": "http://localhost:3000"
    // },
    quiet: false,
    noInfo: false,
    // lazy: true,
    // filename: "index.js",
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
    },
    // headers: { "X-Custom-Header": "yes" },
    stats: { colors: true },
});
server.listen(9090, 'localhost', () => {});
