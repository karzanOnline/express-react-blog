/**
 * Created by caozheng on 2016/9/1.
 */
let webpack = require('webpack');
let path = require('path');
const entries_key = Object.keys(require('./entry.config'));

let node_modules = path.resolve(__dirname, 'node_modules');
let publicPath = 'http://localhost:9090/';
// var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const ROOT_PATH = path.resolve(__dirname);
//暂时不用
// var fs = require('fs'),
//     util = require('util'),
//     fsPath = 'client';
// var pathArr = [];
// function explorer(path){
//
//     fs.readdir(path, function(err, files){
//         //err 为错误 , files 文件名列表包含文件夹与文件
//         if(err){
//             console.log('error:\n' + err);
//             return;
//         }
//
//         files.forEach(function(file){
//
//             fs.stat(path + '/' + file, function(err, stat){
//                 if(err){console.log(err); return;}
//                 if(stat.isDirectory()){
//                     // 如果是文件夹遍历
//                     // explorer(path + '/' + file);
//                 }else{
//                     // 读出所有的文件
//                     console.log(path + '\\' + file);
//                     pathArr.push(path + '\\' + file)
//                 }
//             });
//
//         });
//
//     });
// }
//
// explorer(fsPath);



let devConfig = {
    entry: require(path.resolve(__dirname, 'entry.config')),
    output: {
        publicPath,
        path: './public/dist/',
        filename: '[name].js',
        chunkFilename: 'chunk/[chunkhash:8].chunk.js',
    },
    externals: [
        {
            'jquery': 'jQuery',
            'react': 'React',
            'react-dom': 'ReactDOM',
            'immutable': 'Immutable',
             moment: true
        },
        require('webpack-require-http'),

    ],
    ProvidePlugin: {
        React: 'react',
        ReactDOM: 'react-dom',
        //"Immutable":"immutable"
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: /node_modules/,
            },      /* es6 to es5*/
            {
                test: /\.(scss|sass)?$/,
                loader: 'style!css!sass',
            },
            {
                test: /\.css?$/,
                loader: 'style!css',
            },
            {
                test: /\.(jpg|png|gif|jpeg)?$/,
                loader: 'url?limit=20480&name=dist/images/[name].[hash:8].[ext]',
            },
            {
                test: /\.(eot|woff(2)?|ttf|svg)?(@.+)*$/,
                loader: 'url?limit=20480&name=dist/other/[name].[hash:8].[ext]',
            },
        ],
        noParse: ['react', 'co', 'react-router'],
    },
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            minChunks: 2,
            chunks: entries_key,
        }),
    ],
    resolve: {
        // 查找module的话从这里开始查找
        root: [
            `${__dirname }/public/`, // 绝对路径
            path.join(__dirname, 'dist'),
            path.join(__dirname, 'node_modules'),
        ],
        // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.scss', '.jsx'],
        // 模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            '{server}': `${ROOT_PATH}/server`,
            '{public}': `${ROOT_PATH}/public`,
        },
    },
};
module.exports = devConfig;
