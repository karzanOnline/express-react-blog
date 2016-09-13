/**
 * Created by caozheng on 2016/9/5.
 */
function checkLogin(req,res,next) {
    if (!req.session.user){
        req.flash('error','未登陆！');
        res.redirect('/login');
    }
    next();
}

function checkNotLogin(req,res,next) {
    console.log('caozheng create'+req.session.user);
    if (req.session.user){
        req.flash('error','已登陆！');
        res.redirect('back'); //返回之前的页面
    }
    next()
}

function toString(data) {
    return data.toString()
}

//test

module.exports ={
    CheckLogin : checkLogin,
    CheckNotLogin : checkNotLogin,
};
