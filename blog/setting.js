/**
 * Created by caozheng on 2016/9/3.
 */

var devConfig = {
    //开发下使用本地
    cookieSecret: 'myblog',
    db: 'blog',
    // host: 'localhost',
    // port: 27017,
    url : 'mongodb://localhost:27017/blog'
};

var dataBaseProduction = {
    //使用线上
    cookieSecret: 'myblog',
    db: 'caozheng',
    url: 'mongodb://caozheng:caozheng@ds053146.mlab.com:53146/caozheng',
};


module.exports = devConfig;
