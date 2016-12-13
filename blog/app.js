


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var settings = require('./setting');
var flash = require('connect-flash');
var compress = require('compression');
var users = require('./routes/users');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();
var reload = require('reload');
var http = require('http');

var server = http.createServer(app);

var port = process.env.PORT || 3000;
//
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db,//cookie name
    cookie: { maxAge: 1000 * 60 * 60 }, // 60分钟session失效
    store: new MongoStore({
        url: 'mongodb://localhost/blog'
    }),
    url: settings.url,
}));

app.use(compress());
// 设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('views', path.join(__dirname, 'views'));
/* 设置视图模板引擎为 ejs*/
app.set('view engine', 'ejs');
/* 添加flash功能*/
app.use(flash());

/* 添加logger中间件
* 2016.09.12
* */
app.use((req, res, next) => {
    console.log('[Logger]', req.method, req.originalUrl);
    next();
});

// 设置/public/favicon.ico为favicon图标。
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.bodyParser({
//     uploadDir: __dirname + '/upload/',
// keepExtensions: true,
//     limit: 10000000,
//     defer: true
// }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
routes(app);

reload(server, app);

server.listen(port, () =>  {
    console.log('App (dev) is now running on port 3000!');
});


module.exports = app;
