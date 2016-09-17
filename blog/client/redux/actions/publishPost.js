

//type
export const PUBLISH_POST = 'PUBLISH_POST';
export const PUBLISH_POST_SUCCESS = 'PUBLISH_POST_SUCCESS';
export const PUBLISH_POST_FAUILE = 'PUBLISH_POST_FAUILE';
export const PUBLISH_POST_RESET = 'PUBLISH_POST_RESET';

const publishUrl = '/post/savePost';

//action 
export function postSuccess (data){
    return {
        type : PUBLISH_POST_SUCCESS,
        data
    }

}

export function postReset (){
    return {
        type :PUBLISH_POST_RESET
    }
}

export function postFauile (){
    return {
        type: PUBLISH_POST_FAUILE
    }
}


export function publishPost (obj){
    return dispatch =>{
        $.ajax({
            type : 'post',
            dataType :'json',
            url : publishUrl,
            data :obj,
        }).then((data)=>{
            if(data.success){
                dispatch(postSuccess(data))
            }
        }).catch((err)=>{
            throw err
        })
        
    }

}

