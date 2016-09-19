

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var settings = require('./setting');
var flash = require('connect-flash');
var users = require('./routes/users');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();
//
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db,//cookie name
    cookie: {maxAge: 1000 * 60 * 20 },//20分钟session失效
    store: new MongoStore({
        url: 'mongodb://localhost/blog'
    })
}));

// 设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('views', path.join(__dirname, 'views'));
/*设置视图模板引擎为 ejs*/
app.set('view engine', 'ejs');
/*添加flash功能*/
app.use(flash());
/*添加logger中间件
* 2016.09.12
* */
app.use((req,res,next)=>{
    console.log('[Logger]',req.method,req.originalUrl);
    next();
});

//设置/public/favicon.ico为favicon图标。
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
routes(app);
var reload = require('reload');
var http = require('http');

var server = http.createServer(app);
reload(server, app);

server.listen(3000, function(){
    console.log('App (dev) is now running on port 3000!');
});


module.exports = app;
