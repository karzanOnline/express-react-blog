// var express = require('express');
// var router = express.Router();
// module.exports = router;
// require('babel-core/register');
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
//上传文件配置END
module.exports = function (app) {
  
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
    console.log('使用user/name路由')
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
        res.send(Result.set(true,'成功',{msg:'用户未登录！'}))
      }
    })
  })


  //跳转文章详情路由
  app.post('/u/:name/:day/:title',function(req,res){
    let obj = {
      name : req.params.name,
      day : req.params.day,
      title : req.params.title
    }
    Post.findOne(obj,function(err,data){
      err? res.send(Result.set(false,'失败',{msg:err})):res.send(Result.set(true,'成功',{postData:data}))
    })
  })


  /*注册get*/
  app.post('/reg', function (req, res) {
    Reg(req,res);
  });



  //登陆路由
  app.post('/login', function (req, res) {
    Login(req,res);
  });


  //退出协议
  app.post('/exit',function (req,res) {
    req.session.user = null;
    req.flash('success', '登出成功!');
    res.send(Result.set(true,'登出成功！',{}));
  });


  //保存文章路由
  app.post('/post/savePost',function (req,res) {
    var sessionUser = req.session.user,
        data = JSON.parse(req.body.d);
    /*tostring 是为了防止有0的输入*/
    if (req.session.user&&data.title.toString()&&data.body.toString()){
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
      })
  });


  //上传协议
  app.post('/upload',function (req,res) {
      console.log('----------')
      console.log(req.payload)
  })


  //获取当前页面单个文章
  app.post('/article',function(req,res){

    let id = req.body.id

    if(!req.session.user){
      //检测是否登陆
      res.send(Result.set(false,'失败',{msg:'用户登陆!'}))
    }
    //获取当前页面文章
    Post.getOne({_id:id},function(err,post){
      err?res.send(Result.set(false,'失败',{msg:err})):res.send(Result.set(true,'成功',{post:post}));
    })
  })
    

};
