/**
 * Created by caozheng on 2016/9/13.
 */

// async
// 异步的请求定义
export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAUILE';

/*通讯成功*/
export function submitSuccess(resultMap) {
    return{
        type : FETCH_SUCCESS,
        resultMap
    }
}
/*通讯失败*/
export function submitFauile() {
    return{
        type:FETCH_FAIL,
    }

}
/*通讯开始*/
export function submitStart() {
    return{
        type:FETCH_START
    }
}

export function submitLogin(obj,state) {

    return dispatch =>{

        dispatch(submitStart());

        return $.ajax({
            type : 'post',
            url : '/login',
            dataType:'json',
            data : obj
        }).then((data)=>{
            if (data.success) {
                dispatch(submitSuccess(data))
            }else{
                dispatch(submitFauile())
            }
        }).catch((err)=>{
            throw err
        })

    }

}

// 定义的非纯函数，提供异步请求支持
// 需要在sotre中使用thunkMiddleware
// export function refresh() {
//     return dispatch => {
//         dispatch(refreshStart());
//         return fetch(`src/mock/fetch-data-mock.json`)
//             .then(response => response.json())
//             .then(json => {
//                 setTimeout(() => {
//                     dispatch(refreshSuccess(json && json.data.list));
//                 }, 3000);
//             });
//     }
// }