/**
 * Created by apple on 16/9/22.
 */
import {EDIT_INFO_IMG} from '../actions/editInfo';

const InistailState = Immutable.fromJS({imgSrc:''});

function getImg(state = InistailState,actions) {
    switch (actions.type){
        case EDIT_INFO_IMG:{return state.update('imgSrc',function (data) {
            return Immutable.fromJS(actions.data)})
        }
    }
    return state
}

module.exports = {getImg:getImg}