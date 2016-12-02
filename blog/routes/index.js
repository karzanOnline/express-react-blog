// var express = require('express');
// var router = express.Router();
// module.exports = router;
// require('babel-core/register');
var fs = require('fs');
var Reg = require('../models/login/reg');
var Login = require('../models/login/login');
var CheckLogin = require('../models/common').CheckLogin;
var CheckNotLogin = require('../models/common').CheckNotLogin;
var Post = require('../models/post/post');
//返回数据格式进行封装
var Result = require('../server/resultMap');
var DataBase = require('../models/database');
var User = require('../models/user');
var co = require('co');
//上传文件功能
var multer = require('multer');
//上传文件最新
var formidable = require('formidable');
var util = require('util');
var ObjectID = require('mongodb').ObjectID;
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/images')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});
var upload = multer({
    storage: storage
});

/*
* test
* */
var fs = require('fs');
//上传文件配置END
module.exports = function (app) {

  //总监让写的月度总结
  app.get('/karzan/share', function (req, res) {
    //月度总结渲染
    res.render('share', {
      test : 'test'
    })
  });

  //来做个测试
  app.post('/test/render',function (req, res) {
    // res.send('result')
    fs.readFile("./../views/" , function (err, files) {

    })
  });

  //返回图片路由
  app.get('/public/images/:name', function (req, res) {

    var options = {
      root: './public/images/',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
    var fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
      else {
        console.log('Sent:', fileName);
      }
    });

  });
  
  /*配合单页面路由对所有get路由进行拦截.*/
  app.get('*', function (req, res) {
    // Post.getAll(null, function (err, posts) {
    //   err&&(posts = []);
    // });
    res.render('index', {
        title: '主页',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
        env : 'development'
      });
  });


  //添加特定用户跳转文章路由
  app.post('/u/:name',function(req,res){
    console.log('使用user/name路由');
    let postData,user=req.session.user;
    //查询是否有此用户
    User.get(user.name,function(err,data){
      err&& res.send(Result.set(false,'失败',{msg:err}));
      if(data){
        //根据用户name查询所有文章
        Post.getAll(user,function(err,post_data){
          err&& res.send(Result.set(false,'失败',{msg:err}));
          res.send(Result.set(true,'成功',{postData:post_data}))
        })
      }else{
        res.send(Result.set(true,'成功',{msg:'用户未登陆！或者登陆超时！',msgCode:2}))
      }
    })
  });


  //跳转文章详情路由
  app.post('/u/:name/:day/:title',function(req,res){
    let obj = {
      name : req.params.name,
      day : req.params.day,
      title : req.params.title
    };
    Post.findOne(obj,function(err,data){
      err? res.send(Result.set(false,'失败',{msg:err})):res.send(Result.set(true,'成功',{postData:data}))
    })
  });


  /*注册get*/
  app.post('/reg', function (req, res) {
    Reg(req,res);
  });

  /*刷新路由*/
  app.post('/index', function (req, res) {
    //获取个人信息
    var session = req.session;
    if (session.user){
      //检测出用户在登陆状态
      var data = {
        user : session.user,
        info : session.info||'',
        head : session.head||''
      };

      res.send(Result.set(true, '获取成功！', {data : data}))
    }else{

      res.send(Result.set(false, '用户未登陆！或者登陆超时！', {msgCode:2}))
    }

  });



  //登陆路由
  app.post('/login', function (req, res) {
    Login(req,res);
  });


  //退出协议
  app.post('/exit',function (req,res) {
    req.session.user = null;
    req.flash('success', '登出成功!');
    res.send(Result.set(true,'退出成功！',{}));
  });


  //保存文章路由
  app.post('/post/savePost',function (req,res) {
    var sessionUser = req.session.user,
        data = JSON.parse(req.body.d);
    /*tostring 是为了防止有0的输入*/
    if (req.session.user && data.title.toString() && data.body.toString()){
      new Post(sessionUser.name,data.title,data.body).save(function (err) {
        err?res.send(Result.set(false,'失败',{msg:err})):res.send(Result.set(true,'成功',{}));
      })
    }else {
      res.send(Result.set(false,'失败',{msg:'传参数错误！'}))
    }
  });


  // 创建取出postData的协议
  app.post('/obtainPost',function(req,res){
    var sessionUser = req.session.user;
    Post.getAll(sessionUser,function (err,postData){
      //返回数据
      err?res.send(Result.set(false,'失败',{msg:err})):res.send(Result.set(true,'成功',{postData:postData}));
    });
  });


  //上传协议
  app.post('/upload',function (req,res) {
    //先判断是否在登陆
    if(!req.session.user){res.send(Result.set(false,'失败',{msg:'请登陆后再操作！',msgCode:2}))}else{
      var form = new formidable.IncomingForm();                            
    form.uploadDir = "./public/images/";
    form.keepExtensions = true;                                           
    form.maxFieldsSize = 2 * 1024 * 1024; 
    form.parse(req, function(err, fields, files) {
      //如果返回错误
      err?res.send( Result.set(false, '上传失败', {msg: err.msg}) ):
              res.send(`<!DOCTYPE html>
                  <html>
                  <head>
                  <title></title>
                  </head>
                  <body>
                  <input id="jsUrl" value="${files.upload.path}" />
            <input id="jsMsg" value="成功" />
            <input id="jsCode" value="0" />
            <input id="jsHash" value="ed76c7e8f15a8aee190718ac4b6e201e" />
      </body>
      </html>`)
    });

    }
  });


  //获取当前页面单个文章
  app.post('/article',function(req,res){

    let id = req.body.id;
    var markdown = req.body.markdown;

    if(!req.session.user){
      //检测是否登陆
      res.send(Result.set(false,'用户未登陆！或者登陆超时！',{msgCode:2}))
    }else{
        //返回markdown语法 第二个参数
        //获取当前页面文章
        Post.getOne({_id:id,markdown:markdown},function(err,post){
          err?res.send(Result.set(false,'失败',{msg:err})):res.send(Result.set(true,'成功',{post:post}));
        })
    }
  });


  //提交作者信息
  app.post('/user/info',function (req, res) {

    if(req.session.user){
      var temp = JSON.parse(req.body.d);
      //这里不对内容拦截, 在react中拦截
      var userData = {
        name : req.session.user.name,
      };
      var setData = {
        $set : {
          nickname : temp.nickname,
          userinfo : temp.userinfo,
          avatar : temp.avatar
        }
      };
      User.update( userData, setData, function (err, data) {
        if(err){
          res.send(Result.set(false, '操作数据库失败', {}));
        } else {
          //用户信息存储在session中
          req.session.user.nickname = temp.nickname;
          req.session.user.userinfo = temp.userinfo;
          req.session.user.avatar = temp.avatar;
          res.send(Result.set(true, '操作成功！', {}));
        }
      });
    }else{
      res.send(Result.set(false, '用户未登陆！或者登陆超时！', {msgCode:2}))
    }
  });

  //获取用户所有信息
  app.post('/info', function (req, res) {

    //检查是否处于登陆
    if(req.session.user){
      res.send(Result.set(true, '成功！', {user : req.session.user}));
      // User.get(req.session.user.name, function (err, data) {
      //   if(err){
      //     res.send(Result.set(false, '操作数据库失败！', {}))
      //   }else{
      //     res.send(Result.set(true, '成功！' ,{data : data}))
      //   }
      // })
    }else{
      res.send(Result.set(false, '用户未登陆！或者登陆超时！', {msgCode:2}))
    }
  });

  //修改文章内容
  app.post('/editPost', function (req, res) {

    var reqData = JSON.parse(req.body.d);
    var id = {_id:ObjectID(reqData.id)};
    var data = {post:reqData.post, title:reqData.title};
    if(req.session.user){
      new DataBase().update('posts', id, {$set: data}, function (err) {
        if(err){
          res.send(Result.set(false, '操作数据库失败！', {}))
        }else{
          res.send(Result.set(true, '成功！', {}))
        }
      })
    }else{
      res.send(Result.set(false, '用户未登陆！或者登陆超时！', {msgCode:2}))
    }

  })

};
