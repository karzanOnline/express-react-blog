
import { PUBLISH_POST_SUCCESS, PUBLISH_POST_FAUILE, PUBLISH_POST_RESET } from '../actions/publishPost';


const initialState = Immutable.fromJS({
    postState: false,
    data: '',
});


function publishPost(state = initialState, actions) {
    switch (actions.type) {
    case PUBLISH_POST_SUCCESS : {
        return state.update('data', () => Immutable.fromJS(actions.data));
    }
    case PUBLISH_POST_FAUILE : { return state.update('postState', false); }
    case PUBLISH_POST_RESET : { return state.update('data', () => Immutable.fromJS({})); }
    default : return state;
    }
}

module.exports = {
    publishPost,
};

