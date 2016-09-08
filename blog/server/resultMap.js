/**
 * Created by caozheng on 2016/9/5.
 */
/*
* 示例返回数据格式
* let resultMap = {
 success : 'true',
 msg : '404',
 resultMap : {name : 'caozheng', age: '18'}
 };
*
* */

module.exports ={
    set:function(success,msg,resultMap){
        return JSON.stringify({
            success:success,
            description:msg,
            resultMap:resultMap
        });
    },
    getMesssageByErrCode:function(errCode) {
        var msg = '';
        switch (errCode){
            case 'J000000':msg = '成功';break;
            default: msg = '失败';break;
        }
        return msg;
    }
};
