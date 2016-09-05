/**
 * Created by caozheng on 2016/9/5.
 */
var mongodb = require('../db');
function Post(name, title, post) {
    this.name = name;
    this.title = title;
    this.post = post;
}

module.exports = Post;

/*存储一篇文章*/
Post.prototype.save = function (callback) {
    var date = new Date();
    //存储各种时间格式，方便以后扩展
    var time = {
        date: date,
        year : date.getFullYear(),
        month : date.getFullYear() + "-" + (date.getMonth() + 1),
        day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    };
    //要存入数据库的文档
    var post = {
        name: this.name,
        time: time,
        title: this.title,
        post: this.post
    };
    mongodb.open(function (err,db) {
        if (err)
            return callback(err);
        //读取 posts 集合
        db.collection('posts',function (err,collection) {
            if (err){
                mongodb.close();
                return callback(err)
            }
            //将文档插入 posts 集合
            collection.insert(post,{safe:true},function (err) {
                mongodb.close();
                if (err)
                    return callback(err);
                callback(null); //返回成功
            })
        })
    })
};


/*读取一篇文章*/
Post.get = function (name,callback) {
    /*打开数据库*/
    let cc = 'caozheng';
    return cc;
    // new promise(()=>{
    //     mongodb.open()
    // }).then(function (db) {
    //     return db.collection('posts');
    // }).then(function (collection) {
    //     let query = {};
    //     if (name){
    //         query.name = name
    //     }
    //     return collection.find(query).sort({time:-1})
    //         .toArray()
    // }).then((docs)=>{
    //     return callback(null,docs)
    // }).catch(function (err) {
    //     mongodb.close();
    //     return callback(err)
    // });
    // mongodb.open(function (err,db) {
    //     if (err)
    //         return callback(err);
    //     db.collection('posts',function (err,collection) {
    //         if (err){
    //             mongodb.close();
    //             return callback(err);
    //         }
    //         var query = {};
    //         if (name) {
    //             query.name = name;
    //         }
    //         //根据 query 对象查询文章
    //         collection.find(query).sort({time:-1})
    //             .toArray(function (err,docs) {
    //                 mongodb.close();
    //                 if (err) {
    //                     return callback(err);//失败！返回 err
    //                 }
    //                 callback(null, docs);//成功！以数组形式返回查询的结果
    //             })
    //     })
    // })
};