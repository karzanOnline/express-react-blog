/**
 * Created by caozheng on 2016/9/3.
 */


var crypto = require('crypto'),
    User = require('../user.js'),
    Result = require('../../server/resultMap');
function Login(req,res) {
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(JSON.parse(req.body.d).password).digest('hex');
    //检查用户是否存在

    User.get(JSON.parse(req.body.d).name, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在!');
            res.send(Result.set(false,'用户不存在!',{msg:err}));
            //return res.redirect('/login');//用户不存在则跳转到登录页
        }
        console.log(user);
        //检查密码是否一致
        if (user.password != password) {
            req.flash('error', '密码错误!');
            res.send(Result.set(false,'密码错误!',{}));
            //return res.redirect('/login');//密码错误则跳转到登录页
        }
        //用户名密码都匹配后，将用户信息存入 session
        req.session.user = user;
        req.flash('success', '登陆成功!');
        res.send(Result.set(true,'登陆成功!',{msg:'J000000'}));
        //res.redirect('/');//登陆成功后跳转到主页
    });
}
module.exports = Login;