/**
 * Created by caozheng on 2016/9/3.
 */
var mongodb = require('./db');
var DataBase  = require('./database');
function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

/*存入用户信息*/
User.prototype.save = function (callback) {
    /*要存入数据库用户文档*/
    var user = {
        name : this.name,
        password : this.password,
        email : this.email
    };
    new DataBase().insert('users',user,callback);
};

//读取用户信息
User.get = function(name, callback) {
    //打开数据库
    new DataBase().findOne('users',{name:name},callback);
};
