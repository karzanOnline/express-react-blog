/**
 * Created by caozheng on 2016/9/13.
 */

// import { combineReducers } from 'redux';
//import {browserHistory} from 'react-router';
import {FETCH_START,FETCH_SUCCESS,FETCH_FAIL} from '../actions/helloAction';
// import {Map} from 'immutable';
/*使用immutable 优化reducers合并输出*/
//import {combineReducers} from 'redux-immutable';
//import Immutable from 'immutable';
//import { routerReducer } from 'react-router-redux'


/*根据响应的 action 改变对应的状态*/
/*state->dispath(action)->reducer->改变state->st ore 的状态树发生变化*/

/*当前的文件就是reducers*/
/*用来处理派发的事件*/

// store中可以定义页面中的初始状态
// const initialState = {
//     submitState : false
// };

/*使用immutable优化数据结构*/
const initialState = Immutable.fromJS({submitState:false,data:{}});

function submitReduce(state = initialState, action) {
    switch (action.type){
        case FETCH_START :{
            console.log('fetch_start');
            return state.update('data',()=>{return Immutable.fromJS({})})
        }
        case FETCH_SUCCESS : {
            console.log('fetch_success');
            let temp = state.get('data').merge(Immutable.fromJS(action.resultMap))
            return state.update('data',data=>{
                return temp
            });
        }
        case FETCH_FAIL : {
            console.log('fetch_fail');
            return state
        }
        default :
            return state
    }
    //return state
}

function loginTest (state = initialState,action){
    return state
}


// const helloReducers = combineReducers({
//     submitReduce,
//     routing :routerReducer
// })

module.exports = {
    submitReduce : submitReduce,
    loginTest : loginTest
}
//export {submitReduce:submitReduce,loginTest:loginTest};

