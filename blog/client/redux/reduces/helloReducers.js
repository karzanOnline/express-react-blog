/**
 * Created by caozheng on 2016/9/13.
 */

import { combineReducers } from 'redux';
import {FETCH_START,FETCH_SUCCESS,FETCH_FAIL} from '../actions/helloAction';

/*根据响应的 action 改变对应的状态*/
/*state->dispath(action)->reducer->改变state->store 的状态树发生变化*/

/*当前的文件就是reducers*/
/*用来处理派发的事件*/

// store中可以定义页面中的初始状态
const initialState = {
    submitState : false
};

function submitReduce(state = initialState, action) {
    switch (action.type){
        case FETCH_START :{console.log('fetch_start')}break;
        case FETCH_SUCCESS : {console.log('fetch_success')}break;
        case FETCH_FAIL : {console.log('fetch_fail')}break;
        default :
            return state
    }
    return state
}

const helloReducers = combineReducers({
    submitReduce
});

export default helloReducers;

