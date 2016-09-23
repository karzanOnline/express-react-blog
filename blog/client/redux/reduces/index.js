/**
 * Created by caozheng on 2016/9/13.
 */

/*使用immutable 优化reducers合并输出*/
import {combineReducers} from 'redux-immutable';
//import Immutable from 'immutable';
import { routerReducer } from 'react-router-redux';

import loginReduce from './helloReducers';
//主页获取文章
import indexPost from './indexPost';
//发布文章
import publishPost from './publishPost';
//控制权限
import getAuthority from './authorityReduce';
//上传文件
import editInfo from './infoReduce';


//let name = Object.assign({},Decompose(test),{title:'jjj'});
//console.log(name);
// 这是本来是用解构赋值的 ...loginReduce 报错了！！！
// 日了狗了！
// 没办法自己手动写个方法

const indexReduces = combineReducers(
    Object.assign({},Decompose(
        //这里添加新的reduce
        loginReduce,
        publishPost,
        getAuthority,
        editInfo,
        indexPost),{routing:routerReducer})
)


    
//这里出现一个问题如果都是将reduce全部加载进来
// 会对性能有很大的影响。
// 后面版本采用动态加载reduce

function Decompose() {
    let tempObj = {};
    
    let args = Array.prototype.slice.call(arguments)

    // for(let i = 0;i<args.length;i++){
    //     Object.keys(args[i]).forEach((item)=>{
    //         //如果有重复后面的覆盖前面的
    //         tempObj[item] = args[i][item]
    //     })
    // }
    args.forEach((value)=>{
        Object.keys(value).forEach((item)=>{
            //如果有重复后面的覆盖前面的
            tempObj[item] = value[item]
        })
    })
    return tempObj
    //
}


export default indexReduces
