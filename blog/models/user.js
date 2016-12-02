/**
 * Created by caozheng on 2016/9/3.
 */
//var mongodb = require('./db');
//var mongodb = require('mongodb').Db;
//var settings = require('./../settings');

var DataBase  = require('./database');

function User(user) {

    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
    this.nickname = user.nickname||'';
    this.userinfo = user.userinfo||'';
    this.avatar = user.avatar || ''
}

module.exports = User;

/*存入用户信息*/
User.prototype.save = function (callback) {
    /*要存入数据库用户文档*/
    var user = {
        name : this.name,
        password : this.password,
        email : this.email,
        nickname:  this.nickname,
        userinfo : this.userinfo,
        avatar : this.avatar
    };
    new DataBase().insert('users',user,callback);
};

//读取用户信息
User.get = function(name, callback) {
    //打开数据库

    if(callback && typeof callback=='function'){

        new DataBase().findOne('users', {name:name}, callback);
    }else{

        console.log('user.js 返回promise');
        //console.log(new DataBase().findOne('users',{name:name}))
        return new DataBase().findOne('users', {name:name});
    }
};

//更新用户信息
User.update = function (data, setData, callback) {

    if(callback && typeof  callback == 'function'){

        //使用回调
        new DataBase().update('users', data, setData, callback);
    } else {

        //使用promise
        return new DataBase().update('users', data, setData);
    }

};
