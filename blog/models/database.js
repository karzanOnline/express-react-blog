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
                collection.insert(data,{safe:true},function (err,user) {
                    mongodb.close();
                    callback(null,user.ops[0]);//插入成功 返回用戶存儲文檔
                })
            })
            // .then((user)=>{
            //     mongodb.close();
            //     console.log(user[0]);
            //     callback(null,user[0]);//插入成功 返回用戶存儲文檔
            // })
            .catch((err)=>{
                mongodb.close();
                callback(err)
            });
    },
    findOne : function (collections,data,callback) {
        // console.log('findOne ******************')
        this.connection
            .then((db)=> {
                return db.collection(collections)
            })
            .then((collection)=> {
                collection.findOne(data, function (err, user) {
                    mongodb.close();
                    callback(null, user);
                })
            })
            .catch((err)=> {
                mongodb.close();
                console.log('异常');
                callback(err);
            })
    }
};

module.exports = DataBase;
