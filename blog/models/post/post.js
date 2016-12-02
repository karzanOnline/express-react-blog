/**
 * Created by caozheng on 2016/9/5.
 */
//var mongodb = require('../db');
var mongodb = require('mongodb').MongoClient;
var settings = require('./../../setting.js');
var ObjectID = require('mongodb').ObjectID;
//支持markdown语法
var markdown = require('markdown').markdown;
/*文章构造函数*/
function Post(name, title, post) {
    this.name = name;
    this.title = title;
    this.post = post;
}

module.exports = Post;

/*存储一篇文章*/
Post.prototype.save = function (callback) {
    var dbContent = null;
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
    return new Promise((resolve)=>{
        mongodb.connect(settings.url, (err,db)=>{dbContent = db; resolve(db)})
    }).then((db)=>{
        return db.collection('posts')
    }).then((collection)=>{
        return collection.insert(post,{safe:true})
    }).then((err)=>{
        dbContent.close();
        return callback(null); //返回成功
    }).catch((err)=>{
        /*抛异常关闭服务*/
        dbContent.close();
        return callback(err);
    });
};


/*读取一篇文章*/
Post.getOne = function (obj,callback) {
    var dbContent = null;

    new Promise((resolve)=>{
        /*打开数据库*/
        mongodb.connect(settings.url, (err,db)=>{dbContent =db; resolve(db)});
    }).then(function (db) {
        return db.collection('posts');
    }).then(function (collection) {
        var query = {};

        obj._id&&(obj._id=ObjectID(obj._id));
        // if (obj.name){
        //     query = Object.assign({},obj);
        // }

        //连接数据库后之查找一片文章
        try {
            return collection.findOne(obj._id)
        } catch (error) {
            throw (error)
        }
        //return collection.findOne(query)
    }).then((doc)=>{
        dbContent.close();
        //判断返回的类型
        !obj.markdown && (doc.post = markdown.toHTML(doc.post));
        return callback(null,doc)
    }).catch(function (err) {
        dbContent.close();
        return callback(err)
    });
};

/*读取全部文章*/
Post.getAll = function (sessionUser,callback) {

    var dbContent = null;
    new Promise((resolve)=>{
        /*打开数据库*/
        mongodb.connect(settings.url,(err,db)=>{dbContent = db; resolve(db)});
    }).then(function (db) {

        return db.collection('posts');
    }).then(function (collection) {
        var query = {};
        // if (name){
        //     query.name = name
        // }
        sessionUser&&(query.name=sessionUser.name);
      
        return collection.find(query).sort({time:-1})
            .toArray()
    }).then((docs)=>{

        dbContent.close();
        docs.forEach(function(doc){
            doc.post = markdown.toHTML(doc.post);
        });
        return callback(null,docs)
    }).catch(function (err) {

        dbContent.close();
        return callback(err)
    });
};
