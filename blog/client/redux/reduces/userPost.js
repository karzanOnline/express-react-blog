
import {POST_SUCCESS,POST_FAUILE} from '../actions/userPost';

const InistailState = Immutable.fromJS({data:[]})

function UserPost(state=InistailState,actions){

    switch(actions.type){
        case POST_SUCCESS:{
    
            let temp = state.get('data').merge(Immutable.fromJS(actions.data));
            return state.update('data',(old)=>{
                return temp
            })
        }
        case POST_FAUILE : {
            return state
        }
        default : {
            return state
        }
    }

}

export default {UserPost}