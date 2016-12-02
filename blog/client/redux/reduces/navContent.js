/**
 * Created by caozheng on 2016/10/26.
 */

import { NAV_CONTENT, MAIN_CONTENT, INFO_PIC, STATE_CHANGE} from './../actions/navContent';

const initialState = Immutable.fromJS({
    data: {
        nickname : '',
        avatar : '',
        userinfo : ''
    },
    src : ''
});

function reduceInfo(state = initialState , actions){

    switch (actions.type){
        //发送请求开始渲染
        case NAV_CONTENT : {
            const temp = state.get('data').merge(Immutable.fromJS(actions.data));
            return state.update('data', () => {
                return temp;
            });
        }break;
        //主页面获取当前权限
        case MAIN_CONTENT : {

            return state
        }break;
        //获取头像
        case INFO_PIC : {
            return state.update('src', (data)=>{
                return actions.src
            })
        }break;
        //修改状态
        case STATE_CHANGE : {
            return state.updateIn(['data','success'], ()=>{
                return false
            })
        }
        default : {
            return state
        }
    }
}

module.exports = {
    reduceInfo,
};