

// 这里action type定义
// 动作的方法
export const INDEX_POST_DATA = 'INDEX_POST_DATA';
export const INDEX_POST_SUCCESS = 'INDEX_POST_SUCCESS';
export const INDEX_POST_FAUILE = 'INDEX_POST_FAUILE';


export function postSuccess (resultMap){
    return {
        type : INDEX_POST_SUCCESS,
        resultMap
    }
}

export function postFauile (){
    return {
        type :INDEX_POST_FAUILE
    }
}

export function postData (state){
    return dispatch => {
        $.ajax({
            type : 'post',
            url : postDataUrl,
            dataType:'json',
            data : {}
        }).then((data)=>{
            data.success?dispatch(postSuccess(data)):dispatch(postFauile)
        }).catch((err)=>{
            throw err
        })

    }

}

// 这里本来是要把所有url放到一个js文件的
// 但是想想貌似没有很多通信
// 这里如果需要请在redux下建立一个Api文档用来存取通信协议

const postDataUrl = '/obtainPost'



