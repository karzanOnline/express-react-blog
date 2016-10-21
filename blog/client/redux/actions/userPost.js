

export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAUILE = 'POST_FAUILE';

export function postSuccess (data){
   return{
       type : POST_SUCCESS,data
   } 
}

export function postFauile(){
    return{
        type : POST_FAUILE
    }
}



export function userPost(url){
    return dispatch =>{
        $.ajax({
            type : 'post', 
            url : url,
            dataType:'json',
            data : {}
        }).then((data)=>{
            data.success?dispatch(postSuccess(data.resultMap.postData)):dispatch(postFauile)
        }).catch((err)=>{
            throw err
        })
    }

}