/**
 * Created by caozheng on 2016/9/6.
//let co = require('co');
/*这里不用co 不能大材小用-。-*/
//let mongodb = require('./db');
var mongodb = require('mongodb').MongoClient;
var settings = require('./../setting.js');
/*构造函数 构造database*/
function DataBase(){
    this.type ='mongodb';
    this.connection =(function () {
        //return mongodb.open()
        console.time('test connect');
        var tmp = mongodb.connect(settings.url);
        console.timeEnd('test connect');
        return tmp
    })()
}
DataBase.prototype = {
    instance : function () {
        return this.connection;
    },
    insert : function (collections,data,callback) {
        var dbContent = null;

        this.connection
            .then((db)=>{
                dbContent = db;
                return db.collection(collections)
            })
            .then((collection)=>{
                collection.insert(data,{safe:true},function (err,result) {
                    // dbContent.close();
                    callback(null,result.ops[0]);//插入成功 返回用戶存儲文檔
                })
            })
            // .then((user)=>{
            //     mongodb.close();
            //     console.log(user[0]);
            //     callback(null,user[0]);//插入成功 返回用戶存儲文檔
            // })
            .catch((err)=>{
                dbContent.close();
                callback(err)
            });
    },
    findOne : function (collections,data,callback) {
        var dbContent = null;
        // console.log('findOne ******************')
        this.connection
            .then((db)=> {
                dbContent = db;
                return db.collection(collections)
            })
            .then((collection)=> {
                if(callback&&typeof callback =='function'){
                    //这里查看返回方式 -> 回调
                    collection.findOne(data, function (err, result) {
                        // dbContent.close();
                        callback(null, result);
                    })
                }else{
                    //返回promise
                    console.log('promise');
                    return collection.findOne(data)
                }
                
            })
            .catch((err)=> {
                dbContent.close();
                console.log('异常');
                callback(err);
            })
    },
    //更新数据
    update : function (collections, data, setData, callback) {

        //用来引用当前db
        var dbContent = null;
        this.connection
            .then((db)=>{
                dbContent = db;
                return db.collection(collections)
            })
            .then((collection)=>{

                collection.update(data, setData, {safe:true}, function (err, result) {
                    if(err){

                        callback(err)
                    }else{

                        callback(null)
                    }
                })

            })
            .catch((err)=>{
                dbContent.close();
                console.log('err at update db');
                callback(err)
            })

    }

};


module.exports = DataBase;
