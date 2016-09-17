

import {INDEX_POST_DATA,INDEX_POST_SUCCESS,INDEX_POST_FAUILE} from '../actions/indexpost';

const initialState = Immutable.fromJS({
    postState : false,
    data:{}
});


function indexPost (state = initialState,actions){
    switch(actions.type){
        case INDEX_POST_SUCCESS :{
            console.log('===========!')
            let temp = state.get('data').merge(Immutable.fromJS(actions.resultMap))
            return state.update('data',()=>{
                return temp
            });
        }
        case INDEX_POST_FAUILE : {
            return state.update('postState',false)
        }
        default : return state
        
    }
    
}

module.exports = {
    indexPost : indexPost
}