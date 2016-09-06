/**
 * Created by caozheng on 2016/9/6.
//let co = require('co');
/*这里不用co 不能大材小用-。-*/
let mongodb = require('./db');
/*构造函数 构造database*/
function DataBase(){
    this.type ='mongodb';
    this.connection =(function () {
        return mongodb.open()
    })()
}
DataBase.prototype = {
    instance : function () {
        return this.connection;
    },
    insert : function (collections,data,callback) {
        this.connection
            .then((db)=>{
                return db.collection(collections)
            })
            .then((collection)=>{
                return collection.insert(data,{safe:true})
            })
            .then((user)=>{
                mongodb.close();
                callback(null,user[0]);//插入成功 返回用戶存儲文檔
            })
            .catch((err)=>{
                mongodb.close();
                callback(err)
            });
    },
    findOne : function (collections,data,callback) {
        this.connection
            .then((db)=>{
                return db.collection(collections)
            })
            .then((collection)=>{
                return collection.findOne(data,{safe:true})
            })
            .then((user)=>{
                mongodb.close();
                callback(null,user);
            })
            .catch((err)=>{
                mongodb.close();
                callback(err);
            })
    }
};

module.exports = DataBase;
