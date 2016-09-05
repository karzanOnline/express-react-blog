/**
 * Created by caozheng on 2016/9/3.
 */
let setting  = require('../setting'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
/*实例化数据库*/
module.exports = new Db(setting.db,new Server(setting.host,setting.port),{safe:true});
