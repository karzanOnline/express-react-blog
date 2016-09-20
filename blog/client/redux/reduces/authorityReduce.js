/**
 * Created by caozheng on 2016/9/20.
 */

import {AUTHORITY} from '../actions/authority';

const InistailState = Immutable.fromJS({routerState : 2});

function  getAuthority(state=InistailState,actions) {
    switch (actions.type){
        case AUTHORITY : {
            return state.update('routerState',(data)=>{
                return Immutable.fromJS(actions.num)
            })
        }
    }
    return state
}
module.exports ={getAuthority:getAuthority};