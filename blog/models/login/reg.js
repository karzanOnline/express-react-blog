/**
 * Created by caozheng on 2016/9/3.
 */
var crypto = require('crypto'),
    User = require('../user.js'),
    Result = require('../../server/resultMap');
function Reg(req,res) {
    var name = JSON.parse(req.body.d).name,
        password = JSON.parse(req.body.d).password,
        password_re = JSON.parse(req.body.d).passwordRe;
    //检验用户两次输入的密码是否一致
    if (password_re != password) {
        req.flash('error', '两次输入的密码不一致!');
        res.send(Result.set(false,'两次输入的密码不一致!',{}));
        //return res.redirect('/reg');//返回注册页
    }
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(password).digest('hex');
    var newUser = new User({
        name: name,
        password: password
    });
    //检查用户名是否已经存在

    User.get(newUser.name, function (err, user) {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(user);
        if (err) {
            req.flash('error', err);
            res.send(Result.set(false,'数据库操作异常！',{msg:error}));
            //return res.redirect('/');
        }
        if (user) {
            req.flash('error', '用户已存在!');
            res.send(Result.set(false,'用户已存在！',{}));
            return false;
            //return res.redirect('/reg');//返回注册页
        }
        //如果不存在则新增用户
        newUser.save(function (err, user) {
            if (err) {
                req.flash('error', err);
                res.send(Result.set(false,'数据库操作异常！',{msg:error}));
                //return res.redirect('/reg');//注册失败返回主册页
            }
            req.session.user = newUser;//用户信息存入 session
            req.flash('success', '注册成功!');
            res.send(Result.set(true,'注册成功！',{msg:'J000000'}));
            //res.redirect('/');//注册成功后返回主页
        });
    });
}
function ObjHasKey(obj,key) {
    var boolean = false;
    if (!(typeof obj=='Object')){
        return false;
    }
    Object.keys(obj).forEach(function (item) {
        if (key == item){
            boolean = true
        }
    });
    return boolean
}
module.exports = Reg;
